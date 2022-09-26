import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { TechnologyHomeComponent } from './components/technology-home/technology-home.component';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';
import { JobHomeComponent } from './components/job-home/job-home.component';
import { LoginComponent } from './components/login/login.component';
import { PersonaAdminComponent } from './components/persona-admin/persona-admin.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { TechnologyAdminComponent } from './components/technology-admin/technology-admin.component';
import { JobAdminComponent } from './components/job-admin/job-admin.component';
import { ProjectAdminComponent } from './components/project-admin/project-admin.component';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { AboutAdminComponent } from './components/about-admin/about-admin.component';
import { AboutHomeComponent } from './components/about-home/about-home.component';
import { EducationHomeComponent } from './components/education-home/education-home.component';
import { EducationAdminComponent } from './components/education-admin/education-admin.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavigationFooterComponent } from './components/navigation-footer/navigation-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeroComponent,
    HomeComponent,
    AdminComponent,
    TechnologyHomeComponent,
    ContactHomeComponent,
    JobHomeComponent,
    LoginComponent,
    PersonaAdminComponent,
    ContactAdminComponent,
    TechnologyAdminComponent,
    JobAdminComponent,
    ProjectAdminComponent,
    ProjectHomeComponent,
    AboutAdminComponent,
    AboutHomeComponent,
    EducationHomeComponent,
    EducationAdminComponent,
    LogoComponent,
    NavigationFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
