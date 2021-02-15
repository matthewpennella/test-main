import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isNavbarCollapsed = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  ngOnInit() { }
}
