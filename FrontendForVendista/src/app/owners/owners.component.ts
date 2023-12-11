import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OwnerInfo } from '../entity/OwnerInfo';

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

  constructor(private httpClient: HttpClient) {
    this.getOwnersIds();
}

  async getOwnersIds() {
    this.ownerIdsList.splice(0);

    let allOwnersInfo = await this.httpClient.get<any>('/owners?token=f0d17d3cae184917802e2ef2').toPromise();

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
    let ownerItem = await this.httpClient.get<any>(`/owners/${this.selectedOwnerId}?token=f0d17d3cae184917802e2ef2`).toPromise();

    this.ownerInfo = ownerItem/*.item*/;

    let dfs = 3;
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

    let responce;
    await this.httpClient.put<OwnerInfo>(`/owners/${this.selectedOwnerId}?token=f0d17d3cae184917802e2ef2`, this.ownerInfo)
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
