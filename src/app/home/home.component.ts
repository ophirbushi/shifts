import { Component } from '@angular/core'
import { AssignmentExtended, StateService } from '../shared/state.service'
import { ColDef, GridOptions } from 'ag-grid-community'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    institutions$ = this.state.institutions
    volunteers$ = this.state.volunteers
    assignmentsExtended$ = this.state.assignmentsExtended$
    gridOptions: GridOptions = {
        enableRtl: true,
        defaultColDef: {
            sortable: true,
            filter: 'agTextColumnFilter',
            menuTabs: ['filterMenuTab']
        }
    }
    columnDefs: ColDef<AssignmentExtended>[] = [
        { field: 'volunteerName', headerName: 'מתנדב' },
        { field: 'institutionName', headerName: 'מוסד' },
        { field: 'phone', headerName: 'טלפון' },
        { field: 'date', headerName: 'תאריך' },
        { field: 'timeframe', headerName: 'טווח שעות' },
    ]

    constructor(private state: StateService) { }
}
