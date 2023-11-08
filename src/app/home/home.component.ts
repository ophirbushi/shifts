import { Component } from '@angular/core'
import { StateService } from '../shared/state.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    institutions$ = this.state.institutions
    volunteers$ = this.state.volunteers

    constructor(private state: StateService) { }
}
