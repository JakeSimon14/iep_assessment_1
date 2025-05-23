import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveTreeComponent } from './recursive-tree.component';

describe('RecursiveTreeComponent', () => {
  let component: RecursiveTreeComponent;
  let fixture: ComponentFixture<RecursiveTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursiveTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursiveTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
