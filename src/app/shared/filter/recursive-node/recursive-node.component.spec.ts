import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveNodeComponent } from './recursive-node.component';

describe('RecursiveNodeComponent', () => {
  let component: RecursiveNodeComponent;
  let fixture: ComponentFixture<RecursiveNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursiveNodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursiveNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
