import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderComfirmComponent } from './components/order-comfirm/order-comfirm.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { TokenInterCeptor } from './interceptors/token.interceptor';
import { appRouters } from './app.router';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderComfirmComponent,
    LoginComponent,
    SignupComponent,
    DetailproductComponent,
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouters, // Đảm bảo routes được cấu hình chính xác
  ],
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterCeptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent,
  ] 
})
export class AppModule { }
