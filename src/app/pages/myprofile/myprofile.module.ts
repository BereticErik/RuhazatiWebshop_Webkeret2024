import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MyprofileRoutingModule } from './myprofile-routing.module';
import { MyprofileComponent } from './myprofile.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MyprofileComponent
  ],
  imports: [
    CommonModule,
    MyprofileRoutingModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class MyprofileModule { }
