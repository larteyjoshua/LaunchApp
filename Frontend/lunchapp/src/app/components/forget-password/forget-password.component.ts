import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,  } from '@angular/forms'
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/reducers';
import { loadPasswordReset } from '../../actions/login.actions';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private toastrService: ToastrService,
    private store: Store<AppState>,) {

   }

   resetPassword: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]]
  })
  ngOnInit(): void {
  }


  onEmail() {
    if (!this.resetPassword.valid) {
      this.toastrService.error( 'Email Input not Valid', 'Major Error', {
      });
      return;

    }
    console.log(this.resetPassword.value);
    this.store.dispatch(loadPasswordReset({email: this.resetPassword.value.email}))
  }

}
