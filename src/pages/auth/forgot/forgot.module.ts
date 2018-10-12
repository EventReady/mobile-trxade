import { NgModule } from '@angular/core';
import { ForgotPage } from './forgot';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    ForgotPage
  ],
  imports: [
	IonicPageModule.forChild(ForgotPage),
	HttpModule
  ],
  exports: [
    ForgotPage
  ]
})
export class ForgotPageModule {}
