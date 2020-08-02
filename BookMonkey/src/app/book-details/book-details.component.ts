import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  constructor(private bs: BookStoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    this.book = this.bs.getSingle(isbn);
  }

  getRating(num: number) {
    return new Array(num);
  }


}
