import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  title = 'Project Manager';
  autenticacion = false;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.autenticacion = this.auth.autenticado();
  }

}
