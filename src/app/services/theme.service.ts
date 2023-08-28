import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  GetProduct() {
    throw new Error('Method not implemented.');
  }

  constructor( private _snackBar: MatSnackBar) { }
  sideBarMode = 'side';
  toggleButton = false;
  opensidebar = true;
  sidebartogglebtn!: boolean;
  ngOnInit() {
    this.windowSize();
  }
  getBrowserSize() {
    let w: any, h: any;

    if (typeof window.innerWidth != 'undefined') {
      w = window.innerWidth; //other browsers
      h = window.innerHeight;
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
      w = document.documentElement.clientWidth; //IE
      h = document.documentElement.clientHeight;
    }
    else {
      w = document.body.clientWidth; //IE
      h = document.body.clientHeight;
    }
    return { 'width': w, 'height': h };
  }

  closeSideBar() {
    this.toggleButton = true;
  }

  openSideBar() {
    this.toggleButton = false;
  }


  windowSize() {
    if (parseInt(this.getBrowserSize().width) < 980) {
      this.sideBarMode = 'over';
      this.opensidebar = false;
      this.sidebartogglebtn = true;
    }
    else {
      this.sideBarMode = 'side';
      this.opensidebar = true;
      this.sidebartogglebtn = false;
    }
  }

  showSubmenu: boolean = false;
  isShowing = false;
  isExpanded = true;
  dropdoenitems = false;
  opeDropdown() {
    this.dropdoenitems = !this.dropdoenitems;
  }

  /*----------- Change Template Theme -----------*/
  getthemeformstorage = localStorage.getItem('ThemeChange');
  themechange = this.getthemeformstorage ? JSON.parse(this.getthemeformstorage) : false;
  theme = localStorage.getItem('sidebartheme') ? localStorage.getItem('sidebartheme') : 'primary';
  changeTheme(data: MatSlideToggleChange) {
    if (data.checked) {
      this.theme = "accent";
      this.themechange = true;
      localStorage.setItem('ThemeChange', 'true');
      localStorage.setItem('sidebartheme', 'accent');
    }
    else {
      this.theme = "primary";
      this.themechange = false;
      localStorage.setItem('ThemeChange', 'false');
      localStorage.setItem('sidebartheme', 'primary');
    }
  }

  /*=========== Snack Bar ===========*/
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  openSnackBar(Value: any, color:any) {
    this._snackBar.open(Value, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
      panelClass: [color]
    });
  }
}
