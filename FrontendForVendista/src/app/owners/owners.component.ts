import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwnerInfo } from '../entity/OwnerInfo';
import { DirectorInfo } from '../entity/DirectorInfo';
import { TokenFactory } from '../entity/TokenFactory';

@Component({
  selector: 'owners-app',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})

export class OwnersComponent {
  isEdited: boolean = false;
  ownerIdsList: number[] = [];
  selectedOwnerId: number | undefined;
  ownerInfo?: OwnerInfo;
  directorInfo?: DirectorInfo;
  token: string = TokenFactory.GetToken();

  constructor(private httpClient: HttpClient) {
    this.getOwnersIds();
}

  async getOwnersIds() {
    this.ownerIdsList.splice(0);

    let allOwnersInfo = await this.httpClient.get<any>(`/owners?token=${this.token}`).toPromise();

    for (let i = 0; i < allOwnersInfo.items.length; i++) {
      this.ownerIdsList.push(allOwnersInfo.items[i].id);
    }
  }

  async onOwnerChanged(i: any) {
    if (this.selectedOwnerId == i) {
      return;
    }

    this.editModeIsOff();
    this.selectedOwnerId = i;

    if (this.selectedOwnerId != null) {

      await this.getOwnerInfo();
    }
  }

  async getOwnerInfo() {
    let ownerItem = await this.httpClient.get<any>(`/owners/${this.selectedOwnerId}?token=${this.token}`).toPromise();

    this.ownerInfo = ownerItem;
    this.directorInfo = ownerItem.director_info_initial;
  }

  editModeIsOn() {
    this.isEdited = true;
  }

  editModeIsOff() {
    this.isEdited = false;
  }

  async onSendChangedOwnerInfo() {
    if (this.ownerInfo == null)
      return;

    this.ownerInfo.modify_time = new Date();
    let responce;

    await this.httpClient.put<OwnerInfo>(`/owners?token=${this.token}`, this.ownerInfo)
      .subscribe(result => { responce = result; });

    this.editModeIsOff();
  }

  onAddOwner() {
    // This method is not available now, because I have only read rights
  }

  onDeleteOwner() {
    // This method is not available now, because I have only read rights
  }
}
