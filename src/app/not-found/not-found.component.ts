import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  //private _location: Location
  constructor(private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle("404 Not Found")
  }

}
