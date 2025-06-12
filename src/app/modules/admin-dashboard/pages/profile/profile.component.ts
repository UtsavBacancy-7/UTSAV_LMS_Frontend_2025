import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/data/Models/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userData!: IUser;
  userId: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.userId > 0) {
      this.loadProfile();
    } else {
      console.warn('User ID not found in sessionStorage.');
    }
  }

  loadProfile() {
    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.userData = res?.data;
      },
      error: (err) => {
        console.error('Failed to fetch user profile', err);
      }
    });
  }
}
