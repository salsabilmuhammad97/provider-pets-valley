import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Package } from 'src/app/_shared/interfaces/package';
import { Product } from 'src/app/_shared/interfaces/product';
import { STORAGE_KEY_USER_ID } from 'src/app/_shared/service/auth.service';
import { ProductService } from 'src/app/_shared/service/product.service';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = true;
  pageSize!: number;
  totalCount!: number;
  rowsPerPage: number[] = [5, 10, 15]
  totalPages!: Number;
  first: number = 0
  pageNumber!: number
  lSProviderId!: any
  providerIdFromLStorage!: any
  status!: {}[];
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProviderId();
    this.status = [
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Active', value: 'Active' }
    ];

  }

  searchByName(e: any): void {
    console.log(e.value);
    let finalData = {
      Name: e.value,
      ProviderId: this.providerIdFromLStorage
    }
    console.log(finalData);

    this.productService.search(finalData).subscribe(data => {
      console.log(data);
      this.products = data?.data?.results;
    })


  }

  getProviderId() {
    this.lSProviderId = localStorage.getItem(STORAGE_KEY_USER_ID);
    console.log("providerId", this.lSProviderId);

    if (this.lSProviderId > 0) {
      console.log('provideerId > 0');
      this.providerIdFromLStorage = JSON.parse(this.lSProviderId);
      console.log('providerId2', this.providerIdFromLStorage);
      this.getAllProducts(this.providerIdFromLStorage)
    } else {
      console.log("no data in local storage!");
      this.loading = false;

    }
  }

  getAllProducts(providerId: number, pageNumber = 1, pageSize = 10) {
    this.productService.getAllProducts(providerId, pageNumber, pageSize).subscribe(
      (res) => {
        console.log(res?.data);
        this.totalPages = res?.data?.totalPages;
        this.pageSize = res?.data?.pageSize;
        this.totalCount = res?.data?.totalCount;
        console.log("count", this.totalCount);
        console.log("this.pageSize", this.pageSize);
        console.log("this.totalPages", this.totalPages);
        this.products = res.data?.results;
        this.loading = false;
        console.log(this.products);

      }
    )
  }

  //   search(){

  //    let  formdata = {}

  //     this.packageService.searchPackages(formdata).subscribe(
  //         res=>{
  //             console.log(res);
  //         }
  //     )
  //   }


  paginate(event: any) {
    console.log("event", event);
    let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.
    console.log("xxx", pageIndex);
    this.pageNumber = pageIndex
    this.pageSize = event.rows
    this.getAllProducts(this.providerIdFromLStorage, this.pageNumber, this.pageSize)
  }


  onGlobalFilter(table: Table, event: Event) {
    console.log(table);
    console.log(event);

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
    this.getAllProducts(this.providerIdFromLStorage)

  }


  edit(data: any) {
    let Id = data.id
    this.router.navigate([`../edit/${Id}`], { relativeTo: this.route });

  }

}
