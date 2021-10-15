import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
export class FunnelStepComponent implements OnInit {
  @Input() selectedEvent!: EventType;
  @Input() allEvents!: EventType[];
  @Input() order!: number;
  @Output() selected = new EventEmitter();
  @Output() filterAdded = new EventEmitter();
  
  showAttribute: Boolean = false;
  selectedEventKeys: string[] = [];
  selectedAttribute?: EventAttribute;
  filter?: EventAttributeFilter;

  constructor() { }
  
  ngOnInit(): void {
    this.getKeys(this.selectedEvent);
  }

  select() {
    this.selected.emit(this.selectedEvent);
    this.getKeys(this.selectedEvent);
  }

  /**
   * Get event attributes which are the event object keys, except the eventName.
   * @param event 
   */
  getKeys(event: EventType) {
    this.selectedEventKeys = Object.keys(event).filter(key => key !== "eventName")
  }

  addFilter(filter: Filter) {
    this.createFilter(filter);
  }

  /**
   * Add parameters event name and attribute to the filter from filter component.
   * @param filter 
   */
  createFilter(filter: Filter) {
    if (this.selectedAttribute) {
      this.filter = {...filter, 
      'eventName': this.selectedEvent.eventName, 
      'attribute': this.selectedAttribute}
    this.filterAdded.emit(this.filter);
    }  
  }
}
