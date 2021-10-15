import { Component, OnInit } from '@angular/core';
import { events, EventType } from '../data';
import { EventAttributeFilter } from '../funnel-step/funnel-step.component'
@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {
  events = events;
  distinctEvents: EventType[] = this.events.map(event => event.event).filter((event, index, self) => {
    return self.findIndex(e => e.eventName === event.eventName) === index;
  });
  selectedEvents: EventType[] = [];
  filters: EventAttributeFilter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.addEvent(this.events[0].event);
  }

  onSelected(event: EventType, index: number) {
    this.selectedEvents[index] = event;
  }

  addEvent(event: EventType) {
    this.selectedEvents.push(event);
    // create basic filter for new added event
    const basicFilter = this.createBasicFilter(event.eventName);
    const index = this.selectedEvents.length - 1;
    this.addFilter(basicFilter, index);
  }

  addFilter(filter: EventAttributeFilter, index: number) {
    this.filters[index] = filter;
  }

  /**
   * Creates basic filter that is used when no attributes are specified.  
   * @param eventName 
   * @returns basicFilter
   */
  createBasicFilter(eventName: string) {
    return {
      eventName,   
      'name': '',
      'math': '',
      'params': 0,
      'value': []
    }
  }

  filterEvents() {
    let filter = this.filters[0];
    let filtered = this.events.filter(event => {
      return event.event.eventName === filter.eventName
    }).filter(event => {
      if (filter.attribute) {
        let attrValue = filter.attribute && event.event[filter.attribute];
        let [x, y] = filter.value;
        // evaluate math expression on event attribute based on selected values
        return eval(filter.math);
      } 
      return true;
    });
    // print out filtered events
    console.log(filtered);
  }
}
