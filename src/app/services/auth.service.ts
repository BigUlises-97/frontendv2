import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrarUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private ingresarUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  private API_KEY = 'AIzaSyA0UG77HFljumnPETG69l9vvHmXL4JbB5E';

  userToken: string;

  //Crear nuevos
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient) { 
    this.leerToken(); //Para saber si hay token
  }

  logout(){
    localStorage.removeItem('token');
  }
  
  login(usuario:User){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.ingresarUrl}${this.API_KEY}`, authData).pipe( map( resp =>{
      this.guardarToken(resp['idToken']);
      return resp;
    }));

  }
  //New user
  registrar(usuario:User){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.registrarUrl}${this.API_KEY}`, authData).pipe( map( resp =>{
      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  
  private guardarToken( idToken:string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  //Comprobar por validacion que este autenticado
  autenticado():boolean{
    return this.userToken.length>2;
  }

}
