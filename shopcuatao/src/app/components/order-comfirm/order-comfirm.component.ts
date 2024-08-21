import { evironment } from './../../enviroment/environment';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-order-comfirm',
  templateUrl: './order-comfirm.component.html',
  styleUrls: ['./order-comfirm.component.scss']
})
export class OrderComfirmComponent implements OnInit {
  cardItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()).map(Number); // Ensure productIds are numbers

    if (productIds.length > 0) {
      this.productService.getProductsById(productIds).subscribe({
        next: (products) => {
          this.cardItems = productIds.map(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
              product.thumbnail = `${evironment.apiBaseUrl}/products/images/${product.thumbnail}`;
              return { product: product, quantity: cart.get(productId)! };
            } else {
              console.error(`Product with ID ${productId} not found`);
              return null;
            }
          }).filter(item => item !== null) as { product: Product, quantity: number }[];

          this.caculateTotal(); // Calculate total after loading the products
        },
        error: (error: any) => {
          console.error("Error fetching products:", error);
        }
      });
    }
  }

  caculateTotal(): void {
    this.totalAmount = this.cardItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }
}
