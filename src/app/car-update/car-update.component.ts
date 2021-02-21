import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car';
import { CarServiceService } from '../services/car-service.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  public car = new Car;
  public id: any;

  public carLicensePlate = new FormControl('', [Validators.minLength(5), Validators.maxLength(20), Validators.required]);
  public carEngineCapacity = new FormControl('', [Validators.minLength(3), Validators.min(800),]);
  public carCareDate = new FormControl('', [Validators.required,]);
  public carEditDate = new FormControl('', [Validators.required,]);
  public carType = new FormControl('', [Validators.required]);
  public carYear = new FormControl('', [Validators.required, Validators.min(1950), Validators.max(2021),]);
  public carNote = new FormControl('', [Validators.minLength(5), Validators.maxLength(50)]);
  public carStatus = new FormControl('', []);
  public is4x4 = false;

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


  public constructor(private activeRoute: ActivatedRoute, private carService: CarServiceService, private router: Router) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.carService.getCarByIdRest(this.id).subscribe(c => {
      this.car = c;
      this.carLicensePlate.setValue(c.licensePlate);
      this.carEngineCapacity.setValue(c.engineCapacity);
      this.carCareDate.setValue(c.careDate);
      this.carEditDate.setValue(c.editDate);
      this.carStatus.setValue(c.status);
      this.carType.setValue(c.carType);
      this.carNote.setValue(c.note);
      this.carYear.setValue(c.year);
    }, err => {
      this.car = null;
    });

  }

  public updateCar() {


    this.car.licensePlate = this.carLicensePlate.value;
    this.car.engineCapacity = this.carEngineCapacity.value;
    this.car.suv = this.is4x4;
    this.car.carType = this.carType.value;
    this.car.careDate = this.carCareDate.value;
    this.car.editDate = this.carEditDate.value;
    this.car.note = this.carNote.value;
    this.car.status = this.carStatus.value;
    this.car.year = this.carYear.value;



    this.carService.updateCar(this.id, this.car).subscribe(c => {

      alert("Car has been successfully updated !")
      this.router.navigate(['home']);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })
  }

}
