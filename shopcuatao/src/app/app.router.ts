import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent} from "./components/login/login.component";
import { OrderComfirmComponent} from "./components/order-comfirm/order-comfirm.component";
import { OrderComponent} from "./components/order/order.component";
import { DetailproductComponent} from "./components/detailproduct/detailproduct.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orderComfirm', component: OrderComfirmComponent },
  { path: 'order', component: OrderComponent },
  { path: 'detail', component: DetailproductComponent }
];

export const appRouters = RouterModule.forRoot(routes);
export class AppRoutingModule { }
