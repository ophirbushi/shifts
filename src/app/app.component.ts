import { Component } from '@angular/core';

interface Volunteer {
    volunteerId: string
    name: string
}

interface Institution {
    institutionId: string
    name: string
}

interface Shift {
    shiftId: string
    institutionId: string
    date: string
    timeframe: string
}

const volunteers: Volunteer[] = [
    { name: 'אלפרד פרייס', volunteerId: '1' },
    { name: 'מקס הוברמן', volunteerId: '2' }
]

const institutions: Institution[] = [
    { institutionId: '1', name: 'המקהלה הקאמרית הישראלית' },
    { institutionId: '2', name: 'גינת הנוי בית שאן' }
]

const shifts: Shift[] = [
    { shiftId: '1', date: '11-8-2023', institutionId: '1', timeframe: '08:00 - 10:00' }
]


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
