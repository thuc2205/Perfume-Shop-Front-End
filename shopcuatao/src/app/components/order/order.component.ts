import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { evironment } from '../../enviroment/environment';
import { OrderDto } from '../../model/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cardItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0; // Tổng tiền
  orderDate: OrderDto = {
    user_id: "1",
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: [''],
      shipping_method: ['Express'],
      payment_method: ['cod']
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if (productIds.length > 0) {
      this.productService.getProductsById(productIds).subscribe({
        next: (products) => {
          this.cardItems = productIds.map(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
              product.thumbnail = `${evironment.apiBaseUrl}/products/images/${product.thumbnail}`;
            }
            return { product: product!, quantity: cart.get(productId)! };
          });
          this.calculateTotal(); // Cập nhật tổng số tiền
        },
        error: (error: any) => {
          console.error("Error fetching products:", error);
        }
      });
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cardItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  }

  comfirm(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched(); // Hiển thị lỗi nếu form không hợp lệ
      return;
    }
  
    // Thu thập dữ liệu đơn hàng từ form
    const orderData: OrderDto = {
      user_id: '1', // Lấy từ đâu đó nếu có
      fullname: this.orderForm.get('fullname')!.value,
      email: this.orderForm.get('email')!.value,
      phone_number: this.orderForm.get('phone_number')!.value,
      address: this.orderForm.get('address')!.value,
      note: this.orderForm.get('note')!.value,
      total_money: this.totalAmount,
      payment_method: this.orderForm.get('payment_method')!.value,
      shipping_method: this.orderForm.get('shipping_method')!.value,
      coupon_code: '', // Mã giảm giá (nếu có)
      cart_items: this.cardItems.map(item => ({
        product_id: item.product.id,
        quantify: item.quantity
      }))
    };
  
    // Gửi dữ liệu đơn hàng đến backend
    this.http.post('http://localhost:8080/api/v1/orders', orderData).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        alert('Đặt hàng thành công!');
        this.router.navigate(['/order-success']); // Điều hướng đến trang thành công
      },
      error: (error) => {
        console.error('Error creating order:', error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo cho người dùng)
      }
    });
  }
  
}
