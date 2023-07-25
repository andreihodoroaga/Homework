import {
  Component,
  forwardRef,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';
import {
  Material,
  materialPriceMultipliers,
  materialWeightMultipliers,
} from 'src/app/shared/models/material';
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
export class ConfiguredSculptureFormComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  value!: ConfiguredSculpture;
  disabled = false;
  sculptures$ = this.sculptureService.sculptureList$;
  materials = Object.keys(Material);
  private destroyed$ = new Subject<void>();

  onChange: (value: ConfiguredSculpture) => void = () => {};
  onTouched: () => void = () => {};

  sculptureControl = new FormControl();
  materialControl = new FormControl();

  @Input() configuredSculptures: ConfiguredSculpture[] = [];
  @Output() newConfiguredSculptureEvent =
    new EventEmitter<ConfiguredSculpture>();
  @Output() removeConfiguredSculptureEvent =
    new EventEmitter<ConfiguredSculpture>();

  constructor(private sculptureService: SculptureService) {
    merge(this.sculptureControl.valueChanges, this.materialControl.valueChanges)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.updateValue());
  }

  ngOnInit(): void {
    this.sculptureService.fetchSculptures();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public get totalSculpturesWeight() {
    return this.configuredSculptures
      .map(
        (configuredSculpture) =>
          configuredSculpture.sculpture.baseWeight *
          materialWeightMultipliers[configuredSculpture.material]
      )
      .reduce((partialSum, a) => partialSum + a, 0);
  }

  public get totalSculpturesPrice() {
    return this.configuredSculptures
      .map(
        (configuredSculpture) =>
          configuredSculpture.sculpture.basePrice *
          materialPriceMultipliers[configuredSculpture.material]
      )
      .reduce((partialSum, a) => partialSum + a, 0);
  }

  writeValue(value: ConfiguredSculpture): void {
    if (value) {
      this.value = value;
      this.sculptureControl.setValue(this.value.sculpture, {
        emitEvent: false,
      });
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
      material: this.materialControl.value,
    };
    this.onChange(this.value);
    this.onTouched();
  }

  addConfiguredSculpture(sculpture: Sculpture, material: Material) {
    this.newConfiguredSculptureEvent.emit({
      sculpture,
      material,
    });
  }

  removeConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this.removeConfiguredSculptureEvent.emit(configuredSculpture);
  }
}
