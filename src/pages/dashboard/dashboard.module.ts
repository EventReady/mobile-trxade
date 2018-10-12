import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@shared/shared.module';
import { DashboardService } from './dashboard-service';

@NgModule({
	declarations: [DashboardPage],
	imports: [
		IonicPageModule.forChild(DashboardPage),
		SharedModule,
		HttpModule,
	],
	exports: [DashboardPage],
	providers: [DashboardService],
})
export class DashboardPageModule {}
