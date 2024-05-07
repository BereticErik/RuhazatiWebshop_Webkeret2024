import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import {map, Observable} from "rxjs";
import {Clothes} from "../models/Clothes";
import {Review} from "../models/Review";


@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private firestoredb: AngularFirestore)
  {

  }

  getClothes(): Observable<Clothes[]> {
    return this.firestoredb.collection<Clothes>('Clothes').valueChanges();
  }

  updateUser(user: User) {
    return this.firestoredb.collection('user').doc(user.id).update(user);
  }

  getDatabaseList(name:string)
  {
    return this.firestoredb.collection(name).valueChanges({ idField: 'propertyId' });
  }

  getUserbyId(id:string)
  {
    return this.firestoredb.collection<User>("user").doc(id).valueChanges();
  }

  getUserbyCurrentID(){
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    return this.firestoredb.collection<User>('user').doc(user.uid).valueChanges();
  }

  createnewUser(data: User) {
    return new Promise<any>((resolve, reject) => {
      this.firestoredb
        .collection("user")
        .doc(data.id)
        .set(data);
    }).then(resolve =>{
      console.log('Sikers regisztracio');
      console.log(resolve);
    }).catch(reject =>
    {
      console.error(reject);
    });
  }

  deleteObject(name:string,id:string)
  {
    return this.firestoredb.collection(name).doc(id).delete();
  }

  deleteUser(data: any) {
    return this.firestoredb
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .delete();
  }
  addReview(review: Review){
    return this.firestoredb.collection('Review').add(review);
  }
  getReviews(): Observable<Review[]> {
    return this.firestoredb.collection<Review>('reviews').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Review;
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }

  deleteReview(reviewId: string) {
    return this.firestoredb.collection('reviews').doc(reviewId).delete();
  }
}
