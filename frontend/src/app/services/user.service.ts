import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env: string

  constructor(private _http: HttpClient, private _router: Router) { this.env = environment.APP_URL }

  register = (user: any) => {
    return this._http.post<any>(this.env + '/api/user/register', user);
  }

  login = (user: any) => {
    return this._http.post<any>(this.env + '/api/user/login', user);
  }

  getUserRole = (email: string) => {
    return this._http.get<any>(this.env + '/api/user/getUserRole/' + email);
  }

  listUser = (name: string) => {
    return this._http.get<any>(this.env + '/api/user/list/' + name);
  }

  findUser = (_id: string) => {
    return this._http.get<any>(this.env + '/api/user/find/' + _id);
  }

  updateUser = (user: any) => {
    return this._http.put<any>(this.env + '/api/user/update', user);
  }

  deleteUser = (user: any) => {
    return this._http.delete<any>(this.env + '/api/user/delete/' + user._id);
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAdmin() {
    return localStorage.getItem('admin') === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    this._router.navigate(['/login'])
  }
}
