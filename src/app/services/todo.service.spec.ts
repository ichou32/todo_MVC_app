import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { FilterEnum } from './types/filter-enum.enum';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

