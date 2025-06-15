import { Component, OnInit } from '@angular/core';
import { WishlistAndNotificationService } from 'src/app/core/services/wishlist-and-notification.service';
import { IWishlistResponse } from 'src/app/data/models/wishlist-notification/wishlistResponse';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

export class WishlistComponent implements OnInit {
  wishlistItems: IWishlistResponse[] = [];
  isLoading = true;

  constructor(private wishlistService: WishlistAndNotificationService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.isLoading = true;
    this.wishlistService.getWishList().subscribe({
      next: (response) => {
        this.wishlistItems = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading wishlist:', err);
        this.isLoading = false;
      }
    });
  }

  removeFromWishlist(wishlistId: number): void {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
      console.log('Remove wishlist item with ID:', wishlistId);
      this.loadWishlist();
    }
  }
}