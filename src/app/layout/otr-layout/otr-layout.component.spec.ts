import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrLayoutComponent } from './otr-layout.component';

describe('OtrLayoutComponent', () => {
  let component: OtrLayoutComponent;
  let fixture: ComponentFixture<OtrLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtrLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
