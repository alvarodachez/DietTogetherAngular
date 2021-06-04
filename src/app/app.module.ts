import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

// Internacionalizacion
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

// Módulos
import { EntryModule } from './entry/entry.module';
import { HomeModule } from './home/home.module';
import { SocialModule } from './social/social.module';
import { GroupModule } from './group/group.module';
import { ReportModule } from './report/report.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { RegimeModule } from './regime/regime.module';
import { ProfileModule } from './profile/profile.module';
import { PrivateModule } from './private-activity/private.module';

// Componentes
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule ,
    AppRoutingModule,
    EntryModule,
    HomeModule,
    SocialModule,
    GroupModule,
    ReportModule,
    NgxPaginationModule,
    AdminPanelModule,
    RegimeModule,
    ProfileModule,
    PrivateModule,
    NgxChartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
