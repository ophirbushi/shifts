import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DatabaseService } from './database.service'

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

export interface Assignment {
    assignmentId: string
    shiftId: string
    volunteerId: string
}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    volunteers!: BehaviorSubject<Volunteer[]>
    institutions!: BehaviorSubject<Institution[]>
    shifts!: BehaviorSubject<Shift[]>
    assignments!: BehaviorSubject<Assignment[]>

    constructor(private database: DatabaseService) { }

    async init() {
        const [volunteers, institutions, shifts, assignments] = await Promise.all([
            this.database.get<Volunteer[]>('volunteers'),
            this.database.get<Institution[]>('institutions'),
            this.database.get<Shift[]>('shifts'),
            this.database.get<Assignment[]>('assignments')
        ])
        this.volunteers = new BehaviorSubject(volunteers || [])
        this.institutions = new BehaviorSubject(institutions || [])
        this.shifts = new BehaviorSubject(shifts || [])
        this.assignments = new BehaviorSubject(assignments || [])
    }

    getInstitutionById(institutionId: string) {
        return this.institutions.value.find(institution => institution.institutionId == institutionId)
    }

    persistVolunteers(volunteers: Volunteer[]) {
        return this.database.set('volunteers', volunteers)
    }

    persistInstitutions(institutions: Institution[]) {
        return this.database.set('institutions', institutions)
    }

    persistShifts(shifts: Shift[]) {
        return this.database.set('shifts', shifts)
    }

    persistAssignments(assignments: Assignment[]) {
        return this.database.set('assignments', assignments)
    }
}