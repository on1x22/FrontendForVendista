import { Component, Input } from '@angular/core';
//import { Task } from './entity/task';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { TypeInfo } from './entity/TypeInfo';
import { Root, Item } from './entity/TypeResponse';
import { SendedCommand } from './entity/SendedCommand';
import { async } from 'rxjs';
import { CommandInfo, CommandWithName, CommandTransformer, HistoryResponse } from './entity/HistoryResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'FrontendForVendista';

  //task: Task = new Task;
  //response: any;
  terminalsList: number[] = [];
  selectedTerminalId: number | undefined;
  commandData: any;
  commandTypes: Item[] = [];
  //@Input() itm: any;
  public changeCommand!: Item;
  sendedCommand: SendedCommand = new SendedCommand;
  historyCommandsList: CommandInfo[] = [];
  historyCommandsList2: CommandWithName[] = [];
  //commands!: HistoryResponse;
  //public par1name: string | undefined;
  //vaval1: number | undefined;

  constructor(private httpClient: HttpClient) {
   
  }

  

  async giveMeData()
  {
    /*this.http.get('/commands/types?token=577f185da0e44570b75de85c')
      .subscribe(result => {        
        this.var1 = result;

        console.log(this.var1);
      });*/
    /*const response = await fetch('/commands/types?token=577f185da0e44570b75de85c');

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    this.var1 = response;*/

    /*this.httpClient.get('/commands/types?token=577f185da0e44570b75de85c')
      .subscribe(result => {
        this.var1 = result;
        let vva = result;
      });*/

    /*this.httpClient.get<Task>('/commands/types?token=577f185da0e44570b75de85c')
      .subscribe({
        next: (data: Task) => {
          //this.var1 = data;
          cssa = data
          console.log(data);
          cssa = data;
        }
      });*/

    /*this.var1 = this.httpClient.get<Task>('/commands/types?token=577f185da0e44570b75de85c')
      .subscribe();*/
    this.terminalsList.push(129);

    this.selectedTerminalId = this.terminalsList[0];

    this.commandData = await this.httpClient.get<Root>('/commands/types?token=f0d17d3cae184917802e2ef2').toPromise();

    this.commandTypes = this.commandData.items;
    console.log('names:');
    for (let i = 0; i < this.commandTypes.length; i++) {
      console.log(this.commandTypes[i].name);
    }

    await this.getHistory();
  }

  onCommandTypeChange(e: any) {
    let index = e.target.value;
    this.changeCommand = this.commandData?.items[index];
    /*this.par1name = this.changeCommand.parameter_name1;
    this.vaval1 = this.changeCommand.parameter_default_value1*/
  }

  cancelCommand() {
    this.changeCommand.parameter_name1 = "";
  }

  async sendCommand() {
    //this.sendCommand = new SendedCommand;
    if (this.changeCommand != null)
    {
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
    /*await*/ this.httpClient.post<SendedCommand>(`/terminals/${this.selectedTerminalId}/commands`, this.sendedCommand, { 'params': params })
      .subscribe(result => {
        resp = result;
        console.log(result);
      })

    let resp2 = resp;
    await this.getHistory();

  }

  async getHistory() {
    /*let params = new HttpParams();
    params.append('OrderDesc', true);
    params.append('token', 'f0d17d3cae184917802e2ef2');*/

    let params = new HttpParams()
      .set('OrderDesc', "true")
      .set('token', "f0d17d3cae184917802e2ef2");

    var historyResponse: any = await this.httpClient.get<HistoryResponse>(`/terminals/${this.selectedTerminalId}/commands`, { 'params': params }).toPromise();

    this.historyCommandsList = historyResponse?.items;

    this.historyCommandsList2 = CommandTransformer
      .getCommandListWithNames(historyResponse, this.commandTypes);
  }
}
