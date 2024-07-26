import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullUserDto, TeamRequestDto } from '../../models';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-team-creation-popup',
  templateUrl: './team-creation-popup.component.html',
  styleUrl: './team-creation-popup.component.css'
})
export class TeamCreationPopupComponent implements OnInit{

    teamForm: FormGroup; //This FormGroup conslidates all the relevant FromControls into once place
    @Output() close = new EventEmitter<void>(); //This is how we emit a (close) event to the parent.
    teamMembers: FullUserDto[];
    selectedMembers: FullUserDto[] = [];
    errorMessage: string | undefined;

    constructor(private formBuilder: FormBuilder, private backendService: BackendService) {}

    async ngOnInit(): Promise<void> {
      this.teamForm = this.formBuilder.group({ //Building a new form grouo
        name: [''], //Making individual FormControls that make up this FormGroup
        description: [''],
        selectedUser: ['']
      })
      this.teamMembers = await this.backendService.getActiveMembers();
    }

    async onSubmit() {
      //Process data entered here into a DTO, then send to backend.
      const formData = this.teamForm.value; //Capture the formgroup data

      //Create a newTeamRequestDto
      const newTeamDto: TeamRequestDto = {
        name: formData["name"],
        description: formData["description"],
        users: this.selectedMembers,
      }
      
      const result = await this.backendService.createTeam(newTeamDto); //This will create a new team in the database, and then update our list of teams
      //This popup should wait for the API to say it saved the new team (or display an error otherwise)

      if(result.success) {
      this.close.emit(); //Emit a close event to wipe away the popup
      } else {
        this.errorMessage = result.error;
      }
    }
  
    closeEvent() { //For when the popup is simply closed (team creation canceled), emit a close event to make the popup dissapear in the parent component
      this.close.emit();
    }

    selectMember(): void { //For when a new team member is selected from the dropdown to be added to the new team
      const selectedUser = this.teamForm.get('selectedUser')?.value; //Get the UserDto in question
      if (selectedUser) { //If it is not null
        if (this.selectedMembers.includes(selectedUser)) { //Check that team member is not already part of the new team
          this.teamForm.get('selectedUser')?.setValue(''); //Clicking on a team member a second time will do nothing
        } else { //If user is NOT part of new team yet
          this.selectedMembers.push(selectedUser as FullUserDto); //Add team member to new team
          // Reset the dropdown selection
          this.teamForm.get('selectedUser')?.setValue('');
        }
      }
    }

    removeMember(user: FullUserDto) { //Remove the specified user from the team
      const index = this.selectedMembers.indexOf(user);
      if (index > -1) {
        this.selectedMembers.splice(index, 1);
      }
    }

    validateInput(): boolean { //Method to validate team creation
      if (this.selectedMembers.length === 0 || this.teamForm.value["name"] === '' || this.teamForm.value["description"] === '' ) {
        return true
      } else {
        return false
      }
    }
}
