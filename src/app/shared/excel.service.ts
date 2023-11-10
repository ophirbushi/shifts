import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'
import { StateService, Volunteer } from './state.service'

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor(private state: StateService) { }

    async importVolunteers(inputElement: HTMLInputElement) {
        const file = await this.extractFileFromInputElement(inputElement)
        const wb = XLSX.read(file)
        const sheet = wb.Sheets['Sheet1']
        const volunteerNames: string[] = Object.getOwnPropertyNames(sheet)
            .map(key => {
                if (typeof key !== 'string' || key.indexOf('A') !== 0 || key === 'A1') {
                    return null
                }
                return sheet[key].v
            })
            .filter(name => name != null)
        const volunteers: Volunteer[] = volunteerNames.map((name, index) => ({ name, volunteerId: index.toString() }))
        this.state.volunteers.next(volunteers)
        this.state.persistVolunteers(volunteers)
    }

    async importInstitutions(inputElement: HTMLInputElement) {
        const file = await this.extractFileFromInputElement(inputElement)
        const wb = XLSX.read(file)
        const sheet = wb.Sheets['Sheet1']
        const volunteerNames: string[] = Object.getOwnPropertyNames(sheet)
            .map(key => {
                if (typeof key !== 'string' || key.indexOf('A') !== 0 || key === 'A1') {
                    return null
                }
                return sheet[key].v
            })
            .filter(name => name != null)
        const volunteers: Volunteer[] = volunteerNames.map((name, index) => ({ name, volunteerId: index.toString() }))
        this.state.volunteers.next(volunteers)
    }

    private extractFileFromInputElement(input: HTMLInputElement): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader()
                reader.onload = (e) => resolve(e?.target?.result as ArrayBuffer)
                reader.readAsArrayBuffer(input.files![0])
            } catch (err) {
                reject(err)
            }
        })
    }
}