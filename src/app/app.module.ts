import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Módulos
import { EntryModule } from './entry/entry.module';
import { HomeModule } from './home/home.module';
import { SocialModule } from './social/social.module';
import { GroupModule } from './group/group.module';

// Componentes
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntryModule,
    HomeModule,
    SocialModule,
    GroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
