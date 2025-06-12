import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';
import { IBook } from 'src/app/data/Models/book/book';
import { IGenre } from 'src/app/data/Models/genre/genre';

@Component({
  selector: 'app-book-form-modal',
  templateUrl: './book-form-modal.component.html',
  styleUrls: ['./book-form-modal.component.scss']
})
export class BookFormModalComponent implements OnInit {
  @Input() book!: IBook | null;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<IBook>();

  bookForm!: FormGroup;
  selectedImage: File | null = null;
  imageBase64: string | null = null;
  genres: IGenre[] = [];

  constructor(private fb: FormBuilder, private genreService: GenreService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && changes['book'].currentValue) {
      this.initializeForm();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.genres = response.data;
          if (this.book?.genreId) {
            this.bookForm.patchValue({ genreId: this.book.genreId });
          }
        }
      },
      error: (err) => {
        console.error('Error loading genres:', err);
      }
    });
  }

  initializeForm(): void {
    this.bookForm = this.fb.group({
      Title: [this.book?.title || '', Validators.required],
      Author: [this.book?.author || '', Validators.required],
      GenreId: [this.book?.genreId ? Number(this.book.genreId) : null, Validators.required],
      TotalCopies: [this.book?.totalCopies || 1, [Validators.required, Validators.min(1)]],
      AvailableCopies: [this.book?.availableCopies || 1, [Validators.required, Validators.min(0)]],
      PublicationYear: [
        this.book?.publicationYear ? new Date(this.book.publicationYear).getFullYear() : null,
        [Validators.required, Validators.min(1000), Validators.max(2100)]
      ],
      Publisher: [this.book?.publisher || ''],
      Description: [this.book?.description || ''],
      ISBN: [this.book?.isbn || '', Validators.pattern(/^\d{10}(\d{3})?$/)],
      CoverImageUrl: [this.book?.coverImageUrl || '']
    });

    if (this.book?.coverImageUrl) {
      this.imageBase64 = this.book.coverImageUrl;
    }

    if (!this.book) {
      this.bookForm.get('TotalCopies')?.valueChanges.subscribe(val => {
        this.bookForm.patchValue({ AvailableCopies: val }, { emitEvent: false });
      });
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        this.bookForm.patchValue({ CoverImageUrl: this.imageBase64 });
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const bookData = {
        ...formValue,
        id: this.book?.id || 0,
        GenreId: Number(formValue.GenreId),
        PublicationYear: formValue.PublicationYear,
        CoverImageUrl: this.imageBase64 || this.book?.coverImageUrl || ''
      };
      this.submitForm.emit(bookData);
      this.onReset();
    }
  }

  public onReset(): void {
    this.bookForm.reset();
    this.imageBase64 = null;

    const fileInput = document.getElementById('bookImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onClose(): void {
    this.onReset();
    this.closeModal.emit();
  }
}