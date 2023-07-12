import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SculptureService } from '../../services/sculpture.service';
import { Sculpture } from '../../models/sculpture';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sculptures',
  templateUrl: './sculptures.component.html',
  styleUrls: ['./sculptures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent implements OnInit {
  sculptures$?: Observable<Sculpture[]>;

  constructor(private sculptureService: SculptureService) {
  }

  ngOnInit(): void {
    this.sculptures$ = this.sculptureService.sculptureList$;
  }
}
