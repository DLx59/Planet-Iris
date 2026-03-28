import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeNl from '@angular/common/locales/nl';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeNl, 'nl');

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
