import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCampainPage } from './pack-campain.page';

describe('PackCampainPage', () => {
  let component: PackCampainPage;
  let fixture: ComponentFixture<PackCampainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackCampainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCampainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
