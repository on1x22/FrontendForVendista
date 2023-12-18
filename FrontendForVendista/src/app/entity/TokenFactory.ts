export class TokenFactory {
  private static token: string = 'f0d17d3cae184917802e2ef2';

  private constructor() { }

  static GetToken(): string {
    return TokenFactory.token;
  }
}
