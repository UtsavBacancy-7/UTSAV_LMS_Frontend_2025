import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/core/services/notification.service';
import { INotification } from 'src/app/data/models/wishlist-notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnChanges {
  public notifications: INotification[] = [];
  public loading = true;
  @Input() isOpen = false;
  @Output() closeNotification = new EventEmitter<void>();
  @Output() notificationsRead = new EventEmitter<void>();

  constructor(private notificationService: NotificationService, private messageService: MessageService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.loadNotifications();
    }
  }

  public loadNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        this.notifications = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load notifications' + err.Message
        })
        this.loading = false;
      }
    });
  }

  public markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId.toString()).subscribe({
      next: () => {
        this.notifications = this.notifications.map(n =>
          n.notificationId === notificationId ? { ...n, isRead: true } : n
        );
        this.notificationsRead.emit();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark notification as read' + err.Message
        })
      }
    });
  }

  public onClose(): void {
    this.closeNotification.emit();
  }
}