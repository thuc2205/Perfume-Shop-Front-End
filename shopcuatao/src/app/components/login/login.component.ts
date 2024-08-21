import { Component ,ViewChild} from '@angular/core';
import { LoginDTO } from '../../dtos/User/login.dto';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import{LoginResponse} from '../../responses/User/login.response';
import { TokenService } from '../../service/token.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phone: string = '099321321';
  password: string = '123456';
  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    debugger
    this.roleService.getRole().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.log("Error getting role:", error);
      }
    });
  }

  onPhoneChange() {
    console.log(`Phone types: ${this.phone}`);
  }

  login() {
    debugger
    const loginDto: LoginDTO = {
      phone_number: this.phone,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
  
    this.userService.login(loginDto).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const { token } = response;
        if (token) {
          if (this.rememberMe) {
            this.tokenService.setToken(token.toString());
          }
          localStorage.setItem('phoneNumber', this.phone);  // Manually store the phone number
          this.router.navigate(['/']);
        } else {
          console.error("Token không có trong phản hồi.");
        }
      },
      error: (error: any) => {
        debugger;
        console.error("Lỗi đăng nhập:", error);
      }
    });
    
  }
}