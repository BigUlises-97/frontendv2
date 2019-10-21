import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  usuario: UserModel = new UserModel();

  constructor(private auth:AuthService,
              private router:Router
            ) { }

  ngOnInit() {
    //console.log(this.auth.leerUserInfo());
    this.usuario = this.auth.leerUserInfo(); //Con esto agregar info en pantalla para el html
   // console.log(this.usuario);
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
