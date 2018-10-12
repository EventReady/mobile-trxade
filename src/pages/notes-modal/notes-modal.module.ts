import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesModalPage } from './notes-modal';
import { HttpModule } from "@angular/http"

@NgModule({
  declarations: [
	NotesModalPage,
  ],
  imports: [
	IonicPageModule.forChild(NotesModalPage),
	HttpModule
  ],
  exports: [
    NotesModalPage
  ]
})
export class NotesModalPageModule {}
