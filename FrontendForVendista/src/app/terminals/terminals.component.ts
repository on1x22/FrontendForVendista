import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Root, Item } from '../entity/TypeResponse';
import { SendedCommand } from '../entity/SendedCommand';
import { CommandInfo, CommandWithName, CommandTransformer, HistoryResponse } from '../entity/HistoryResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'terminals-app',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.css']
})

export class TerminalsComponent {
  terminalsList: number[] = [];
  selectedTerminalId: number | undefined;
  commandData: any;
  commandTypes: Item[] = [];
  public changeCommand!: Item;
  sendedCommand: SendedCommand = new SendedCommand;
  historyCommandsList: CommandInfo[] = [];
  historyCommandsList2: CommandWithName[] = [];

  constructor(private httpClient: HttpClient) {
    this.getTreminalsId();
  }

  async giveMeData() {
    this.terminalsList.splice(0);
    await this.getTreminalsId();

    //this.terminalsList.push(129);
    //this.terminalsList.push(130);
    //this.terminalsList.push(135);

    //this.selectedTerminalId = this.terminalsList[0];

    /*this.commandData = await this.httpClient.get<Root>('/commands/types?token=f0d17d3cae184917802e2ef2').toPromise();
    this.commandTypes = this.commandData.items;*/

    await this.getCommandTypes();

    //console.log('names:');
    //for (let i = 0; i < this.commandTypes.length; i++) {
    //  console.log(this.commandTypes[i].name);
    //}

    await this.getHistory();
  }

  async getTreminalsId() {
    this.terminalsList.splice(0);

    let allTerminalsInfo = await this.httpClient.get<any>('/terminals?token=f0d17d3cae184917802e2ef2').toPromise();
    for (let i = 0; i < allTerminalsInfo.items.length; i++) {
      this.terminalsList.push(allTerminalsInfo.items[i].id);
    }

  }

  async onTerminalChange(i: any) {
    let terminalId = i/*.target.value*/;
    this.selectedTerminalId = this.terminalsList[terminalId];

    if (this.commandTypes == null || this.commandTypes.length == 0) {
      await this.getCommandTypes();
    }

    await this.getHistory();
  }

  async getCommandTypes() {
    this.commandData = await this.httpClient.get<Root>('/commands/types?token=f0d17d3cae184917802e2ef2').toPromise();
    this.commandTypes = this.commandData.items;
  }

  onCommandTypeChange(e: any) {
    let index = e.target.value;
    this.changeCommand = this.commandData?.items[index];
  }

  cancelCommand() {
    this.changeCommand.parameter_name1 = "";
  }

  async sendCommand() {
    if (this.changeCommand != null) {
      if (this.changeCommand.id != null)
        this.sendedCommand.command_id = this.changeCommand.id;

      if (this.changeCommand.parameter_default_value1 != null)
        this.sendedCommand.parameter1 = this.changeCommand.parameter_default_value1;
      else this.sendedCommand.parameter1 = 0;

      if (this.changeCommand.parameter_default_value2 != null)
        this.sendedCommand.parameter2 = this.changeCommand.parameter_default_value2;
      else this.sendedCommand.parameter2 = 0;

      if (this.changeCommand.parameter_default_value3 != null)
        this.sendedCommand.parameter3 = this.changeCommand.parameter_default_value3;
      else this.sendedCommand.parameter3 = 0;

      if (this.changeCommand.parameter_default_value4 != null)
        this.sendedCommand.parameter4 = this.changeCommand.parameter_default_value4;

      if (this.changeCommand.parameter_default_value5 != null)
        this.sendedCommand.parameter5 = this.changeCommand.parameter_default_value5;

      if (this.changeCommand.parameter_default_value6 != null)
        this.sendedCommand.parameter6 = this.changeCommand.parameter_default_value6;

      if (this.changeCommand.parameter_default_value7 != null)
        this.sendedCommand.parameter7 = this.changeCommand.parameter_default_value7;

      if (this.changeCommand.parameter_default_value8 != null)
        this.sendedCommand.parameter8 = this.changeCommand.parameter_default_value8;

      if (this.changeCommand.str_parameter_default_value1 != null)
        this.sendedCommand.str_parameter1 = this.changeCommand.str_parameter_default_value1;

      if (this.changeCommand.str_parameter_default_value2 != null)
        this.sendedCommand.str_parameter2 = this.changeCommand.str_parameter_default_value2;
    }

    let params = new HttpParams()
      .set('token', "f0d17d3cae184917802e2ef2");

    let resp;
    await this.httpClient.post<SendedCommand>(`/terminals/${this.selectedTerminalId}/commands`, this.sendedCommand, { 'params': params })
      .subscribe(result => {
        resp = result;
        //console.log(result);
      })

    //let resp2 = resp;
    /*await*/ this.getHistory();

  }

  async getHistory() {

    let params = new HttpParams()
      .set('OrderDesc', "true")
      .set('token', "f0d17d3cae184917802e2ef2");

    var historyResponse: any = await this.httpClient.get<HistoryResponse>(`/terminals/${this.selectedTerminalId}/commands`, { 'params': params }).toPromise();

    this.historyCommandsList = /*await*/ historyResponse?.items;

    this.historyCommandsList2 = CommandTransformer
      .getCommandListWithNames(historyResponse, this.commandTypes);
  }

}
