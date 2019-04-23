import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number = null;
  public counter: number = 0;
  private countdownTimerRef: any = null;

  constructor() { }
  
  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('init value update to: ', changes.init.currentValue);
    this.startCountdown();
  }


  startCountdown(): void {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(): void {
    this.countdownTimerRef = setTimeout(() => {
      this.counter--;
      this.processCount();
    }, 1000);
  }

  processCount(): void {
    this.onDecrease.emit(this.counter);
    console.log('count is ', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      console.log('-- COUNTER END --');
    } else {
      this.doCountdown();
    }
  }

  private clearTimeout(): void {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

}
