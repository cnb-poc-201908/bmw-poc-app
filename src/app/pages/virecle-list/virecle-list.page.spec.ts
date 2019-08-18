import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirecleListPage } from './virecle-list.page';

describe('VirecleListPage', () => {
  let component: VirecleListPage;
  let fixture: ComponentFixture<VirecleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirecleListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirecleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
