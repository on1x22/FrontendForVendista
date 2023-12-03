import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInfo } from '../entity/UserInfo';

@Component({
  selector: 'users-app',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  userIdsList: number[] = [];
  selectedUserId: number | undefined;
  userInfo?: UserInfo;
  isEdited: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.getUserIds();
  }


  async getUserIds() {
    this.userIdsList.splice(0);

    let allUsersInfo = await this.httpClient.get<any>('/users?token=f0d17d3cae184917802e2ef2').toPromise();

    for (let i = 0; i < allUsersInfo.items.length; i++) {
      this.userIdsList.push(allUsersInfo.items[i].id);
    }
  }

  async onUserChanged(i: any) {
    //let userId = i;
    if (this.selectedUserId == i) {
      return;
    }

    this.editModeIsOff();
    this.selectedUserId = i;

    if (this.selectedUserId != null) {
      
      await this.getUserInfo();
    }
  }

  async getUserInfo() {
    let userItem = await this.httpClient.get<any>(`/users/${this.selectedUserId}?token=f0d17d3cae184917802e2ef2`).toPromise();

    this.userInfo = userItem.item;

    let dfs = 3;
  }

  editModeIsOn() {
    this.isEdited = true;
  }

  editModeIsOff() {
    this.isEdited = false;
  }
}
