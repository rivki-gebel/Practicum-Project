import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmloyeeComponent } from './edit-emloyee.component';

describe('EditEmloyeeComponent', () => {
  let component: EditEmloyeeComponent;
  let fixture: ComponentFixture<EditEmloyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmloyeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
