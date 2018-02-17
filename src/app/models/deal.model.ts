import {Duration} from './duration.model';

export class Deal {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  cost: number;
  discount: number;
  reference: String;
}
