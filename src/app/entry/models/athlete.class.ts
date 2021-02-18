export class AthleteClass {
  constructor (
      public name: string,
      public surname: string,
      public weightKilograms: string,
      public weightGrams: string,
      public heightMeters: string,
      public heightCentimeters: string,
      public birthDay?: Date) {}
}