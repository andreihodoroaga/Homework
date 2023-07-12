import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SculptureService } from '../../services/sculpture.service';
import { Sculpture } from '../../models/sculpture';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sculptures',
  templateUrl: './sculptures.component.html',
  styleUrls: ['./sculptures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent {
  sculptures$?: Observable<Sculpture[]>;

  constructor(private sculptureService: SculptureService) {
    this.sculptures$ = this.sculptureService.sculptureList$;
  }
}
