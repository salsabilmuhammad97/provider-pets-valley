import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent implements OnInit {

  constructor() { }
  data!: any
  tests = [
    { key: 1 },
    { key: 4 },
  ]
  ngOnInit(): void {

    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      datasets: [
        {
          label: 'Rate Average',
          backgroundColor: '#8114ff',
          data: [66, 49, 81, 71, 26, 65, 60, 20, 50, 60, 30]
        },
      ]
    }
  }

}
