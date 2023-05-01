import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavingDateService } from 'src/app/services/saving-date-service.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.less']
})
export class CreateAppointmentComponent implements OnInit {

  public appointmentForm = new UntypedFormGroup({
    Title: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    Date: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    Duration: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    Description: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  });

  constructor(private savingDataService: SavingDateService,
              @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit(): void {
  }

  InsertAppointment() {
    var date = new Date(this._data.date);
    this.appointmentForm.get('Date')?.setValue(new Date(date.setHours(this._data.date.getHours() + this._data.hour.split(" ")[0])));
    this.savingDataService.saveDate(this._data.date + this._data.hour ,this.appointmentForm.value)
  }

}
