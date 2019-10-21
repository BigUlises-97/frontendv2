import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/';

  userToken: string;

  constructor( private http:HttpClient) { 
    this.leerToken(); //Para saber si hay token
    //console.log('Servicio arrancado pariente');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  login(usuario:UserModel){
    
    const authData = {
      email: usuario.email,
      password: usuario.password,
      gethash: true
    };

    return this.http.post(`${this.API_URL}login`, authData).pipe( map( resp =>{
      this.guardarToken(resp['token']);
      //Guardar info usuario sin datos sensibles - Sujeto a cambios
      let infoResponse = resp['user'];
      let user = {
        id: infoResponse.id,
        name: infoResponse.name,
        surname: infoResponse.surname,
        email: infoResponse.email,
        role: infoResponse.role
      }
      //----------------
      localStorage.setItem('user', JSON.stringify(user));
      return resp;
    }));

  }
  /* PENDIENTE MODIFICAR 
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
*/
  
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
    if(this.userToken.length>2){
      return true;
    }else{
      return false;
    }
  }

  leerUserInfo(){
    if(localStorage.getItem('user')){
      let str = localStorage.getItem('user');
      let userObject = JSON.parse(str);
      return userObject;
    }
  }

}
