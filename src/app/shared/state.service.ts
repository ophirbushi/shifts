import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, filter, map, withLatestFrom } from 'rxjs'
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

export type AssignmentExtended = Shift & Institution & Volunteer & { institutionName: string, volunteerName: string, assignmentId: string}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    volunteers!: BehaviorSubject<Volunteer[]>
    institutions!: BehaviorSubject<Institution[]>
    shifts!: BehaviorSubject<Shift[]>
    assignments!: BehaviorSubject<Assignment[]>
    assignmentsExtended$!: Observable<AssignmentExtended[]>

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

        this.assignmentsExtended$ = this.assignments.pipe(
            withLatestFrom(this.volunteers, this.institutions, this.shifts),
            map(([assignments, volunteers, institutions, shifts]) => {
                return assignments.map<AssignmentExtended | null>((assignment) => {
                    const volunteer = volunteers.find(volunteer => volunteer.volunteerId === assignment.volunteerId) as Volunteer
                    const shift = shifts.find(shift => shift.shiftId === assignment.shiftId) as Shift
                    const institution = institutions.find(institution => institution.institutionId === shift?.institutionId) as Institution
                    if (!volunteer || !shift || !institution) {
                        console.error(
                            '[StateService] assignmentsExtended$ error: found an entry without matches',
                            { assignment, volunteer, shift, institution }
                        )
                        return null
                    }
                    return {
                        ...shift,
                        ...volunteer,
                        ...institution,
                        volunteerName: volunteer.name,
                        institutionName: institution.name,
                        assignmentId: assignment.assignmentId
                    }
                })
            }),
            map(entries => entries.filter(entry => entry != null) as Array<AssignmentExtended>)
        )
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