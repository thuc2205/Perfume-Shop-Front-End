import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { evironment } from '../../enviroment/environment';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products : Product[] = [];
  categories : Category[]=[];
  currentPage:number = 0;
  itemPerPage:number = 9;
  totalPages:number = 0;
  visiblePages: number[]= [];
  keyword: string="";
  selectedCategoryId:number=0;

  constructor(private productService: ProductService,
  private categoryService : CategoryService) {}

  ngOnInit() {
    this.getProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.itemPerPage);
    this.getCategories(1,100);
  }
  getCategories(page:number,limit:number){
      this.categoryService.getCategories(page,limit).subscribe({
        next: (categories: Category[])=>{
          debugger
          this.categories = categories;
        },
        complete:()=>{
          debugger;
        },
        error:(error:any)=>{
          console.error('ERROR CATEGORY : ',error);
        }
      })
  }
searchProducts(){
  this.currentPage =0 ;
  this.itemPerPage=9;
  debugger
  this.getProducts(this.keyword,this.selectedCategoryId,this.currentPage,this.itemPerPage);
}
  getProducts( keyword: string, selectedCategoryId: number , page: number, limit: number) { 
    this.productService.getProducts(keyword,selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        debugger;
        response.products.forEach((product: Product) => {
          product.url = `${evironment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPage;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
          
        );
        console.log(this.totalPages);
        
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.log('Error product: ', error);
      },
    });
  }

  onPageChange(page: number) {
    debugger;
    // Đảm bảo currentPage không vượt quá totalPages
    this.currentPage = page;
    this.getProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.itemPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 10;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // Đảm bảo rằng currentPage và totalPages là số nguyên dương
    currentPage = Math.max(1, currentPage);
    totalPages = Math.max(1, totalPages);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // Tạo một mảng từ startPage đến endPage
    const visiblePagesArray: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePagesArray.push(i);
    }

    return visiblePagesArray;
  }
  

}