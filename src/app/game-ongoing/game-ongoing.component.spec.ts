import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOngoingComponent } from './game-ongoing.component';

describe('GameOngoingComponent', () => {
  let component: GameOngoingComponent;
  let fixture: ComponentFixture<GameOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOngoingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
