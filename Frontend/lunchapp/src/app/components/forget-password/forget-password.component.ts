import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,  } from '@angular/forms'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder) {

   }

   loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]]
  })
  ngOnInit(): void {
  }


  onEmail() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

}
