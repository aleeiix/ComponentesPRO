import { Component, AfterContentInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterContentInit {

isAddTimerVisible: boolean = false;
time: number = 0;
timers: Array<number> = [];

// @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
@ViewChild('timeInput') timeInput: ElementRef;
@ViewChild('alert', {read: ViewContainerRef}) alertContainer: ViewContainerRef;
simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;

  constructor(
    // private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver
  ) {
    this.timers = [3, 20, 185];
  }
  
  ngAfterViewInit() {
    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'enter seconds');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');

    // this.alerts.forEach(
    //   item => {
    //     if (!item.title) {
    //       item.title = 'Hi';
    //     }
    //     if (!item.message) {
    //       item.message = 'Hello World!';
    //     }
    //     item.show();
    //   }
    // );
    // this.cdRef.detectChanges();
  }

  ngAfterContentInit() {
  }

  logCountdownEnd() {
    console.log('the countdown has finished!');
  }

  showAddTimer(): void {
    this.isAddTimerVisible = true;
    setTimeout(
      () => {this.renderer.selectRootElement(this.timeInput.nativeElement).focus();}
    );
  }

  hideAddTimer(): void {
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert(): void {
    // this.alerts.first.show();
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
    this.simpleAlert.instance.title = 'Timer ended';
    this.simpleAlert.instance.message = 'Your countdown has finished';
    this.simpleAlert.instance.onDimiss.subscribe(
      () => this.simpleAlert.destroy()
    );
    this.simpleAlert.instance.show();
  }

  submitAddTimer(): void {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
