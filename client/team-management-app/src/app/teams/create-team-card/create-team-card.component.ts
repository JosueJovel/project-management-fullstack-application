import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-team-card',
  templateUrl: './create-team-card.component.html',
  styleUrl: './create-team-card.component.css'
})
export class CreateTeamCardComponent {
showCreateTeamPopup: Boolean = false; //Do not show popup by default
@Output() close = new EventEmitter<void>(); //This is how we emit a (close) event to the parent.


//Controls for showing/dissapearing the popup
openPopup() {
  this.showCreateTeamPopup = true;
}
closePopup() {
  this.showCreateTeamPopup = false;
  //Emit close event to notify parent (teams)
  this.close.emit();
}
}
