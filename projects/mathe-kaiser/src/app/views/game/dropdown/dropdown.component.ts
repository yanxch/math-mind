import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

export interface Option {
    value: any;
    label: string;
}

@Component({
    selector: 'Dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
    show = false;

    @Input()
    selectedValue: Option;

    @Input()
    options: Option[];

    @Output()
    selectedValueChange = new EventEmitter<Option>();

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    select(option: Option) {
        this.selectedValue = option;
        this.selectedValueChange.emit(this.selectedValue);
    }

    open() {
        this.show = true;
    }

    close() {
        // otherwise the click events from the options are not received bc they are closed too fast
        setTimeout(() => {
            this.show = false;
            this.cdr.detectChanges();
        }, 100);
    }
}
