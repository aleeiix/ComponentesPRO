import { Component, OnInit, AfterContentInit, QueryList, OnDestroy, ContentChildren } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Tab } from "../tab/tab.interface";
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>[] = [];
  private tabClickSubscription: Subscription[] = [];

  constructor() { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.tabs.forEach(
      tab => {
        let subscription = tab['onClick'].subscribe(
          () => console.log(`tab ${tab['title']}`)
        )
        this.tabClickSubscription.push(subscription);
      }
    );
    this.selectTab(this.tabs['first'])
  }

  ngOnDestroy() {
    if(this.tabClickSubscription) {
      this.tabClickSubscription.forEach(
        item => item.unsubscribe()
      );
    }
  }

  selectTab(tab:Tab) {
    this.tabs.forEach(tab => tab['isActive'] = false);
    tab.isActive = true;
  }
  
}
