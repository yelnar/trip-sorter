import {TestBed, inject, async} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {FormService} from './form.service';
import {CHEAPEST, COST, FASTEST} from './form.constants';

describe('FormService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FormService
      ]
    });
  }));

  describe('getDeals', () => {
    it('should return Deals array',
      inject([FormService], formService => {
        formService.getDeals().then(response => {
          expect(response.length).toBe(144);
        });
      }));
  });

  describe('search', () => {
    it('should return cheapest route from Moscow to London',
      inject([FormService], formService => {
        formService.init()
          .then(() => formService.search('Moscow', 'London', CHEAPEST))
          .then((response) => {
            expect(response.length).toBe(4);
            expect(response[0].departure).toBe('Moscow');
            expect(response[0].arrival).toBe('Prague');
            expect(response[0].transport).toBe('bus');
            expect(response[0][COST]).toBe(30);
            expect(response[1].departure).toBe('Prague');
            expect(response[1].arrival).toBe('Brussels');
            expect(response[1].transport).toBe('bus');
            expect(response[1][COST]).toBe(30);
            expect(response[2].departure).toBe('Brussels');
            expect(response[2].arrival).toBe('Amsterdam');
            expect(response[2].transport).toBe('bus');
            expect(response[2][COST]).toBe(20);
            expect(response[3].departure).toBe('Amsterdam');
            expect(response[3].arrival).toBe('London');
            expect(response[3].transport).toBe('bus');
            expect(response[3][COST]).toBe(20);
          });
      }));
  });
});
