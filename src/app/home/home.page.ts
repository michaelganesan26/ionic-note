import { Note } from './../interfaces/note';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular'
import { NotesService } from '../services/notes.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = "Notes";

  constructor(public notesService:NotesService, private alertCtrl: AlertController, private navCtrl: NavController) {

  }

  ngOnInit(): void {
     this.notesService.load();

  }

  generateUrl(note:Note):string{

     let myUrl = "/notes/" + note.id;
     console.log('Your current url is: ', myUrl);
     return(myUrl);
  }


  addNote(){
        this.alertCtrl.create({
           header: 'New Note',
           message: 'What should the title of the note be?',
           inputs:[
            {
              type: 'text',
              name: 'title'
            }
           ],
           buttons:[
             {
               text: 'Cancel'
             },
             {
               text: 'Save',
               handler: (data:Note)=>{
                 this.notesService.createNote(data.title);
               }
             }
           ]

        }).then((alert)=>{
            alert.present();
        });

  }

}
