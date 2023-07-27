import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CanFormComponentDeactivate } from 'src/app/shared/guards/form-incomplete.guard';
import { Sculpture } from 'src/app/shared/models/sculpture';
import { SculptureService } from 'src/app/shared/services/sculpture.service';
import { AddSculptureComponent } from '../add-sculpture/add-sculpture.component';

@Component({
  selector: 'app-edit-sculpture',
  templateUrl: './edit-sculpture.component.html',
  styleUrls: ['./edit-sculpture.component.scss'],
})
export class EditSculptureComponent implements CanFormComponentDeactivate {
  sculpture$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.sculptureService.sculptureList$.pipe(
        map((sculptures) => sculptures.find((ord) => ord.id === params['id']))
      );
    })
  );

  @ViewChild(AddSculptureComponent)
  addSculptureComponent!: AddSculptureComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly sculptureService: SculptureService,
    private readonly router: Router
  ) {}

  isFormIncomplete() {
    return this.addSculptureComponent.isFormIncomplete();
  }

  handleNavigation(sculpture: Sculpture, direction: number) {
    this.sculptureService
      .getNextSculptureId(sculpture, direction)
      .subscribe((id) => {
        this.router.navigate(['sculptures', id]);
      });
  }
}
