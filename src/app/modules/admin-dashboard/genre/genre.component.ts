import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/core/services/genre.service';
import { IGenre } from 'src/app/data/Models/genre/genre';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  providers: [MessageService]
})
export class GenreComponent implements OnInit {
  genres: IGenre[] = [];
  filteredGenres: IGenre[] = [];
  searchTerm: string = '';
  editGenreId: number | null = null;
  editedGenre: IGenre = { genreId: 0, genreName: '', description: '' }; // temp copy
  showAddForm: boolean = false;
  newGenre: IGenre = { genreId: 0, genreName: '', description: '' };

  constructor(
    private genreService: GenreService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.messageService.add({ severity: 'info', summary: 'Loading...', detail: 'Fetching genre list' });

    this.genreService.getAllGenres().subscribe({
      next: (response) => {
        this.genres = response.data ?? [];
        this.filteredGenres = [...this.genres];
        this.messageService.add({ severity: 'success', summary: 'Genres Loaded', detail: 'Genres fetched successfully.' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load genres.' });
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredGenres = this.genres.filter(genre =>
      genre.genreName.toLowerCase().includes(search) ||
      (genre.description && genre.description.toLowerCase().includes(search))
    );
  }

  onAddGenre(): void {
    this.showAddForm = true;
    this.newGenre = { genreId: 0, genreName: '', description: '' };
    this.messageService.add({ severity: 'info', summary: 'Add Genre', detail: 'Opening genre creation form...' });
  }

  cancelAddGenre(): void {
    this.showAddForm = false;
    this.newGenre = { genreId: 0, genreName: '', description: '' };
  }

  onSaveNewGenre(): void {
    if (!this.newGenre.genreName.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Genre name is required.' });
      return;
    }

    this.genreService.createGenre(this.newGenre).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Genre Added', detail: 'New genre has been created.' });
        this.showAddForm = false;
        this.loadGenres();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add genre.' });
      }
    });
  }

  onEditGenre(genre: IGenre): void {
    this.editGenreId = genre.genreId;
    this.editedGenre = { ...genre };
    this.messageService.add({ severity: 'info', summary: 'Edit Genre', detail: `Editing genre: ${genre.genreName}` });
  }

  onSaveGenre(): void {
    this.genreService.updateGenre(this.editedGenre).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Genre updated successfully.' });
        this.editGenreId = null;
        this.loadGenres(); // Refresh list
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update genre.' });
      }
    });
  }

  onCancelEdit(): void {
    this.editGenreId = null;
  }

  onDeleteGenre(id: number): void {
    if (confirm('Are you sure you want to delete this genre?')) {
      this.genreService.deleteGenre(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Genre deleted successfully.' });
          this.loadGenres(); // Refresh list
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete genre.' });
        }
      });
    }
  }
}