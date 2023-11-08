import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { StateService } from '../shared/state.service'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent {
    institution$ = this.route.paramMap.pipe(
        map(paramMap => paramMap.get('institutionId') as string),
        map(institutionId => this.state.getInstitutionById(institutionId))
    )
    constructor(private route: ActivatedRoute, private state: StateService) { }
}
