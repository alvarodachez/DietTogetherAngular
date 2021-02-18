export class AthleteDtoClass {
  constructor (
      public name: string,
      public surname: string,
      public weight: number,
      public height: number,
      public birthDay?: Date) {}
}