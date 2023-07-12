import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredSculptureFormComponent } from './configured-sculpture-form.component';

describe('ConfiguredSculptureFormComponent', () => {
  let component: ConfiguredSculptureFormComponent;
  let fixture: ComponentFixture<ConfiguredSculptureFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguredSculptureFormComponent]
    });
    fixture = TestBed.createComponent(ConfiguredSculptureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
