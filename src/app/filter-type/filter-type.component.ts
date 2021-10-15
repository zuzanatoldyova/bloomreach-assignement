import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

export interface Filter {
  name: string,
  math: string,
  params: number,
  value: number[]
}

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.scss']
})
export class FilterTypeComponent implements OnInit {
  filter?: Filter;
  @Output() filterSelected = new EventEmitter();

  filterOptions: Filter[] = [
    { 'name': 'equal to',
      'math': 'attrValue=x',
      'params': 1,
      'value': [0]
    }, {
      'name': 'in between',
      'math': 'x<attrValue<y',
      'params': 2,
      'value': [0, 0]
    },{
      'name': 'less than',
      'math':  'x>attrValue',
      'params': 1,
      'value': [0]
    }, {
      'name': 'greater than',
      'math': 'attrValue>x',
      'params': 1,
      'value': [0]
    }
  ]

  constructor() { 
  }

  ngOnInit(): void {
  
  }

  setFilter(operation: Filter) {
    this.filter = operation;
  }
}
