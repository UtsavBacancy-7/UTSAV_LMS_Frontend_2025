import { Component } from '@angular/core';

@Component({
  selector: 'app-return-records',
  templateUrl: './return-records.component.html',
  styleUrls: ['./return-records.component.scss']
})

export class ReturnRecordsComponent {
  public currentUserRole: string = 'Admin';
  public listTypes: "Borrow" | "Return" = 'Return'
}