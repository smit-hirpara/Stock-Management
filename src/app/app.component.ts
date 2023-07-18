import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stock-Management';
  ngOnInit(): void {
    this.service.windowSize();
  }
  sidebarItems = [
    { logo: 'home', link: 'products', text: 'Products' },
    // { logo: 'business', link: 'about', text: 'Aout' },
    // { logo: 'store', link: 'gallery', text: 'Gallery' },
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

  constructor(public service: ThemeService, public authService: AuthService) { }
}
