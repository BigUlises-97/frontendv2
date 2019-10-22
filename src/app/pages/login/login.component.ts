import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: UserModel = new UserModel();
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

    if(form.invalid) { return; } //Validacion si es invalido el formulario

    //----- POPUP LOADING -----
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();
    //-------------------------

    this.authService.login(this.usuario).subscribe( resp => {
      
    // --- Cerrar el popup ----
      Swal.close(); 
    // ------------------

      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {
         console.log(err);
    
         //---- POPUP ERROR ----
         Swal.fire({
           type: 'error',
           text: err.name,
           title: 'Error al autenticar' 
         });
         //------------------
      });
  }

}
