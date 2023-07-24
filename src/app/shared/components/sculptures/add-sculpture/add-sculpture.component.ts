import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/guards/form-incomplete.guard';
import { SculptureService } from 'src/app/shared/services/sculpture.service';
import { Sculpture } from 'src/app/shared/models/sculpture';

@Component({
  selector: 'app-add-sculpture',
  templateUrl: './add-sculpture.component.html',
  styleUrls: ['./add-sculpture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSculptureComponent implements OnDestroy, CanComponentDeactivate {
  @Input()
  existingSculpture!: Sculpture;

  errorMessage: string = '';
  private destroyed$ = new Subject<void>();
  private formSubmitted = false;

  sculptureForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    basePrice: new FormControl('', Validators.required),
    baseWeight: new FormControl('', Validators.required),
  });

  constructor(
    private readonly router: Router,
    private readonly sculptureService: SculptureService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingSculpture'] && changes['existingSculpture'].currentValue) {
      this.sculptureForm.patchValue({ id: this.existingSculpture.id });
      this.sculptureForm.patchValue({ name: this.existingSculpture.name });
      this.sculptureForm.patchValue({
        basePrice: this.existingSculpture.basePrice.toString(),
      });
      this.sculptureForm.patchValue({
        baseWeight: this.existingSculpture.baseWeight.toString(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  isFormIncomplete(): boolean {
    return this.sculptureForm.dirty && !this.formSubmitted;
  }

  async onSubmit() {
    const { id, name, basePrice, baseWeight } = this.sculptureForm.value;

    if (id && name && basePrice && baseWeight) {
      const sculpture: Sculpture = {
        id,
        name,
        basePrice: parseInt(basePrice),
        baseWeight: parseFloat(baseWeight),
      };

      try {
        await this.sculptureService.addSculpture(sculpture);
        this.formSubmitted = true;
        this.router.navigate(['sculptures']);
      } catch (errorMessage) {
        this.errorMessage = errorMessage as string;
      }
    }
  }
}
