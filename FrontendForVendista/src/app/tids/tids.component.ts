import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TidInfo } from '../entity/TidInfo';

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

  constructor(private httpClient: HttpClient) {
    this.getTids();
  }

  async getTids() {
    this.tidsList.splice(0);

    let allTidsInfo = await this.httpClient.get<any>('/tid?token=f0d17d3cae184917802e2ef2').toPromise();

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
    let tidItem = await this.httpClient.get<any>(`/tid/${this.selectedTid}?token=f0d17d3cae184917802e2ef2`).toPromise();

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
    await this.httpClient.put<TidInfo>(`/tid/${this.selectedTid}?token=f0d17d3cae184917802e2ef2`, this.tidInfo)
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
