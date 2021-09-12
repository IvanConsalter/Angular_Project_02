import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm!: FormGroup;
  public idMeeting: string;
  public title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    private meetingService: MeetingService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.idMeeting = data.idMeeting;
    this.title = data.title;
    
  }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id: [null],
      meetingName: ['', Validators.required],
      meetingSubject: ['', Validators.required],
      meetingResponsible: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required]
    })

    if(this.idMeeting != null) {
      this.getById(this.idMeeting);
    }
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

  getById(id: string) {
    this.meetingService.getById(id).subscribe( (result: any) => {

      //console.log(result);
      this.meetingForm = this.fb.group({
        id: [result.id, Validators.required],
        meetingName: [result.meetingName, Validators.required],
        meetingSubject: [result.meetingSubject, Validators.required],
        meetingResponsible: [result.meetingResponsible, Validators.required],
        meetingDate: [result.meetingDate, Validators.required],
        meetingTime: [result.meetingTime, Validators.required]
      })

    },
    (error) => {
      console.log('Error: ', error);
      
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }
}
