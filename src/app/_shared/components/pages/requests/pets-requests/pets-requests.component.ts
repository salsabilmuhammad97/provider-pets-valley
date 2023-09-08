import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-requests',
  templateUrl: './pets-requests.component.html',
  styleUrls: ['./pets-requests.component.scss']
})
export class PetsRequestsComponent implements OnInit {

  constructor(private router: Router) { }
  pets = []
  rowsPerPage: number[] = [5, 10, 15]
  pageSize!: number;
  totalCount!: number;
  first: number = 0
  loading: boolean = false;
  pageNumber!: number


  ngOnInit(): void {
  }

  paginate(event: any) {
    console.log("event", event);
    let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.
    console.log("xxx", pageIndex);
    this.pageNumber = pageIndex
    this.pageSize = event.rows
    // this.getAllPackages(this.providerIdFromLStorage, this.pageNumber, this.pageSize)
  }
}
