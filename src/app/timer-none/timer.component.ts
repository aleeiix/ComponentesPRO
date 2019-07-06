import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  private countdownEndSubscription: Subscription = null;
  private countdownSubscription: Subscription = null;

  public countdown: number = 0;


  get progress(){
    console.log('getting progress');
    return (this.init - this.countdown)/this.init*100;
  }

  constructor(
    public timer: TimerService,
    private cdRef: ChangeDetectorRef
    ) { }


  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(
      () => {
        this.onComplete.emit();
        console.log("--countdown end--");
      }
    );

    this.countdownSubscription = this.timer.countdown$.subscribe(
      (data) => {
        this.countdown = data;
        this.cdRef.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

}
