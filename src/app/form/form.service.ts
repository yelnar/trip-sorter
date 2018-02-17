import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Deal, Duration} from '../models';

@Injectable()
export class FormService {

  constructor(private http: Http) {
  }

  deals: Deal[];
  departures: Set<string>;
  arrivals: Set<string>;
  baseMap = {};
  cheapest = {};
  fastest = {};

  init() {
    return this.http.get('api/deals.json')
      .map(response => <Deal[]>response.json().deals)
      .toPromise()
      .then(deals => {
        this.extractDeals(deals);
        this.extractDepartures(deals);
        this.extractArrivals(deals);
        this.buildBaseMap(deals);
      })
      .catch(this.handleError);
  }

  buildBaseMap(deals: Deal[]) {
    for (const deal of deals) {
      const departure = deal.departure;
      const arrival = deal.arrival;

      if (!this.baseMap[departure]) {
        this.baseMap[departure] = {};
      }

      if (!this.baseMap[departure][arrival]) {
        this.baseMap[departure][arrival] = [];
      }

      this.baseMap[departure][arrival].push(deal);
    }
  }

  extractDeals(deals: Deal[]) {
    this.deals = deals.map(deal => {
      deal.duration = this.calcDuration(deal.duration);
      deal.cost = this.calcCost(deal.cost, deal.discount);
      return deal;
    });
  }

  calcDuration(duration: Duration): Duration {
    duration.d = 60 * Number(duration.h) + Number(duration.m);
    return duration;
  }

  calcCost(baseCost: number, discount: number): number {
    return (discount > 0 ? (baseCost * discount) / 100 : baseCost);
  }

  extractDepartures(deals: Deal[]) {
    this.arrivals = new Set(deals.map(deal => deal.arrival));
  }

  extractArrivals(deals: Deal[]) {
    this.departures = new Set(deals.map(deal => deal.departure));
  }

  getCities() {
    return this.init()
      .then(() => {
        return {
          depatures: this.departures,
          arrivals: this.arrivals
        };
      });
  }

  search(departure: string, arrival: string) {
    console.log(departure, arrival);

    const route = {};
    const visited = {};
    route[departure] = {
      val: 0,
      deals: []
    };

    let from = departure;
    while (from !== arrival) {
      console.log(from);

      visited[from] = true;

      for (const to of Object.keys(this.baseMap[from])) {
        const minDeal = this.baseMap[from][to].reduce((acc, curr) => {
          return (acc.cost < curr.cost ? acc : curr);
        }, {cost: 0});

        const val = route[from].val + minDeal.cost;
        const deals = [...route[from].deals, minDeal];

        console.log(val, deals);

        if (!route[to] || route[to].val > val) {
          route[to] = {
            val,
            deals
          };
        }
      }

      let minVal = Infinity;
      for (const city of Object.keys(route)) {
        if (!visited[city] && route[city].val < minVal) {
          minVal = route[city].val;
          from = city;
        }
      }
    }

    return route[arrival];
  }

  handleError(error: Response) {
    const msg = `Error status code ${error.status} at ${error.url}`;
    console.error(msg);
  }
}
