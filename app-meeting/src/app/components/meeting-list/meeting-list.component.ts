import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Meeting } from 'src/app/model/meeting.model';
import { MeetingService } from 'src/app/services/meeting.service';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';


@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})

export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'actions'];
  meetings: Array<Meeting> = [];
  length: number = 0;
  totalRecordsPerPage: number = 5;
  meetingNameFind: string = '';
  meetingDateFind: string = '';

  constructor(
    private meetingService: MeetingService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.findAll(0, '', '');
  }

  findAll(pageNumber: number, sortField: string, filters: string) {
    this.meetingService.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe( (meetingResponse: any) => {
      //console.log(meetingResponse);
      this.meetings = meetingResponse.TB_MEETINGS;
      this.length = meetingResponse.page.size;
    
    },
    (error) => {
      this.meetings = [];
      console.log('Error: ', error);
      console.log('Error status: ', error.status);
      console.log('Error error: ', error.error);
      console.log('Error headers: ', error.headers);
      
    }) 
  }

  getServerPage(event: PageEvent) {
    this.findAll(event.pageIndex, '', '');
  }

  editMeeting(idMeeting: string) {
    const dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '500px',
      data: {
        idMeeting,
        title: 'Atualizar Reunião'
      }  
    })

    dialogRef.afterClosed().subscribe( (response) => {
      console.log(response);
      console.log('The dialog was closed!');
      
    });
  }
}
