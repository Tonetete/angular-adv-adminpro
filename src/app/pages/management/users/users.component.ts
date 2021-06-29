import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchResult, SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public from: number = 0;
  public incPage: number = 5;
  public loading: boolean = true;
  public imageSubscription!: Subscription;

  constructor(
    private modalImageService: ModalImageService,
    private userService: UserService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.imageSubscription = this.modalImageService.newImage
      .pipe(delay(200))
      .subscribe((img) => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.loading = false;
      this.totalUsers = total;
      if (users.length !== 0) {
        this.users = users;
      }
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    const searchValue = (
      document.getElementById('inputSearch') as HTMLInputElement
    ).value;

    if (searchValue) {
      this.search(searchValue);
    } else {
      this.loadUsers();
    }
  }

  search(criteria: string) {
    if (!criteria) {
      this.loadUsers();
    } else {
      const query = `criteria=${criteria}&from=${this.from}`;
      this.searchService
        .search('users', query)
        .subscribe((response: SearchResult) => {
          this.users = response.results as User[];
          this.totalUsers = response.total;
          if (this.totalUsers === 0) {
            this.from = 0;
          }
        });
    }
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.user.uid) {
      Swal.fire('Error', 'You cannot delete yourself!', 'error');
    } else {
      Swal.fire({
        title: 'Delete user?',
        text: `Do you want to delete ${user.name} user?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user).subscribe((response) => {
            this.loadUsers();
            Swal.fire(
              'User deleted',
              `${user.name} user has been deleted.`,
              'success'
            );
          });
        }
      });
    }
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe((response) => {});
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid || '', user.img);
  }
}
