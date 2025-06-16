import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { INotification } from 'src/app/data/models/wishlist-notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closeNotification = new EventEmitter<void>();
  notifications: INotification[] = [];
  loading = true;

  constructor(private notificationService: NotificationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        this.notifications = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.loading = false;
      }
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId.toString()).subscribe({
      next: () => {
        this.notifications = this.notifications.map(n =>
          n.notificationId === notificationId ? { ...n, isRead: true } : n
        );
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
      },
      error: (err) => {
        console.error('Error marking all notifications as read:', err);
      }
    });
  }

  onClose(): void {
    this.closeNotification.emit();
  }
}