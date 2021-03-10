import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

// Módulos
import { EntryModule } from './entry/entry.module';
import { HomeModule } from './home/home.module';
import { SocialModule } from './social/social.module';
import { GroupModule } from './group/group.module';
import { ReportModule } from './report/report.module';

// Componentes
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { NotFoundComponent } from './common/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntryModule,
    HomeModule,
    SocialModule,
    GroupModule,
    ReportModule,
    NgxPaginationModule,
    AdminPanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
