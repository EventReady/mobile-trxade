//*********** NG **************/
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { EmailComposer } from '@ionic-native/email-composer';

//*********** App Components **************/
import { AppComponent } from './app.component';
import { AppService } from '@app/app.service';
import { DashboardService } from '@pages/dashboard/dashboard-service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot(AppComponent),
		IonicStorageModule.forRoot(),
		IonicImageViewerModule,
		HttpModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [AppComponent],
	providers: [
		StatusBar,
		SplashScreen,
		AppService,
		Geolocation,
		GoogleAnalytics,
		InAppBrowser,
		PhotoViewer,
		DocumentViewer,
		EmailComposer,
		DashboardService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
	],
})
export class AppModule {}
