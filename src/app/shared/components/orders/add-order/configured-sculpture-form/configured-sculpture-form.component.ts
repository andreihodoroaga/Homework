import { Component, forwardRef, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';
import { Material } from 'src/app/shared/models/material';
import { Sculpture } from 'src/app/shared/models/sculpture';
import { SculptureService } from 'src/app/shared/services/sculpture.service';

@Component({
  selector: 'app-configured-sculpture-form',
  templateUrl: './configured-sculpture-form.component.html',
  styleUrls: ['./configured-sculpture-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfiguredSculptureFormComponent),
      multi: true,
    },
  ],
})
export class ConfiguredSculptureFormComponent implements ControlValueAccessor, OnInit {
  value!: ConfiguredSculpture;
  disabled = false;
  sculptures$ = this.sculptureService.sculptureList$;
  materials = Object.keys(Material).slice(3);

  onChange: (value: ConfiguredSculpture) => void = () => {};
  onTouched: () => void = () => {};

  sculptureControl = new FormControl();
  materialControl = new FormControl();

  @Input() configuredSculptures: ConfiguredSculpture[] = [];
  @Output() newConfiguredSculptureEvent = new EventEmitter<ConfiguredSculpture>();
  @Output() removeConfiguredSculptureEvent = new EventEmitter<ConfiguredSculpture>();

  constructor(private sculptureService: SculptureService) {
    this.sculptureControl.valueChanges.subscribe(() => this.updateValue());
    this.materialControl.valueChanges.subscribe(() => this.updateValue());
  }

  ngOnInit(): void {
    this.sculptureService.fetchSculptures();
  }

  writeValue(value: ConfiguredSculpture): void {
    if (value) {
      this.value = value;
      this.sculptureControl.setValue(this.value.sculpture, { emitEvent: false });
      this.materialControl.setValue(this.value.material, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: ConfiguredSculpture) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(): void {
    this.value = {
      sculpture: this.sculptureControl.value,
      material: this.materialControl.value
    };
    this.onChange(this.value);
    this.onTouched();
  }

  onSubmit(sculpture: Sculpture, material: Material) {
    const configuredSculpture: ConfiguredSculpture = {
      sculpture,
      material
    }

    this.newConfiguredSculptureEvent.emit(configuredSculpture);
  }

  removeConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this.removeConfiguredSculptureEvent.emit(configuredSculpture);
  }
}
