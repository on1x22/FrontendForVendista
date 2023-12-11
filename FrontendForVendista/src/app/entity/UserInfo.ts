export class UserInfo {
  name!: string;
  login!: string;
  email!: string;
  owner_id!: number;
  role!: number;
  owner_name!: string;
  division_id!: number;
  expire!: Date;
  my_vendista!: boolean;
  timezone!: string;
  id!: number;
}

export class UserInfoItem {
  item: UserInfo | undefined;

  constructor(userInfo: UserInfo | undefined) {
    this.item = userInfo;
  }
}
