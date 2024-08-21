export interface LoginResponse {
  message: String;
  token: String;
  phoneNumber: string;  // Add this line if the phone number is part of the response
}
