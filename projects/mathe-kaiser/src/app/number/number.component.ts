import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
