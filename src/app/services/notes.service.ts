import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { resolve } from 'url';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = [];
  public loaded: boolean = false;


  constructor(private storage: Storage) {

  }

  load(): Promise<boolean> {

    return new Promise((resolve) => {

      //get the notes stored in storage
      this.storage.get("notes").then((notes) => {

        if (notes != null) {
          this.notes = notes;
        }

        this.loaded = true;
        resolve(true);

      });
    });

  }

  //Save the current array of notes
  save(): void {
    this.storage.set('notes', this.notes);

  }

  getNote(id: string): Note {

    //Return the note with the id
    return this.notes.find(note => note.id === id);
  }

  createNote(title): void {
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

    this.notes.push(<Note>{
      id: id.toString(),
      title: title,
      content: ''
    });

    this.save(); //save the note to the storage object
  }


  deleteNote(note): void {
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
