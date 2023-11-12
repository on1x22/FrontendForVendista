import { Item } from "./TypeResponse"

export interface HistoryResponse {
  page_number: number
  items_per_page: number
  items_count: number
  items: CommandInfo[]
  success: boolean
}

export interface CommandInfo {
  terminal_id: number
  user_name: string
  command_id: number
  parameter1: number
  parameter2: number
  parameter3: number
  parameter4: number
  parameter5: number
  parameter6: number
  parameter7: number
  parameter8: number
  str_parameter1: string
  str_parameter2: string
  state: number
  state_name: string
  time_created: string
  time_delivered: string
  id: number
}

export class CommandWithName {
  time_created!: string;
  command!: string;
  parameter1!: number;
  parameter2!: number;
  parameter3!: number;
  state_name!: string
}

export class CommandTransformer {
  time_created!: string;
  command!: string;
  parameter1!: number;
  parameter2!: number;
  parameter3!: number;
  state_name!: string

  static getCommandListWithNames(histResp: HistoryResponse, commandTypes: Item[]): CommandWithName[] {
    let commandList: CommandWithName[] = [];
    for (let item of histResp.items) {
      for (let commandType of commandTypes) {
        if (item.command_id == commandType.id) {
          let command: CommandWithName = new CommandWithName();
          
          command.time_created = item.time_created;
          command.command = commandType.name;
          command.parameter1 = item.parameter1;
          command.parameter2 = item.parameter2;
          command.parameter3 = item.parameter3;
          command.state_name = item.state_name;

          commandList.push(command);
        }
      }
    }
    return commandList;
  }
}
