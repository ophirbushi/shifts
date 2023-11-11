import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Volunteer {
    volunteerId: string
    name: string
    phone: string
}

export interface Institution {
    institutionId: string
    name: string
}

export interface Shift {
    shiftId: string
    institutionId: string
    date: string
    timeframe: string
}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    volunteers = new BehaviorSubject<Volunteer[]>(
        localStorage.getItem('volunteers') ? JSON.parse(localStorage.getItem('volunteers') as string) : []
    )
    institutions = new BehaviorSubject<Institution[]>(
        localStorage.getItem('institutions') ? JSON.parse(localStorage.getItem('institutions') as string) : []
    )
    shifts = new BehaviorSubject<Shift[]>(
        localStorage.getItem('shifts') ? JSON.parse(localStorage.getItem('shifts') as string) : []
    )

    getInstitutionById(institutionId: string) {
        return this.institutions.value.find(institution => institution.institutionId === institutionId)
    }

    persistVolunteers(volunteers: Volunteer[]) {
        localStorage.setItem('volunteers', JSON.stringify(volunteers))
    }

    persistInstitutions(institutions: Institution[]) {
        localStorage.setItem('institutions', JSON.stringify(institutions))
    }

    persistShifts(shifts: Shift[]) {
        localStorage.setItem('shifts', JSON.stringify(shifts))
    }
}