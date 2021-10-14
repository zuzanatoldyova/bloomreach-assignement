import { Component, OnInit } from '@angular/core';
import { events, CustomEvent, EventType } from '../data';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {
  events = events;
  distinctEvents: Set<string> = new Set(this.events.map(event => event.event.eventName));
  distinctEvents1: EventType[] = this.events.map(event => event.event).filter((event, index, self) => {
    return self.findIndex(e => e.eventName === event.eventName) === index;
  });
  selectedEvents: EventType[] = [];

  constructor() { }

  ngOnInit(): void {
    this.selectedEvents.push(this.events[0].event);
  }

  onSelected(event: EventType, index: number) {
    this.selectedEvents[index] = event;
  }

  selectEvent(event: EventType) {
    this.selectedEvents.push(event);
  }
}
