import {Duration} from './duration.model';

export class Deal {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  _duration: number;
  cost: number;
  _cost: number;
  discount: number;
  reference: String;
}
