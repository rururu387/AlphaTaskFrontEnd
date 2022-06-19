import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateMemeComponent } from './currency-rate-meme.component';

describe('CurrencyRateMemeComponent', () => {
  let component: CurrencyRateMemeComponent;
  let fixture: ComponentFixture<CurrencyRateMemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRateMemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
