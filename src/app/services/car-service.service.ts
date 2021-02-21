import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {


  constructor(private httpClient: HttpClient) { }


  public addCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>("http://localhost:8080/api/add", car, { responseType: 'text' as 'json', withCredentials: true });
  }

  public getAllCars(): Observable<Car[]> {

    return this.httpClient.get<Car[]>("http://localhost:8080/api/cars/all", { withCredentials: true });

  }
  public deleteCar(id: number): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/delete/" + id, { responseType: 'text' as 'json', withCredentials: true });
  }

  public updateCar(carId: number, car: Car): Observable<Car> {
    return this.httpClient.put<Car>("http://localhost:8080/api/update/" + carId, car, { responseType: 'text' as 'json', withCredentials: true });
  }
  public getCarByIdRest(id: number): Observable<Car> {
    return this.httpClient.get<Car>("http://localhost:8080/api/car/" + id, { withCredentials: true });
  }

}
