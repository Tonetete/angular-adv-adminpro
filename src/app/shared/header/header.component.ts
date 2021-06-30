import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styles.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }

  search(searchTerm: string) {
    if (!searchTerm.length) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${searchTerm}`);
  }
}
