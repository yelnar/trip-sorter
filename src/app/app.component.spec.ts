import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormComponent} from './form/form.component';
import {FormInputComponent} from './form/input/form-input.component';
import {FormOutputComponent} from './form/output/form-output.component';
import {FormOutputRouteComponent} from './form/output/route/form-output-route.component';
import {FormsModule} from '@angular/forms';
import {FormService} from './form/form.service';
import {HttpModule} from '@angular/http';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [
        AppComponent,
        FormComponent,
        FormInputComponent,
        FormOutputComponent,
        FormOutputRouteComponent
      ],
      providers: [
        FormService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
