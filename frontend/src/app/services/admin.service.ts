import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerAdmin = (admin: any) => {
    return this._http.post<any>(this.env + '/api/admin/registerAdmin', admin);
  };

  updateAdmin = (admin: any) => {
    return this._http.put<any>(this.env + '/api/admin/updateAdmin', admin);
  };

  listAdmin = () => {
    return this._http.get<any>(this.env + '/api/admin/listAdmin');
  };

  findAdmin = (_id: string) => {
    return this._http.get<any>(this.env + '/api/admin/findAdmin/' + _id);
  };
}
