import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../entity/UserInfo';
import { TokenFactory } from '../entity/TokenFactory';

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
  token: string = TokenFactory.GetToken();

  constructor(private httpClient: HttpClient) {
    this.getUserIds();
  }


  async getUserIds() {
    this.userIdsList.splice(0);

    let allUsersInfo = await this.httpClient.get<any>(`/users?token=${this.token}`).toPromise();

    for (let i = 0; i < allUsersInfo.items.length; i++) {
      this.userIdsList.push(allUsersInfo.items[i].id);
    }
  }

  async onUserChanged(i: any) {
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
    let userItem = await this.httpClient.get<any>(`/users/${this.selectedUserId}?token=${this.token}`).toPromise();

    this.userInfo = userItem.item;
  }

  editModeIsOn() {
    this.isEdited = true;
  }

  editModeIsOff() {
    this.isEdited = false;
  }

  async onSendChangedUserInfo() {
    if (this.userInfo == null)
      return;

    let responce;
    await this.httpClient.put<UserInfo>(`/users/${this.selectedUserId}?token=${this.token}`, this.userInfo)
      .subscribe(result => { responce = result; });

    this.editModeIsOff();
  }

  onAddUser() {
    // This method is not available now, because I have only read rights
  }

  onDeleteUser() {
    // This method is not available now, because I have only read rights
  }
}
