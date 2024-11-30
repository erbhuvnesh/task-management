import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TaskDialogComponent } from "./pages/task-dialog/task-dialog.component";
import { HttpClientModule } from "@angular/common/http";
import { TitleExistsValidatorDirective } from './title-exists-validator.directive';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    TaskDialogComponent,
    TitleExistsValidatorDirective,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
