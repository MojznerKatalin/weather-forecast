import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-city',
  templateUrl: './add-new-city.component.html',
  styleUrls: ['./add-new-city.component.scss']
})
export class AddNewCityComponent implements OnInit {

  newCity: string;
  cities: Array<string>;

  constructor(
    public dialogRef: MatDialogRef<AddNewCityComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.newCity);
  }
}
