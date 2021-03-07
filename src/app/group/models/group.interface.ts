export interface GroupInterface {
  id?: number;
  name: string;
  athletes: string[];
  expireDate: Date;
  challengeType?: string;
  enabled: boolean;
}