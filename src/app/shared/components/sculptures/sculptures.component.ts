import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SculptureService } from '../../services/sculpture.service';
import { Sculpture } from '../../models/sculpture';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sculptures',
  templateUrl: './sculptures.component.html',
  styleUrls: ['./sculptures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent implements OnInit {
  sculptures$?: Observable<Sculpture[]>;

  constructor(private sculptureService: SculptureService, private router: Router) {
  }

  ngOnInit() {
    this.sculptures$ = this.sculptureService.sculptureList$;
  }

  handleNavigation() {
    this.router.navigate(["sculptures/add"])
  }
}
