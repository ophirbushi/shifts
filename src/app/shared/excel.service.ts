import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'
import { Institution, Shift, StateService, Volunteer } from './state.service'

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor(private state: StateService) { }

    async importVolunteers(inputElement: HTMLInputElement) {
        const file = await this.extractFileFromInputElement(inputElement)
        const wb = XLSX.read(file)
        const sheet = wb.Sheets['Sheet1']
        const volunteers = this.readSheet<Volunteer>(sheet, ['name', 'phone'], 'volunteerId')
        this.state.volunteers.next(volunteers)
        this.state.persistVolunteers(volunteers)
    }

    async importInstitutions(inputElement: HTMLInputElement) {
        const file = await this.extractFileFromInputElement(inputElement)
        const wb = XLSX.read(file)
        const sheet = wb.Sheets['Sheet1']
        const institutions = this.readSheet<Institution>(sheet, ['name'], 'institutionId')

        const shifts: Shift[] = []

        const date = new Date()
        institutions.forEach(institution => {
            shifts.push({ institutionId: institution.institutionId, shiftId: Math.random().toString(), date: date.toDateString(), timeframe: '08:00 - 10:00' })
            shifts.push({ institutionId: institution.institutionId, shiftId: Math.random().toString(), date: date.toDateString(), timeframe: '10:00 - 12:00' })
            shifts.push({ institutionId: institution.institutionId, shiftId: Math.random().toString(), date: date.toDateString(), timeframe: '12:00 - 14:00' })
            shifts.push({ institutionId: institution.institutionId, shiftId: Math.random().toString(), date: date.toDateString(), timeframe: '14:00 - 16:00' })
            shifts.push({ institutionId: institution.institutionId, shiftId: Math.random().toString(), date: date.toDateString(), timeframe: '16:00 - 18:00' })
        })

        this.state.shifts.next(shifts)
        this.state.persistShifts(shifts)

        this.state.institutions.next(institutions)
        this.state.persistInstitutions(institutions)
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

    private readSheet<T>(sheet: XLSX.WorkSheet, columnKeys: Array<keyof T>, idKey: keyof T): T[] {
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
        return Object.getOwnPropertyNames(sheet)
            .filter(key => key.indexOf('!') !== 0)
            .filter(key => key !== key[0] + '1')
            .reduce<Partial<T>[]>((acc, key) => {
                const index = +key.slice(1) - 2
                let entry = acc[index]
                if (!entry) {
                    entry = acc[index] = {}
                }
                const letter = key[0]
                const letterIndex = columns.indexOf(letter)
                const prop = columnKeys[letterIndex]
                entry[prop] = sheet[key]?.v
                return acc
            }, [])
            .map((entry, index) => ({ ...entry, [idKey]: index })) as T[]
    }
}