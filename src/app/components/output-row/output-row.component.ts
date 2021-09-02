import { Component, Input, OnInit } from '@angular/core';
import { Output } from '../../interfaces/output';

@Component({
  selector: 'output-row',
  templateUrl: './output-row.component.html',
  styleUrls: ['./output-row.component.scss'],
})
export class OutputRowComponent implements OnInit, Output {
  @Input() title = '';
  @Input() content = '';

  constructor() {}

  ngOnInit(): void {}
}
