import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    volunteers = new BehaviorSubject<Volunteer[]>([
        { name: 'אלפרד פרייס', volunteerId: '1' },
        { name: 'מקס הוברמן', volunteerId: '2' }
    ])
    institutions = new BehaviorSubject<Institution[]>([
        { institutionId: '1', name: 'המקהלה הקאמרית הישראלית' },
        { institutionId: '2', name: 'גינת הנוי בית שאן' }
    ])
    shifts = new BehaviorSubject<Shift[]>([
        { shiftId: '1', date: '11-8-2023', institutionId: '1', timeframe: '08:00 - 10:00' }
    ])

    getInstitutionById(institutionId: string) {
        return this.institutions.value.find(institution => institution.institutionId === institutionId)
    }
}