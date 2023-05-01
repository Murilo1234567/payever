import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AppointmentTable } from 'src/app/interfaces/appointmentTable';
import { SavingDateService } from 'src/app/services/saving-date-service.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { VisualizeAppointmentComponent } from '../visualize-appointment/visualize-appointment.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  selectedDate: Date | undefined;
  dataSource: AppointmentTable[] = [
    {Hour: "0 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "1 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "2 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "3 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "4 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "5 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "6 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "7 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "8 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "9 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "10 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "11 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "0 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "1 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "2 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "3 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "4 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "5 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "6 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "7 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "8 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "9 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "10 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "11 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}}
  ];
  columns = [
    {
      columnDef: 'hour',
      header: 'Hour',
      cell: (element: AppointmentTable) => `${element.Hour}`,
    },
    {
      columnDef: 'appointment',
      header: 'Appointment',
      cellContent: (element: AppointmentTable) => `${element.Appointment.Title}`,
      cellHour: (element: AppointmentTable) => `${element.Hour}`
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private savingDateService: SavingDateService,
              private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recalibrateTable();
  }

  recalibrateTable() {
    this.dataSource.forEach(element => {
      element.Appointment.Title = '';
      element.Appointment.Date = new Date();
      element.Appointment.Duration = 0;
      element.Appointment.Description = '';
      const first = JSON.parse(this.savingDateService.getDate(this.selectedDate + element.Hour)!);
      element.Appointment = first != null ? first : element.Appointment;
    });
  }

  drag(event: any) {
    this.dataSource[event.previousIndex].Appointment.Date = new Date(this.dataSource[event.previousIndex].Appointment.Date);
    this.dataSource[event.previousIndex].Appointment.Date = new Date(this.dataSource[event.previousIndex].Appointment.Date.setHours(parseInt(this.dataSource[event.currentIndex].Hour.split(" ")[0])));
    this.savingDateService.removeDate(this.selectedDate + this.dataSource[event.previousIndex].Hour);
    this.savingDateService.saveDate(this.selectedDate + this.dataSource[event.currentIndex].Hour, this.dataSource[event.previousIndex].Appointment);
    this.recalibrateTable();
  }

  openDialogCreate(app: any) {
    const dialogRef =  this.dialog.open(CreateAppointmentComponent, {
      data: {
        date: this.selectedDate,
        hour: app
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recalibrateTable()
    });
  }

  openDialogVisualize(app: any) {
    const dialogRef = this.dialog.open(VisualizeAppointmentComponent, {
      data: {
        date: this.selectedDate + app,
        hour: app
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recalibrateTable()
    });
  }

}
