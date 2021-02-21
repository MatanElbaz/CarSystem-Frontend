import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarServiceService } from '../services/car-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-car-all',
  templateUrl: './car-all.component.html',
  styleUrls: ['./car-all.component.css']
})
export class CarAllComponent implements OnInit {

  cars: Car[];
  findedCars: Car[];
  carId: number;
  car: Car;

  /*name of the excel-file which will be downloaded. */
  fileName= 'ExcelCarSheet.xlsx';


  constructor(private activeRoute: ActivatedRoute,private carService: CarServiceService) { }

  ngOnInit(): void {
    this.getCars();
  }

  private getCars():void{
    let obsOfCars: Observable<Car[]> = this.carService.getAllCars();

    obsOfCars.subscribe(
      arr =>{
        this.cars = arr;
        this.findedCars = [];
          for(const c of this.cars){
          this.findedCars.push(c);
          }
      },err=>{
        alert(err.error.message);
      });
  }

  deleteCar(id: number) {
    var isDelete= confirm("Are you sure that you want to remove this car?");
      if(isDelete){
        this.carService.deleteCar(id).subscribe(msg=> {

        this.ngOnInit();

        }, err => {
        let obj = JSON.parse(err.error);
          alert(obj.message);
        });
    }

  }

  applyFilter(event: any):void {
    let q: string = event.target.value;

    let arr = this.cars.filter((c)=>{
      return c.licensePlate.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCars = arr;
  }

  exportexcel(): void
  {
     /* table id is passed over here */
     let element = document.getElementById('myTable');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);

  }

}
