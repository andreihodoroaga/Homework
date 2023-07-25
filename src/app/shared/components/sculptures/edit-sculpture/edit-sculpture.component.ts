import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Sculpture } from 'src/app/shared/models/sculpture';
import { SculptureService } from 'src/app/shared/services/sculpture.service';

@Component({
  selector: 'app-edit-sculpture',
  templateUrl: './edit-sculpture.component.html',
  styleUrls: ['./edit-sculpture.component.scss'],
})
export class EditSculptureComponent {
  sculpture$ = this.sculptureService.sculptureList$.pipe(
    map((sculptures) =>
      sculptures.find(
        (ord) => ord.id === this.activatedRoute.snapshot.params['id']
      )
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly sculptureService: SculptureService,
    private readonly router: Router
  ) {}

  handleNavigation(sculpture: Sculpture, direction: number) {
    this.sculptureService
      .getNextSculptureId(sculpture, direction)
      .subscribe((id) => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['sculptures', id]));
      });
  }
}
