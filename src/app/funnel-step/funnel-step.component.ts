import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { EventType, EventAttribute } from '../data';
import { Filter } from '../filter-type/filter-type.component'

export interface EventAttributeFilter {
  name?: string,
  math: string,
  params?: number,
  value: number[],
  attribute?: EventAttribute,
  eventName: string
}
@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss']
})
export class FunnelStepComponent implements OnInit, OnChanges {
  @Input() selectedEvent!: string;
  @Input() allEvents!: EventType[];
  @Input() order!: number;
  @Output() selected = new EventEmitter();
  @Output() filterAdded = new EventEmitter();
  
  showFilter: Boolean = false;
  selectedEventKeys: string[] = [];
  selectedAttribute?: EventAttribute;
  filter?: EventAttributeFilter;
  allEventNames?: string[]; 

  constructor() { }
  
  ngOnInit(): void {
    this.allEventNames = this.allEvents.map(event => event.eventName);
    this.selectedEventKeys = this.getKeys(this.selectedEvent);
  }

  ngOnChanges(changes: SimpleChanges){
    let newKeys = this.getKeys(this.selectedEvent);
    if (this.selectedAttribute && !newKeys.includes(this.selectedAttribute)) {
      this.selectedAttribute = undefined;
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
    this.selectedAttribute = undefined;
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
    if (this.selectedAttribute) {
      this.filter = {...filter, 
      'eventName': this.selectedEvent, 
      'attribute': this.selectedAttribute}
    this.filterAdded.emit(this.filter);
    }  
  }
}
