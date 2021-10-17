import { Component, OnInit } from '@angular/core';
import { events, EventType, CustomEvent, CustomerSessionEvents } from '../data';
import { EventAttributeFilter } from '../funnel-step/funnel-step.component'
@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {
  events: CustomEvent[] = events;
  distinctEvents: EventType[] = this.events.map(event => event.event)
  // Filter all events to only include one of each
    .filter((event, index, self) => {
      return self.findIndex(e => e.eventName === event.eventName) === index;
    });
  selectedEvents: string[] = [];
  filters: EventAttributeFilter[] = [];
  customerSessionEvents:CustomerSessionEvents[] = [];

  constructor() { }

  ngOnInit(): void {
    this.addNewEvent();
    this.groupCustomerSessionEvents(events);
  }

  /**
   * Add new event to the last index of selectedEvents.
   */
  addNewEvent() {
    // const eventCopy = Object.assign({}, this.events[0].event);
    this.addEvent(this.events[0].event.eventName, this.selectedEvents.length);
  }

  /**
   * Add event to specified index, 
   * create basic filter and replace filter.
   * @param event 
   * @param index 
   */
   addEvent(eventName: string, index: number) {
    this.selectedEvents[index] = eventName;
    let basicFilter = this.createBasicFilter(eventName);
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

  /**
   * Filtering customer session events based on selected filters.
   * @param events - customer session events
   * @returns -true if for each filter customer has at least one matching event
   * else false. 
   */
  filterEvents(events: EventType[]) {
    let filtered = events;
    // for each filter return count of events that satisfy the filter
    let foundEventCounts = this.filters.map(filter => {
      return filtered.filter(event => {
        // filter by event name
        return event.eventName === filter.eventName
      }).filter(event => {
        // filter by selected attribute
        if (filter.attribute) {
          let attrValue = filter.attribute && event[filter.attribute];
          let [x, y] = filter.value;
          // evaluate math expression on event attribute based on selected values
          return eval(filter.math);
        } 
        return true;
      }).length;
    });
    // return true if every filter matches at least one event in an array
    return foundEventCounts.every(count => count > 0);
  }

  /**
   * Group array of events based on customer id and session id.
   * @param events - all events data
   */
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


  trackByFn(index: number, el: any){
    return index;
  }
}
