import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Car } from '../models/car';
import { CarServiceService } from '../services/car-service.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  public car= new Car()

  public carLicensePlate = new FormControl('',[Validators.minLength(5), Validators.maxLength(20), Validators.required]);
  public carEngineCapacity = new FormControl('', [Validators.required, Validators.min(800),]);
  public carCareDate = new FormControl('', [Validators.required,]);
  public carEditDate = new FormControl('', [Validators.required,]);
  public carType = new FormControl('', [Validators.required]);
  public carYear = new FormControl('', [Validators.required, Validators.min(1950),Validators.max(2021),]);
  public carNote = new FormControl('',[Validators.minLength(10), Validators.maxLength(50)]);
  public carStatus = new FormControl('', [Validators.required]);
  public is4x4 =false;

  registrationForm = new FormGroup(
    {
        licensePlate: this.carLicensePlate,
        engineCapacity: this.carEngineCapacity,
        careDate: this.carCareDate,
        editDate: this.carEditDate,
        carType: this.carType,
        year: this.carYear,
        note: this.carNote,
        status: this.carStatus,
    }
);

  constructor(private carService: CarServiceService,private router: Router) { }

  ngOnInit(): void {

  }

  public addCar(): void {
    this.car.licensePlate = this.carLicensePlate.value;
    this.car.engineCapacity = this.carEngineCapacity.value;
    this.car.suv = this.is4x4;
    this.car.carType = this.carType.value;
    this.car.careDate = this.carCareDate.value;
    this.car.editDate = this.carEditDate.value;
    this.car.note = this.carNote.value;
    this.car.status = this.carStatus.value;
    this.car.year = this.carYear.value;

    this.carService.addCar(this.car).subscribe(
      createCar => {
        alert(this.car.suv)
        alert("Car has been successfully Added.")
        this.router.navigate(["/home"]);
      }, err => {

        let obj = JSON.parse(err.error);

        alert(obj.message);

      }
    );
  }
}
