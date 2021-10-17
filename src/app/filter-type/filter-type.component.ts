import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { EventAttribute } from '../data';
export interface Filter {
  name: string,
  math: string,
  params: number,
  value: number[],
  attribute?: EventAttribute
}

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.scss']
})
export class FilterTypeComponent implements OnInit {
  @Input() eventKeys: string[] = [];
  @Input() defaultFilter?: Filter;
  @Output() filterSelected = new EventEmitter();
  filter: Filter;
  selectedAttribute?: EventAttribute;

  filterOptions: Filter[] = [
    {
      'name': 'Unnamed',
      'math': '',
      'params': 0,
      'value': []
    }, { 
      'name': 'equal to',
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
    this.filter = Object.assign({}, this.filterOptions[0]);
  }

  ngOnInit(): void {
    if (this.defaultFilter) {
      this.filter = Object.assign({}, this.defaultFilter);
      this.selectedAttribute = this.defaultFilter.attribute;
    }
  }
  /**
   * Emit filter selected event with current filter.
   */
  setFilter() {
    this.filterSelected.emit({...this.filter, attribute: this.selectedAttribute})
  }

  /**
   * Set this filter based on filter name parameter.
   * @param name 
   */
  selectFilter(name: string) {
    let newFilter = this.filterOptions.filter(option => option.name === name)[0];
    this.filter = {...newFilter, "attribute": this.selectedAttribute};
    this.setFilter();
  }
}
