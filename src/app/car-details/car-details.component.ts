import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car';
import { CarServiceService } from '../services/car-service.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  public car: Car;
  public id: number;

  constructor(private title: Title, private activeRoute: ActivatedRoute, private carService: CarServiceService) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.carService.getCarByIdRest(this.id).subscribe(c => {
      this.car = c;
      this.title.setTitle("Car Details");
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    });

  }
}
