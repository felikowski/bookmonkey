import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap, distinct } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  foundBooks: Book[] = [];
  isLoading = false;
  keyUp$ = new Subject<string>();

  constructor(private bs: BookStoreService) { }
  handleKeyUp($event) {
    this.keyUp$.next($event.target.value);
  }
  ngOnInit(): void {
    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe(books => this.foundBooks = books);
  }

}
