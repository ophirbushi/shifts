import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup } from '@angular/forms'
import { Institution, Shift, StateService, Volunteer } from '../../state.service'
import { Observable, Subject, map, merge, startWith, takeUntil } from 'rxjs'

@Component({
    selector: 'app-volunteer-assignment-form',
    templateUrl: './volunteer-assignment-form.component.html',
    styleUrls: ['./volunteer-assignment-form.component.scss']
})
export class VolunteerAssignmentFormComponent implements OnInit, OnDestroy {
    form = new FormGroup({
        volunteer: new FormControl<Volunteer | string | null>(null, this.objectValidator),
        institution: new FormControl<Institution | string | null>(null, this.objectValidator),
        shift: new FormControl<Shift | null>({ value: null, disabled: true }, this.objectValidator)
    })
    volunteerOptions!: Observable<Volunteer[]>
    institutionOptions!: Observable<Institution[]>
    shiftOptions!: Observable<Shift[]>
    private readonly destroy = new Subject()

    constructor(private state: StateService) { }

    ngOnInit() {
        this.volunteerOptions = merge(
            this.form.controls.volunteer.valueChanges,
            this.state.volunteers.pipe(map(() => ''))
        ).pipe(
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
        this.shiftOptions = this.form.controls.institution.valueChanges.pipe(
            map((institution) => {
                if (institution == null || typeof institution === 'string') {
                    return []
                }
                return this.state.shifts.value
                    .filter(shift => institution.institutionId === shift.institutionId)
            })
        )

        this.form.controls.institution.valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe((insitution) => {
                if (insitution == null || typeof insitution === 'string') {
                    this.form.controls.shift.reset()
                    this.form.controls.shift.disable()
                } else {
                    this.form.controls.shift.enable()
                }
            })
    }

    ngOnDestroy() {
        this.destroy.next(null)
        this.destroy.complete
    }

    volunteerDisplayFn(volunteer: Volunteer | null): string {
        return volunteer?.name || ''
    }

    institutionDisplayFn(institution: Institution | null): string {
        return institution?.name || ''
    }

    private objectValidator(ctrl: AbstractControl) {
        return ctrl.value == null || typeof ctrl.value === 'string' ? { invalid: true } : null
    }
}
