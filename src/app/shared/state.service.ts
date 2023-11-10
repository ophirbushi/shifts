import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Volunteer {
    volunteerId: string
    name: string
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
    institutions = new BehaviorSubject<Institution[]>([
        { institutionId: '1', name: 'המקהלה הקאמרית הישראלית' },
        { institutionId: '2', name: 'גינת הנוי בית שאן' }
    ])
    shifts = new BehaviorSubject<Shift[]>([
        { shiftId: '1', date: '11-8-2023', institutionId: '1', timeframe: '08:00 - 10:00' },
        { shiftId: '2', date: '11-8-2023', institutionId: '1', timeframe: '10:00 - 12:00' },
        { shiftId: '3', date: '11-8-2023', institutionId: '1', timeframe: '12:00 - 14:00' },
        { shiftId: '4', date: '11-8-2023', institutionId: '1', timeframe: '14:00 - 16:00' },
        { shiftId: '5', date: '11-8-2023', institutionId: '1', timeframe: '16:00 - 18:00' },
        { shiftId: '6', date: '11-8-2023', institutionId: '2', timeframe: '08:00 - 10:00' },
        { shiftId: '7', date: '11-8-2023', institutionId: '2', timeframe: '10:00 - 12:00' },
        { shiftId: '8', date: '11-8-2023', institutionId: '2', timeframe: '12:00 - 14:00' },
        { shiftId: '9', date: '11-8-2023', institutionId: '2', timeframe: '14:00 - 16:00' },
        { shiftId: '10', date: '11-8-2023', institutionId: '2', timeframe: '16:00 - 18:00' },
    ])

    getInstitutionById(institutionId: string) {
        return this.institutions.value.find(institution => institution.institutionId === institutionId)
    }

    persistVolunteers(volunteers: Volunteer[]) {
        localStorage.setItem('volunteers', JSON.stringify(volunteers))
    }

    persistInstitutions(institutions: Institution[]) {
        localStorage.setItem('institutions', JSON.stringify(institutions))
    }
}