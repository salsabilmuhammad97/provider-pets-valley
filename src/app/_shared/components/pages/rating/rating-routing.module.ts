import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RateAddComponent } from './rate-add/rate-add.component';
import { RateListComponent } from './rate-list/rate-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: RateAddComponent
  },
  {
    path: 'list',
    component: RateListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule { }
