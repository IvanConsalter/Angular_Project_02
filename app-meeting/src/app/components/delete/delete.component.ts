import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from 'src/app/services/meeting.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public idMeeting: string;
  public title: string;

  constructor(
    private meetingService: MeetingService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.idMeeting = data.idMeeting;
    this.title = data.title;
  }

  ngOnInit(): void {
  }

  deletMeeting(): void {
    this.meetingService.delete(this.idMeeting).subscribe( (result) => {
      console.log(result);
      
    },
    (error) => {
      console.log('Error: ', error);
      
    });

    this.dialogRef.close(true);
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
