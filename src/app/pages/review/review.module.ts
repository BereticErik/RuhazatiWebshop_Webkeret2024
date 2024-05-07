import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReviewRoutingModule} from "./review-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import { ReviewComponent } from "./review.component";


@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReviewRoutingModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class ReviewModule { }
