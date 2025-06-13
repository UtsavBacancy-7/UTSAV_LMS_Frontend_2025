import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dashboardCards: any[] = [];
  recentIssues: any[] = [];
  loadingIssues = true;
  loadingStats = true;
  data: any;
  options: any;

  private platformId = inject(PLATFORM_ID);
  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.initializeDashboardCards();
    this.fetchDashboardStats();
    this.initChart();
  }

  initializeDashboardCards(): void {
    this.dashboardCards = [
      { title: 'Total Books', value: '--', subtext: 'Loading...', icon: 'bi bi-book', subtextClass: 'text-muted' },
      { title: 'Issued Books', value: '--', subtext: 'Loading...', icon: 'bi bi-journal-arrow-up', subtextClass: 'text-muted' },
      { title: 'Returned Books', value: '--', subtext: 'Loading...', icon: 'bi bi-journal-arrow-down', subtextClass: 'text-muted' },
      { title: 'Total Students', value: '--', subtext: 'Loading...', icon: 'bi bi-people', subtextClass: 'text-muted' },
      { title: 'Total Librarians', value: '--', subtext: 'Loading...', icon: 'bi bi-person-workspace', subtextClass: 'text-muted' },
      { title: 'Book Reviews', value: '--', subtext: 'Loading...', icon: 'bi bi-chat-left-text', subtextClass: 'text-muted' },
      { title: 'Total Categories', value: '--', subtext: 'Loading...', icon: 'bi bi-tags', subtextClass: 'text-muted' }
    ];
  }

  initChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      // Initialize with empty data
      this.data = {
        labels: ['Total Books', 'Borrowed Books', 'Returned Books'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--orange-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--orange-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      };
    }
  }

  fetchDashboardStats(): void {
    this.loadingStats = true;
    this.loadingIssues = true;

    this.dashboardService.getDashboardStat().subscribe({
      next: (response: any) => {
        const stats = response.data;

        // Update chart data
        if (isPlatformBrowser(this.platformId)) {
          this.data = {
            ...this.data,
            datasets: [{
              ...this.data.datasets[0],
              data: [stats.books, stats.borrowedBooks, stats.returnedBooks]
            }]
          };
        }

        // Update dashboard cards with actual data
        this.dashboardCards = [
          {
            title: 'Total Books',
            value: stats.books,
            subtext: '',
            icon: 'bi bi-book',
            subtextClass: 'text-success'
          },
          {
            title: 'Issued Books',
            value: stats.borrowedBooks,
            subtext: '',
            icon: 'bi bi-journal-arrow-up',
            subtextClass: 'text-success'
          },
          {
            title: 'Returned Books',
            value: stats.returnedBooks,
            subtext: '',
            icon: 'bi bi-journal-arrow-down',
            subtextClass: 'text-info'
          },
          {
            title: 'Total Students',
            value: stats.students,
            subtext: '',
            icon: 'bi bi-people',
            subtextClass: 'text-success'
          },
          {
            title: 'Total Librarians',
            value: stats.librarians,
            subtext: '',
            icon: 'bi bi-person-workspace',
            subtextClass: 'text-info'
          },
          {
            title: 'Book Reviews',
            value: stats.reviews,
            subtext: '',
            icon: 'bi bi-chat-left-text',
            subtextClass: 'text-primary'
          },
          {
            title: 'Total Categories',
            value: stats.genres,
            subtext: '',
            icon: 'bi bi-tags',
            subtextClass: 'text-warning'
          }
        ];

        // Update recent issues
        this.recentIssues = stats.recentIssuedBooks.map((book: any) => ({
          title: book.title,
          issuedTo: book.studentName,
          dueDate: new Date(book.dueDate)
        }));

        this.loadingStats = false;
        this.loadingIssues = false;
      },
      error: (error) => {
        console.error('Error fetching dashboard stats:', error);
        this.loadingStats = false;
        this.loadingIssues = false;

        // Update cards to show error state
        this.dashboardCards.forEach(card => {
          card.value = 'Error';
          card.subtext = 'Failed to load data';
          card.subtextClass = 'text-danger';
        });
      }
    });
  }
}