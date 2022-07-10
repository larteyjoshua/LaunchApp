import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateAdmin, UserLoginDetail, ShowAdmin, CreateUser, ShowUser, CreateCompany, ShowCompany, CreateRider, ShowRider, ShowOrder, UserRole } from '../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { }

// =============== Login Api Services ===================
  login(user:any): Observable<any>{
    localStorage.removeItem("token");
    const body = new HttpParams()
    .set('username', user.username)
    .set('password', user.password)

    return this.http.post('login', body)

  }


// =============== Admin Api Services ===================
  getAllAdmins(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/admin/'
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


// =============== User Api Services ===================
  getAllUsers(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/user/'
    return this.http.get(url, {headers})
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


// =============== Order Api Services ===================
  getAllOrders(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/order/'
    return this.http.get(url, {headers})
  }

  updateOrder(id:number, order:ShowOrder):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }

  console.log('data', order)
  const url = '/admin/order/update/' + id
    return this.http.put(url, order, {headers})
}
deleteOrder(id:number):Observable<any> {
  const geToken = localStorage.getItem("token")
  const headers = {
    'Authorization': 'Bearer ' + geToken,
    'Content-type': 'application/x-www-form-urlencoded'
}
const url = '/admin/order/delete/' + id
  return this.http.delete(url, {headers})
}


// =============== Rider Api Services ===================
  getAllRiders(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/rider/'
    return this.http.get(url, {headers})
  }

  createRider(rider:CreateRider):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('RD', rider)
  const url = '/admin/rider/add'
    return this.http.post(url, rider, {headers})
  }

  updateRider(id:number, rider:ShowRider):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('data', rider)
  const url = '/admin/rider/update/' + id
    return this.http.put(url, rider, {headers})
  }

  deleteRider(id:number):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
  const url = '/admin/rider/delete/' + id
    return this.http.delete(url, {headers})
  }


  // =============== Company Api Services ===================
  getAllCompanies(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/company/'
    return this.http.get(url, {headers})
  }

  createCompany(company:CreateCompany):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('RD', company)
  const url = '/admin/company/add'
    return this.http.post(url, company, {headers})
  }

  updateCompany(id:number, company:ShowCompany):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('data', company)
  const url = '/admin/company/update/' + id
    return this.http.put(url, company, {headers})
  }

  deleteCompany(id:number):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
  const url = '/admin/company/delete/' + id
    return this.http.delete(url, {headers})
  }


  // =============== Role Api Services ===================
  getAllRoles(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/role/'
    return this.http.get(url, {headers})
  }


  // =============== UserRole Api Services ===================
  getAllUserRoles(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/userRole/'
    return this.http.get(url, {headers})
  }

  createUserRole(userRole:UserRole):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('RD', userRole)
  const url = '/admin/userRole/add'
    return this.http.post(url, userRole, {headers})
  }

  updateUserRole(id:number, userRole:UserRole):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/json'
  }
  console.log('data', userRole)
  const url = '/admin/userRole/update/' + id
    return this.http.put(url, userRole, {headers})
  }

  deleteUserRole(id:number):Observable<any> {
    const geToken = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
  const url = '/admin/userRole/delete/' + id
    return this.http.delete(url, {headers})
  }


  // =============== Food Api Services ===================
  getAllfoods(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/food/'
    return this.http.get(url, {headers})
  }


  // =============== Account Api Services ===================
  getAllAccounts(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/account/'
    return this.http.get(url, {headers})
  }


  // =============== Feedkack Api Services ===================
  getAllFeedbacks(): Observable<any>{
    const geToken = localStorage.getItem("token")
   const headers = {
      'Authorization': 'Bearer ' + geToken,
      'Content-type': 'application/x-www-form-urlencoded'
  }
    const url = '/admin/feedback/'
    return this.http.get(url, {headers})
  }

}
