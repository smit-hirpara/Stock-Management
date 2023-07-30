import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public service: ThemeService, public authService: AuthService) { }

  title = 'Stock-Management';
  ngOnInit(): void {
    this.service.windowSize();

    this.authService.GetloginUserfromDatabase();

    this.authService.userAuthorie();
    // this.authService.GetLoginUserDetails;
  }
  sidebarItems = [
    { logo: 'home', link: 'products', text: 'Products' },
    { logo: 'history', link: 'history', text: 'History' },
    { logo: 'report', link: 'report', text: 'Report' },
    // { logo: 'dashboard', link: 'gallery2', text: 'Gallery' },
    // { logo: 'playlist_add_check', link: 'contact', text: 'Risk Control' },
    // { logo: 'whatshot', link: '', text: 'Fire' },
    // { logo: 'format_color_fill', link: '', text: 'Hygiene' },
    // { logo: 'school', link: '', text: 'Eduction' },
    // { logo: 'schedule', link: '', text: 'Agenda' },
    // { logo: 'security', link: '', text: 'Personal' },
    // { logo: 'account_circle', link: '', text: 'Profile' },
    // { logo: 'settings', link: '', text: 'Settings' },
    // { logo: 'help', link: '', text: 'Help' },
    // { logo: 'exit_to_app', link: '', text: 'Log out' },
  ]

  logout() {
    localStorage.setItem('UserAuthorize', 'false');
    this.authService.authorize = false;
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }
  }
}
