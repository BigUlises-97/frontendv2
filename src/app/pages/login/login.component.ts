import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User = new User();
  recordarme = false;

  constructor(private authService:AuthService,
              private router:Router
              ) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form:NgForm){
    if(form.invalid){ return; }

    //----- POPUP LOADING -----
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    //-------------------------

    this.authService.login(this.usuario).subscribe( resp => {
      console.log(resp);

      Swal.close(); //cerrar el popup
      
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    },(err)=>{
      
      console.log(err.error.error.message);

    //---- POPUP ERROR ----
    Swal.fire({
      type: 'error',
      text: err.error.error.message,
      title: 'Error al autenticar' 
    });

    });

  }

}
