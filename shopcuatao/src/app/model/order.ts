export interface OrderDto {
    user_id: string;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    payment_method: 'cod' | 'online'; // Chỉ cho phép 'cod' hoặc 'online'
    shipping_method: 'express' | 'standard'; // Chỉ cho phép 'express' hoặc 'standard'
    coupon_code: string | null; // Giả sử mã coupon có thể null nếu không có mã
    cart_items: any[]; // Để tạm thời là any[], bạn cần xác định cụ thể kiểu dữ liệu của card_item
}
