import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/_shared/interfaces/customer';
import { Product } from 'src/app/_shared/interfaces/product';
import { Services } from 'src/app/_shared/interfaces/services';
import { ProviderService } from 'src/app/_shared/service/admin/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {

  customers1: Customer[] = [];
  products: Product[] = [];
  statuses: any[] = [];
  medicalServicesList: Services[] = []
  loading: boolean = true;
  providerList: Services[] = []
  categoryName!: any;
  categoryId!: number;

  pageNumber!: number
  pageSize!: number;
  totalCount!: number;
  rowsPerPage: number[] = [5, 10, 15]
  totalPages!: Number;
  first: number = 0

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private providerService: ProviderService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.getAllProviders()


    this.statuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Rejected', value: 'Rejected' },
    ];
  }



  getAllProviders(pageNumber = 1, pageSize = 10) {

    this.providerService.getAll(pageNumber, pageSize).subscribe(
      (res) => {
        this.totalPages = res?.data?.totalPages;
        this.pageSize = res?.data?.pageSize;
        this.totalCount = res?.data?.totalCount;
        this.providerList = res.data?.results
        this.loading = false;

      }
    )
  }

  paginate(event: any) {
    console.log("event", event);
    let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.
    console.log("xxx", pageIndex);

    this.pageNumber = pageIndex
    this.pageSize = event.rows
    this.getAllProviders(this.pageNumber, this.pageSize)
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  view(data: any) {
    let Id = data.id
    this.router.navigate([`../view/${Id}`], { relativeTo: this.route });

  }

}
