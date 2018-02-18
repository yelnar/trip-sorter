import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {CHEAPEST, FASTEST, COST, DURATION, DEALS_URL} from './form.constants';
import {Deal, Duration} from './models';

@Injectable()
export class FormService {

  constructor(private http: Http) {
  }

  departures: Set<string>;
  arrivals: Set<string>;
  baseMap = {};
  cheapest = {};
  fastest = {};

  private getDeals(): Promise<Deal[]> {
    return this.http.get(DEALS_URL)
      .map(response => <Deal[]>response.json().deals)
      .toPromise();
  }

  private init() {
    return this.getDeals()
      .then(deals => {
        this.extractDepartures(deals);
        this.extractArrivals(deals);
        this.buildBaseMap(deals);
      })
      .catch(this.handleError);
  }

  private buildBaseMap(deals: Deal[]) {
    for (const deal of deals) {
      deal[DURATION] = this.calcDuration(deal.duration);
      deal[COST] = this.calcCost(deal.cost, deal.discount);

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

    // console.log(this.baseMap);
  }

  private calcDuration(duration: Duration): number {
    return 60 * Number(duration.h) + Number(duration.m);
  }

  private calcCost(baseCost: number, discount: number): number {
    return baseCost * (100 - discount) / 100;
  }

  private extractDepartures(deals: Deal[]) {
    this.arrivals = new Set(deals.map(deal => deal.arrival));
  }

  private extractArrivals(deals: Deal[]) {
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

  search(departure: string, arrival: string, type: string) {
    let optimal, param;

    if (type === CHEAPEST) {
      optimal = this.cheapest;
      param = COST;
    } else if (type === FASTEST) {
      optimal = this.fastest;
      param = DURATION;
    }

    // console.log(departure, arrival, type);
    // console.log(optimal, param);

    return new Promise((resolve, reject) => {
      if (optimal[departure] && optimal[departure][arrival]) {
        return resolve(optimal[departure][arrival].deals);
      }

      const route = {};
      const visited = {};
      route[departure] = { val: 0, deals: [] };

      let from = departure;
      visited[from] = true;
      while (!visited[arrival]) {
        for (const to of Object.keys(this.baseMap[from])) {
          if (visited[to]) { continue; }

          const minDeal = this.baseMap[from][to].reduce((acc, curr) => {
            return (acc[param] < curr[param] ? acc : curr);
          }, { [param]: Infinity });

          const val = route[from].val + minDeal[param];
          const deals = [...route[from].deals, minDeal];

          if (!route[to] || route[to].val > val) {
            route[to] = { val, deals };
          }
        }

        let minVal = Infinity;
        for (const city of Object.keys(route)) {
          if (!visited[city] && route[city].val < minVal) {
            minVal = route[city].val;
            from = city;
          }
        }

        visited[from] = true;
      }

      const citiesToCache = Object.keys(route).filter(to => visited[to] && route[to].val > 0);
      this.cacheRoutes(optimal, departure, route, citiesToCache);
      return resolve(route[arrival].deals);
    });
  }

  private cacheRoutes(optimal, from, route, cities) {
    for (const to of cities) {
      if (!optimal[from]) {
        optimal[from] = {};
      }
      optimal[from][to] = route[to];
    }
  }

  private handleError(error: Response) {
    const msg = `Error status code ${error.status} at ${error.url}`;
    console.error(msg);
  }
}
