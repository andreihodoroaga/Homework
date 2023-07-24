import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { Sculpture } from 'src/app/shared/models/sculpture';
import { SculptureService } from 'src/app/shared/services/sculpture.service';

@Component({
  selector: 'app-edit-sculpture',
  templateUrl: './edit-sculpture.component.html',
  styleUrls: ['./edit-sculpture.component.scss']
})
export class EditSculptureComponent {
  sculpture!: Sculpture;
  private destroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly sculptureService: SculptureService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getSculpture();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getSculpture() {
    this.sculptureService.sculptureList$
      .pipe(
        takeUntil(this.destroyed$),
        map((sculptures) =>
          sculptures.find(
            (ord) => ord.id === this.activatedRoute.snapshot.params['id']
          )
        )
      )
      .subscribe((sculpture) => {
        this.sculpture = sculpture!;
      });
  }

  handleNavigation(direction: number) {
    this.sculptureService.getNextSculptureId(this.sculpture, direction).subscribe((id) => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['sculptures', id]));
    });
  }
}
