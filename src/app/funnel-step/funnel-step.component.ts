import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventType, EventAttribute } from '../data';
import { Filter } from '../filter-type/filter-type.component'

export interface EventAttributeFilter {
  name: string,
  math: string,
  params: number,
  value: number[],
  attribute?: EventAttribute,
  eventName: string
}
@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss']
})
export class FunnelStepComponent implements OnInit {
  @Input() selectedEvent!: string;
  @Input() allEvents!: EventType[];
  @Input() order!: number;
  @Input() defaultFilter?: EventAttributeFilter;
  @Output() selected = new EventEmitter();
  @Output() filterAdded = new EventEmitter();
  
  showFilter: Boolean = false;
  selectedEventKeys: string[] = [];
  filter?: EventAttributeFilter;
  allEventNames?: string[]; 

  constructor() { }
  
  ngOnInit(): void {
    this.allEventNames = this.allEvents.map(event => event.eventName);
    this.selectedEventKeys = this.getKeys(this.selectedEvent);
    if (this.defaultFilter && this.defaultFilter.attribute) {
      this.showFilter = true;
    }
  }

  select() {
    this.selected.emit(this.selectedEvent);
    this.selectedEventKeys = this.getKeys(this.selectedEvent);
  }

  /**
   * Get event attributes which are the event object keys, except the eventName.
   * @param event 
   */
  getKeys(eventName: string) {
    const currentEvent = this.allEvents.filter(event => event.eventName === eventName)[0];
    return Object.keys(currentEvent).filter(key => key !== "eventName")
  }

  addFilter(filter: Filter) {
    this.createFilter(filter);
  }

  removeFilter() {
    this.showFilter = false;
    this.filterAdded.emit({
      'eventName': this.selectedEvent, 
      'name': '',
      'math': '',
      'params': 0,
      'value': []
    });
  }

  /**
   * Add parameters event name and attribute to the filter from filter component.
   * @param filter 
   */
  createFilter(filter: Filter) {
      this.filter = {...filter, 
      'eventName': this.selectedEvent}
    this.filterAdded.emit(this.filter);
  }
}
