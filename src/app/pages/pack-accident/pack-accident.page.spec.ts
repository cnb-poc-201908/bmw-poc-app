import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackAccidentPage } from './pack-accident.page';

describe('PackAccidentPage', () => {
  let component: PackAccidentPage;
  let fixture: ComponentFixture<PackAccidentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackAccidentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackAccidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
