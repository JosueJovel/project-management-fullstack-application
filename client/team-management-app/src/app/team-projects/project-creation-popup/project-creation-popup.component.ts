import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from '../../backend.service';
import { ProjectRequestDto } from '../../models';

@Component({
  selector: 'app-project-creation-popup',
  templateUrl: './project-creation-popup.component.html',
  styleUrl: './project-creation-popup.component.css'
})
export class ProjectCreationPopupComponent implements OnInit{
  @Output() close = new EventEmitter<void>(); //This is how we emit a (close) event to the parent.
  projectForm: FormGroup; //This FormGroup conslidates all the relevant FromControls into once place

  constructor(private formBuilder: FormBuilder, private backendService: BackendService) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({ //Building a new form grouo
      name: [''], //Making individual FormControls that make up this FormGroup
      description: ['']
    })
  }

  closeEvent() { //For when the popup is simply closed (team creation canceled), emit a close event to make the popup dissapear in the parent component
    this.close.emit();
  }

  async onSubmit() { 
    const newProjectDto: ProjectRequestDto = { //Create a new ProjectRequestDto
      name: this.projectForm.value["name"],
      description: this.projectForm.value["description"],
      active: true,
      team: this.backendService.getCurrentTeam() //Get current team we are viewing
    }

    //Send ProjectRequestDto to our service/endpoint
    await this.backendService.createProject(newProjectDto); //Await on result before continuing on
    this.close.emit(); //Emit a close event to wipe away the popup
  }
  
  validateInput(): boolean { //Method to validate project creation
    if (this.projectForm.value["name"] === '' || this.projectForm.value["description"] === '' ) {
      return true
    } else {
      return false
    }
  }
}
