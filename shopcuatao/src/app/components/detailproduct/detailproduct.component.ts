import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { evironment } from '../../enviroment/environment';
import { ProductImage } from '../../model/product.image';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.scss'
})
export class DetailproductComponent implements OnInit{
  product?: Product;
  productId: number =0;
  currentImageIndex :number =0;
  quantify:number=0;
  constructor(private productService: ProductService,
    private cartService: CartService){};
  ngOnInit(){
    debugger
    // this.cartService.clearCart();
    const idParam =1;
    if(idParam !== null ){
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)){
      this.productService.getProductDetail(this.productId).subscribe({
        next:(response :any)=>{
          //lay danh sach sp va doi url
          debugger
          if(response.product_images && response.product_images.length>0){
            response.product_images.forEach((product_image: ProductImage)=>{
              product_image.url=`http://localhost:8080/api/v1/products/images/${product_image.url}`
            })
          }
          debugger
          this.product =response
          //bat dau voi anh dau tien
          this.showImage(0);
        },
        complete:()=>{
          debugger;
        },
        error:(error:any)=>{
          debugger;
          console.error('ERROR PRODUCT DETAIL : ',error)
        }
      })
    }else{
      console.log('In valid Product id',idParam);
    }
  }
  showImage(index : number):void{
    debugger
    if(this.product && this.product.product_images 
      && this.product.product_images.length > 0){
      //index hop le
      if(index<0){
        index=0;
      }else if(index >= this.product.product_images.length){
        index = this.product.product_images.length -1;
      }
      //gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex =index;
    }
  }
  thumbnailClick(index: number){
    debugger
    this.currentImageIndex =index;
  }
  nextImage():void {
    debugger
    this.showImage(this.currentImageIndex+1)
  }
  previousImage():void {
    debugger
    this.showImage(this.currentImageIndex -1 )
  }
  addToCard():void{
    debugger
    if(this.product){
      this.cartService.addToCart(this.product.id,this.quantify)
      alert("Them thanh con");
    }else{
      console.error('khong the them san pham vi product la null')
    }
  }
  increaseQuantify():void{
    this.quantify++;
  }
  decreaseQuantify():void{
    if(this.quantify>1){
      this.quantify--;
    }
   
  }
  buyNow():void{

  }


}
