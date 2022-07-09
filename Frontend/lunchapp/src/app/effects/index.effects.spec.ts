import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IndexEffects } from './index.effects';

describe('IndexEffects', () => {
  let actions$: Observable<any>;
  let effects: IndexEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IndexEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IndexEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
