import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public themeService: ThemeService, private fb: FormBuilder, public crudservice: CrudService, public authService: AuthService, private route: ActivatedRoute) { }

  /*----- Form Groups -----*/
  signupUser!: FormGroup;
  loginform!: FormGroup;

  /*----- Store Re Type Password -----*/
  reTypePass: any;

  /*----- Password Regex Pattern -----*/
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;

  ngOnInit(): void {
    /*----- Get Screen Size On Component Load -----*/
    this.themeService.windowSize();

    /*----- Get Sign Up User From Data Base -----*/
    this.getUsersFromDatabase();

    /*----- Store Component Name -----*/
    // this.themeService.ComponentName = this.route.snapshot.routeConfig?.title;

    /*=========== Log In Form ===========*/
    this.loginform = this.fb.group({
      Email: ['', Validators.required],
      passsword: ['', Validators.required]
    });

    /*=========== Sign Up Form ===========*/
    this.signupUser = this.fb.group({
      FirstName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      LastName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      MobileNo: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      DateOfBirth: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.pattern(this.passwordRegex), Validators.required])],
      RetypePassword: ['', Validators.compose([Validators.pattern(this.passwordRegex), Validators.required])],
    });

    /*----- If user already Login or Sign in then nevigate Todo list component -----*/
    if (this.authService.authorize) {
      this.authService.navigateProducts();
    }
  }

  /*====== Hide and Show Password ======*/
  hide = true;
  hide2 = true;

  /*====== Same Pass Error ======*/
  passwordSame = false;

  /*====== Signup Successfully Icon ======*/
  SignupIcon = false;

  /*====== Switch Log In And Sign Up Form ======*/
  ToggleForms = false;

  /*============================================= Sign Up (Add) New User =============================================*/
  SignUpUser() {
    /*----- if password and re type password same -----*/
    if (this.signupUser.value.RetypePassword == this.signupUser.value.Password) {
      this.crudservice.AddUser(this.signupUser.value).subscribe({
        next: (res: any) => {
          document.body.style.pointerEvents = 'none';
          this.passwordSame = false;
          this.authService.authorize = true;
          localStorage.setItem('UserAuthorize', 'true');
          let signupuserDetails: any = [this.signupUser.value];
          localStorage.setItem('loginUser', JSON.stringify(signupuserDetails));
          this.authService.GetloginUserfromDatabase();
          console.warn(res);
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          console.warn('User Submit Successfullly');
          this.SignupIcon = true;
          setTimeout(() => {
            this.authService.navigateProducts();
            document.body.style.pointerEvents = 'auto'; // add pointer event after exeute this function
          }, 2000);
        }
      })
    }

    /*----- if password and re type password Not Same -----*/
    else {
      this.passwordSame = true;
      this.authService.authorize = false;
      localStorage.setItem('UserAuthorize', 'false');
    }
  }


  /*---------- Mobile Number And Zip Code Validation ----------*/
  numberValidation(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  mobileNumber(event: any) {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
    return false;
  }


  /*=================================== Change (Toggle) Form ===================================*/
  ChangeForm() {
    this.ToggleForms = !this.ToggleForms;
  }


  /*------ Login User Email ------*/
  loginUserEmail: any;

  /*------ Login User Password ------*/
  loginUserPass: any;

  /*------ Login User Successfully Icon ------*/
  LoginIcon = false;

  /*------ Check User Exist Or Not ------*/
  CheckexistUser: any;

  /*----- Get Login User Details -----*/
  filterUser: any;

  // loginSuccessFully: any;
  CheckUser() {
    this.loginUserEmail = this.loginform.value.Email; // get Log in Email
    this.loginUserPass = this.loginform.value.passsword; // get Log in Password
    this.CheckexistUser = this.existusersData.some((data: any) => { return data.Email === this.loginUserEmail && data.Password == this.loginUserPass }); // Check Email Exist Or Not
    this.filterUser = this.existusersData.filter((data: any) => (data.Email == this.loginUserEmail && data.Password == this.loginUserPass)); // Get Log in User Data (object)
    localStorage.setItem('loginUser', JSON.stringify(this.filterUser));
    this.authService.GetloginUserfromDatabase();

    /*========== Check User Email And User Password Exist In This Object ==========*/
    // if (this.filterUser.Email == this.loginUserEmail && this.filterUser.Password == this.loginUserPass) {
    if (this.CheckexistUser) {
      this.authService.authorize = true;
      localStorage.setItem('UserAuthorize', 'true');
      this.LoginIcon = true;
      setTimeout(() => {
        this.authService.navigateProducts();
      }, 2000);
      console.warn('User Exist');
    }
    else {
      this.authService.authorize = false;
      this.LoginIcon = false;
      localStorage.setItem('UserAuthorize', 'false')
      console.warn('User Not Exist');
      Swal.fire({
        title: 'Error!',
        text: 'User Name And Password Incorrect',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  /*------ Get All Users Form Data Base ------*/
  existusersData: any;
  getUsersFromDatabase() {
    this.crudservice.GetUsers().subscribe((res: any) => {
      this.existusersData = res;
    })
  }
}
