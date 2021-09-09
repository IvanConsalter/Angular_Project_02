import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id: [null],
      meetingName: ['', Validators.required],
      meetingSubject: ['', Validators.required],
      meetingResponsible: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required]
    })
  }

  save() {
    if(this.meetingForm.value.id === null) {
      this.create();
    }
    else {
      this.update();
    }
  }

  create() {
    this.meetingService.insert(this.meetingForm.value).subscribe( (result) => {

      console.log('Result: ', result);
      

    },
    (error) => {
      console.log('Erro', error);
      
    });

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  update() {
    this.meetingService.update(this.meetingForm.value).subscribe( (result) => {

      console.log('Result: ', result);
      

    },
    (error) => {
      console.log('Erro', error);
      
    });

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
