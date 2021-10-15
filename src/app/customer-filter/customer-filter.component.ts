import { Component, OnInit } from '@angular/core';
import { events, EventType, CustomEvent, CustomerSessionEvents } from '../data';
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
  customerSessionEvents:CustomerSessionEvents[] = [];

  constructor() { }

  ngOnInit(): void {
    this.addBasicEvent();
    this.groupCustomerSessionEvents(events);
  }

  addBasicEvent() {
    this.addEvent(this.events[0].event);
  }

  onSelected(event: EventType, index: number) {
    this.selectedEvents[index] = event;
    let basicFilter = this.createBasicFilter(event.eventName);
    this.addFilter(basicFilter, index);
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

  filterEvents(events: EventType[]) {
    let filtered = events;
    let foundEventCounts = this.filters.map(filter => {
      return filtered.filter(event => {
        return event.eventName === filter.eventName
      }).filter(event => {
        if (filter.attribute) {
          let attrValue = filter.attribute && event[filter.attribute];
          let [x, y] = filter.value;
          // evaluate math expression on event attribute based on selected values
          return eval(filter.math);
        } 
        return true;
      }).length;
    });
    return foundEventCounts.every(count => count > 0);
  }

  groupCustomerSessionEvents(events: CustomEvent[]) {
    events.forEach(event => {
      const customerSession = this.customerSessionEvents
        .filter(e => e.user_id === event.user_id 
          && e.session_id === event.session_id);
      if (customerSession.length) {
        customerSession[0].events.push(event.event)
      } else {
        this.customerSessionEvents.push({
          'user_id': event.user_id,
          'session_id': event.session_id,
          'events': [event.event]
        })
      }
    })
    console.log(this.customerSessionEvents);
  }

  /**
   * Print out filtered customer sessions that contain events based on selected filters.
   */
  filterCustomers() {
    let filteredCustomers = this.customerSessionEvents.filter(customerSession => {
      return this.filterEvents(customerSession.events);
    });

    console.log(filteredCustomers);
  }
}
