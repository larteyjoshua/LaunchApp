import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,  } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/reducers';
import { loadPasswordRecovery } from '../../actions/login.actions';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  hide: boolean = false;
  token: string ='';

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  passwordResetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {

  }


  onPasswordReset() {
    if (!this.passwordResetForm.valid) {
      this.toastrService.error( 'Form Input not Valid', 'Major Error', {
      });
      return;
    }
    else if (this.passwordResetForm.value.password1 !== this.passwordResetForm.value.password){
      this.toastrService.error( 'Entry Password Mismatch!', 'Major Error', {
      });
    }
    console.log(this.passwordResetForm.value);
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.token =params.token;
    })

      const data = { "token":this.token,
      "new_password":this.passwordResetForm.value.password
      }
   this.store.dispatch(loadPasswordRecovery({data:data }));
  }

}
