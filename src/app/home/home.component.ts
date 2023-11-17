/* eslint-disable @typescript-eslint/no-explicit-any */
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
            menuTabs: ['filterMenuTab'],
        },
        rowSelection: 'multiple'
    }
    columnDefs: ColDef<any>[] = [
        { field: 'firstName', headerName: 'שם פרטי', checkboxSelection: true, headerCheckboxSelection: true },
        { field: 'lastName', headerName: 'שם משפחה' },
        { field: 'phone', headerName: 'טלפון' },
        { field: 'email', headerName: 'דוא"ל' },
        { field: 'quantity', headerName: 'כמות' },
        { field: 'status', headerName: 'תהליך הסתיים' },
        { headerName: 'עוד מידע', cellRenderer: () => `<button class="btn btn-secondary">?</button>` }
    ]

    rowData = [
        { firstName: 'יונתן', lastName: 'איתמר', phone: '054-1112234', email: 'yi@gmail.com', quantity: 4, status: true },
        { firstName: 'חגית', lastName: 'מיכאל', phone: '054-1112234', email: 'hm@gmail.com', quantity: 12, status: false },
        { firstName: 'צחי', lastName: 'שי', phone: '054-1112234', email: 'ts@gmail.com', quantity: 9, status: true },
        { firstName: 'יונתן', lastName: 'איתמר', phone: '054-1112234', email: 'yi@gmail.com', quantity: 4, status: false },
        { firstName: 'חגית', lastName: 'מיכאל', phone: '054-1112234', email: 'hm@gmail.com', quantity: 12, status: true },
        { firstName: 'צחי', lastName: 'שי', phone: '054-1112234', email: 'ts@gmail.com', quantity: 9, status: false },
        { firstName: 'יונתן', lastName: 'איתמר', phone: '054-1112234', email: 'yi@gmail.com', quantity: 4, status: false },
        { firstName: 'חגית', lastName: 'מיכאל', phone: '054-1112234', email: 'hm@gmail.com', quantity: 12, status: false },
        { firstName: 'צחי', lastName: 'שי', phone: '054-1112234', email: 'ts@gmail.com', quantity: 9, status: true },
    ]

    constructor(private state: StateService) { }
}
