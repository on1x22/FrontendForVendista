import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TidInfo } from '../entity/TidInfo';
import { TokenFactory } from '../entity/TokenFactory';

@Component({
  selector: 'tids-app',
  templateUrl: './tids.component.html',
  styleUrls: ['./tids.component.css']
})

export class TidsComponent {
  isEdited: boolean = false;
  tidsList: number[] = [];
  selectedTid: number | undefined;
  tidInfo?: TidInfo;
  token: string = TokenFactory.GetToken();

  constructor(private httpClient: HttpClient) {
    this.getTids();
  }

  async getTids() {
    this.tidsList.splice(0);

    let allTidsInfo = await this.httpClient.get<any>(`/tid?token=${this.token}`).toPromise();

    for (let i = 0; i < allTidsInfo.items.length; i++) {
      this.tidsList.push(allTidsInfo.items[i].id);
    }
  }

  async onTidChanged(i: any) {
    if (this.selectedTid == i) {
      return;
    }

    this.editModeIsOff();
    this.selectedTid = i;

    if (this.selectedTid != null) {

      await this.getTidInfo();
    }
  }

  async getTidInfo() {
    let tidItem = await this.httpClient.get<any>(`/tid/${this.selectedTid}?token=${this.token}`).toPromise();

    this.tidInfo = tidItem.item;

    let dfs = 3;
  }

  editModeIsOn() {
    this.isEdited = true;
  }

  editModeIsOff() {
    this.isEdited = false;
  }

  async onSendChangedTidInfo() {
    if (this.tidInfo == null)
      return;

    let responce;
    await this.httpClient.put<TidInfo>(`/tid/${this.selectedTid}?token=${this.token}`, this.tidInfo)
      .subscribe(result => { responce = result; });

    this.editModeIsOff();
  }

  onAddTid() {
    // This method is not available now, because I have only read rights
  }

  onDeleteTid() {
    // This method is not available now, because I have only read rights
  }
}
