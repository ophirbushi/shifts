import { Component } from '@angular/core'
import { AssignmentExtended, StateService } from '../shared/state.service'
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community'
import { AgRendererComponent } from 'ag-grid-angular'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
    template: `      
      <button mat-button (click)="onClick()">מחק</button>
    `,
    standalone: true,
    imports: [MatIconModule, MatButtonModule]
})
class DeleteButtonCellRenderer implements AgRendererComponent {
    params!: ICellRendererParams

    constructor(private state: StateService) { }

    agInit(params: ICellRendererParams): void {
        this.params = params
    }

    refresh(): boolean {
        return true
    }

    onClick() {
        const assignmentExtended = this.params.node.data as AssignmentExtended
        const assignments = this.state.assignments.value.filter(
            assignment => assignment.assignmentId !== assignmentExtended.assignmentId
        )
        this.state.assignments.next(assignments)
        this.state.persistAssignments(assignments)
    }
}

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
        { cellRenderer: DeleteButtonCellRenderer }
    ]

    constructor(private state: StateService) { }
}
