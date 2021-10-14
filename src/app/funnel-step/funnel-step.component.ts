import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomEvent, EventType } from '../data';

@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss']
})
export class FunnelStepComponent implements OnInit {
  @Input() selectedEvent!: EventType;
  @Input() allEvents!: EventType [];
  @Input() order!: number;
  @Output() selected = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  select() {
    this.selected.emit(this.selectedEvent);
  }

}
