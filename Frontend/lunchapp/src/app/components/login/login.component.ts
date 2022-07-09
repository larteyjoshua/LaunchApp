import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,  } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ApiServicesService } from '../../services/apiServices.service';
import { Router } from '@angular/router';
import { loadLogins } from 'src/app/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
     private store: Store<AppState>,
     private service: ApiServicesService,
     private router: Router) {

   }
   loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  ngOnInit(): void {
  }


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
   this.store.dispatch(loadLogins({data:this.loginForm.value}) );
  //  this.service.login(this.loginForm.value).subscribe((token:any) =>{
  //   console.log(token)
  //   const accessToken =token.access_token
  //   localStorage.setItem('token',accessToken);
  //   this.router.navigateByUrl('home/dashboard')
  //  }

  //   )
  }


}
