import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.scss']
})
export class EditContainerComponent {
  @Output()
  handleNavigationEvent = new EventEmitter<number>();

  handleNavigation(direction: number) {
    this.handleNavigationEvent.emit(direction);
  }
}
