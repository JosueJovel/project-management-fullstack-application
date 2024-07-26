import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectDto } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-project-edit-popup',
  templateUrl: './project-edit-popup.component.html',
  styleUrl: './project-edit-popup.component.css'
})
export class ProjectEditPopupComponent implements OnInit{
  @Input() projectData: ProjectDto;
  @Output() close = new EventEmitter<void>(); //This is how we emit a (close) event to the parent.
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private backendService: BackendService) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({ //Building a new form grouo
      name: [this.projectData.name], //Making individual FormControls that make up this FormGroup
      description: [this.projectData.description],
      selectActive: [this.projectData.active]
    })
  }
  
  closeEvent() { //For when the popup is simply closed (team creation canceled), emit a close event to make the popup dissapear in the parent component
    this.close.emit();
  }

  async onSubmit() {
    // Send a new ProjectDto to our service on Submit, where the backend will update the DB with the same DTO (using ID)
    const updatedProject: ProjectDto = {
      id: this.projectData.id,
      name: this.editForm.value["name"],
      description: this.editForm.value["description"],
      active: this.editForm.value["selectActive"],
      team: this.projectData.team
    }

    //updateProject() takes a ProjectDto and sends it to the backend (Then reflecting those changes is done at the parent level, not here)
    await this.backendService.updateProject(updatedProject);
    this.close.emit(); //Emit a close event to wipe away the popup
  }

  validateInput(): boolean { //Method to validate project creation
    if (this.editForm.value["name"] === '' || this.editForm.value["description"] === ''  || this.editForm.value["selectActive"] === '') {
      return true
    } else {
      return false
    }
  }

}
