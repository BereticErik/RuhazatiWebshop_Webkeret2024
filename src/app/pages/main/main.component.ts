import { Component, OnInit } from '@angular/core';
import { CartService } from "../../shared/services/cart.service";
import { DbService } from "../../shared/services/db.service";
import { Clothes } from "../../shared/models/Clothes";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  clothes: Clothes[] = [];

  constructor(private cartService: CartService, private dbService: DbService) { }

  ngOnInit(): void {
    this.loadClothes();
  }

  addToCart(product: Clothes){
    this.cartService.addToCart(product);
  }

  loadClothes() {
    this.dbService.getClothes().subscribe(clothes => {
      // Remove duplicates from the clothes array
      const uniqueClothes = this.getUniqueClothes(clothes);
      this.clothes = uniqueClothes;
    });
  }
  getClothingImage(name: string): string {
    const lowercaseName = name.toLowerCase(); // Convert the name to lowercase for comparison
    switch (lowercaseName) {
      case 'jeans':
        return '/assets/jeans.jpeg';
      case 'shoes':
        return '/assets/shoes.webp';
      case 'socks':
        return '/assets/socks.jpeg';
      case 'dress':
        return '/assets/dress.webp';
      case 'hat':
        return '/assets/dress.webp';
      case 'szoknya':
        return '/assets/skirt.jpeg';
      case 'ring':
        return '/assets/ring.webp';
      case 'pants':
        return '/assets/pants.jpeg';
      case 't-shirt':
        return '/assets/t-shirt.webp';
      default:
        return 'https://via.placeholder.com/300'; // Default placeholder image path
    }
  }

  private getUniqueClothes(clothes: Clothes[]): Clothes[] {
    const uniqueClothes: Clothes[] = [];
    const seenNames: string[] = [];

    clothes.forEach(cloth => {
      if (!seenNames.includes(cloth.name)) {
        seenNames.push(cloth.name);
        uniqueClothes.push(cloth);
      }
    });

    return uniqueClothes;
  }
}
