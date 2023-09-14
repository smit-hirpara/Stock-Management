import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductComponent } from './sell-product.component';

describe('SellProductComponent', () => {
  let component: SellProductComponent;
  let fixture: ComponentFixture<SellProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellProductComponent]
    });
    fixture = TestBed.createComponent(SellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
