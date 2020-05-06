import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
templateUrl:'./product-list.component.html',
styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit
{
  
    pageTitle :string = 'Product List';
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    errorMessage:string;

    _listFilter:string;
    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter=value;
      this.filteredProduct=this.listFilter?this.performFilter(this.listFilter):this.products;
    }
    filteredProduct:IProduct[];
    products:IProduct[]=[];
         private _productService;
          constructor(private productService: ProductService) {
          }
          toggleImage():void
          {
            this.showImage=!this.showImage;
          }
          performFilter(filterBy:string):IProduct[]
          {
              filterBy=filterBy.toLocaleLowerCase();
              return this.products.filter((product:IProduct)=>
              product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1)
          }
          ngOnInit(): void {
            console.log('On init Appliation starts');
            this.productService.getProducts().subscribe({
              next:products=>{
              this.products=products,
              this.filteredProduct=this.products;
              },
              error:err=>this.errorMessage=err
            });
          
          }
          onRatingClicked(message:string):void{
            this.pageTitle='Product list: '+message;
          }
}