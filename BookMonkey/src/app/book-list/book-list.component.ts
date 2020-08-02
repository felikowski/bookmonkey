import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bs: BookStoreService) { }

  @Output() showDetailsEvent = new EventEmitter<Book>();
  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }
  ngOnInit() {
    this.books = this.bs.getAll();
  }
}