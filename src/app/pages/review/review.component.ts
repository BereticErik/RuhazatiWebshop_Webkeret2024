import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from "../../shared/services/db.service";
import { Review } from "../../shared/models/Review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getReviews();
  }

  submitReview(reviewForm: NgForm) {
    if (reviewForm.valid) {
      const review: Review = {
        id: '', // Initialize id as empty string
        username: reviewForm.form.value.username,
        review: reviewForm.form.value.review,
      };

      this.dbService.addReview(review)
        .then(docRef => {
          console.log('Review added successfully with ID: ', docRef.id);
          // Now that we have the ID, update the review object with it
          review.id = docRef.id;
          // Add the review to the local array to display it immediately
          this.reviews.push(review);
          reviewForm.resetForm();
        })
        .catch(error => {
          console.error('Error adding review: ', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  getReviews() {
    this.dbService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  deleteReview(reviewId: string) {
    this.dbService.deleteReview(reviewId)
      .then(() => {
        console.log('Review deleted successfully');
        this.getReviews(); // Refresh the list of reviews after deleting one
      })
      .catch(error => {
        console.error('Error deleting review: ', error);
      });
  }
}
