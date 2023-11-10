import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Institution, Shift, StateService, Volunteer } from '../../state.service'
import { Observable, map, of, startWith } from 'rxjs'

@Component({
    selector: 'app-volunteer-assignment-form',
    templateUrl: './volunteer-assignment-form.component.html',
    styleUrls: ['./volunteer-assignment-form.component.scss']
})
export class VolunteerAssignmentFormComponent implements OnInit {
    form = new FormGroup({
        volunteer: new FormControl<Volunteer | null>(null, this.volunteerValidator),
        institution: new FormControl<Institution | null>(null),
        shift: new FormControl<Shift | null>(null)
    })
    volunteerOptions!: Observable<Volunteer[]>
    institutionOptions!: Observable<Institution[]>
    shiftOptions!: Observable<Shift[]>

    constructor(private state: StateService) { }

    ngOnInit() {
        this.volunteerOptions = this.form.controls.volunteer.valueChanges.pipe(
            startWith(''),
            map((query) => {
                return this.state.volunteers.value
                    .filter(volunteer => volunteer?.name.includes(query as string || ''))
            })
        )
        this.institutionOptions = this.form.controls.institution.valueChanges.pipe(
            startWith(''),
            map((query) => {
                return this.state.institutions.value
                    .filter(institution => institution?.name.includes(query as string || ''))
            })
        )
        this.shiftOptions = this.form.controls.shift.valueChanges.pipe(
            startWith(''),
            map(() => {
                return this.state.shifts.value
                    .filter(shift => shift)
            })
        )
    }

    volunteerDisplayFn(volunteer: Volunteer): string {
        return volunteer?.name
    }

    institutionDisplayFn(institution: Institution): string {
        return institution?.name
    }

    private volunteerValidator(ctrl: AbstractControl) {
        return ctrl.value == null || typeof ctrl.value === 'string' ? { invalid: true } : null
    }
}
