import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../shared/models/User";
import { DbService } from "../../shared/services/db.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  profileForm!: FormGroup;
  item: User | undefined;

  constructor(private fb: FormBuilder, private dbservice: DbService) { }

  ngOnInit() {
    this.getOwner();
    this.initForm();
  }

  getOwner() {
    this.dbservice.getUserbyCurrentID().subscribe({
      next: (data: User | undefined) => {
        if (data) {
          this.item = data;
          this.patchForm(data);
        } else {
        }
      },
      error: (error) => {
      }
    });
  }


  initForm() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      })
    });
  }

  patchForm(data: User) {
    this.profileForm.patchValue({
      username: data.username,
      email: data.email,
      name: {
        firstname: data.name?.firstname,
        lastname: data.name?.lastname
      }
    });
  }

  updateUser() {
    if (this.profileForm.valid) {
      const formData = { ...this.profileForm.value, id: this.item?.id };
      this.dbservice.updateUser(formData).then(() => {
        console.log('User updated successfully.');
      }).catch(error => {
        console.error('Error updating user:', error);
      });
    }
  }

}
