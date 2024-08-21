import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { count, error, log } from 'console';
import { Router } from '@angular/router';
import { response } from 'express';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../dtos/User/register.dto';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('signUpForm') signUpForm!: NgForm;
  //khai baos cac tien tuong ung vs cac truong du lieu trong form
  phone: string;
  password: string;
  retypePassword: string;
  fullname :string;
  address :string;
  isAccepted : boolean;
  dateOfBirth: Date;
  constructor(private router: Router,private userService:UserService){
    this.phone="";
    this.password="";
    this.retypePassword="";
    this.fullname="";
    this.address="";
    this.isAccepted= true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() -18);
  }
  onPhoneChange(){
    console.log(`phone types : ${this.phone}`);
  }
  register(){
    const massage = `phone : ${this.phone} `
                + `password : ${this.password} `
                + `retypepassword : ${this.retypePassword} `
                + `address : ${this.address} `
                + `fullname : ${this.fullname} `
                + `dateOfbirth : ${this.dateOfBirth} `;
                + `isAccepted : ${this.isAccepted} `;
    // alert(massage)
    debugger

    const registerDto: RegisterDTO={
      "fullname": this.fullname,
      "phone_number" : this.phone,
      "address" : this.address,
       "password": this.password,
       "retype_password" : this.retypePassword,
       "birth" : this.dateOfBirth,
       "facebook_id": 0,
       "google_id":0,
       "role_id":1
    }
  
   this.userService.register(registerDto).subscribe({
    next:(response: any)=>{
      debugger
      //xử lý kết quả trả về khi đăng kí thành công
      this.router.navigate(['/login']);
    },
   complete: ()=>{
    debugger
   },
    error:(error: any)=>{
      //xử lý lỗi nếu có
      alert(`khong the dang ki , error :  ${error.error}`)
    
      
    }
  }
);
   
  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.signUpForm.form.controls['retypePassword'].setErrors({'passwordMismatch':true})

    }else{
      this.signUpForm.form.controls['retypePassword'].setErrors(null)
    }
  }
  checkAge(){
    if(this.dateOfBirth){
      let today = new Date();
      let birthDate = new Date(this.dateOfBirth);
      let age =  today.getFullYear() - birthDate.getFullYear();
      let monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff<0 || (monthDiff==0 && today.getDate()< birthDate.getDate())){
        age--;
      }
      if(age<18){
        this.signUpForm.form.controls['dateOfBirth'].setErrors({'invalidAge' : true});
      }else{
        this.signUpForm.form.controls['dateOfBirth'].setErrors(null)
      }
    }
  }

}
