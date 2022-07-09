import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateAdmin, UserLoginDetail, ShowAdmin, CreateUser, ShowUser } from '../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { }


  login(user:any): Observable<any>{
    localStorage.removeItem("token");
    const body = new HttpParams()
    .set('username', user.username)
    .set('password', user.password)

    return this.http.post('login', body)

  }

  getAllAdmins(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/admin/'
    return this.http.get(url, {headers})
  }

  getAllUsers(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/user/'
    return this.http.get(url, {headers})
  }

  getAllOrders(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/order/'
    return this.http.get(url, {headers})
  }

  getAllRiders(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/rider/'
    return this.http.get(url, {headers})
  }

  getAllCompanies(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/company/'
    return this.http.get(url, {headers})
  }

  getAllRoles(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/role/'
    return this.http.get(url, {headers})
  }

  getAllUserRoles(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/userRole/'
    return this.http.get(url, {headers})
  }

  getAllfoods(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/food/'
    return this.http.get(url, {headers})
  }
  getAllAccounts(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/account/'
    return this.http.get(url, {headers})
  }

  getAllFeedbacks(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/feedback/'
    return this.http.get(url, {headers})
  }


  createAdmin(admin:CreateAdmin):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('RD', admin)
  const url = '/admin/admin/register'
    return this.http.post(url, admin, {headers})
  }

  updateAdmin(id:number, admin:ShowAdmin):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  const url = '/admin/' + id
    return this.http.put(url, admin, {headers})
  }

  deleteAdmin(id:number):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
  const url = '/admin/admin/delete/' + id
    return this.http.delete(url, {headers})
  }


  createUser(user:CreateUser):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('RD', user)
  const url = '/admin/user/register'
    return this.http.post(url, user, {headers})
  }

  updateUser(id:number, user:ShowUser):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('data', user)
  const url = '/admin/user/update/' + id
    return this.http.put(url, user, {headers})
  }

  deleteUser(id:number):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
  const url = '/admin/user/delete/' + id
    return this.http.delete(url, {headers})
  }

}
