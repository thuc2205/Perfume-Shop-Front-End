import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  phoneNumber: string | null = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.phoneNumber = localStorage.getItem('phoneNumber');
    }
  }
}
