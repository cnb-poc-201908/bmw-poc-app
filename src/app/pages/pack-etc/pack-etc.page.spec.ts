import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackEtcPage } from './pack-etc.page';

describe('PackEtcPage', () => {
  let component: PackEtcPage;
  let fixture: ComponentFixture<PackEtcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackEtcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackEtcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
