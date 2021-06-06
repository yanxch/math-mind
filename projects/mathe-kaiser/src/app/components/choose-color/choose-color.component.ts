import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    NgModule,
    Output,
} from '@angular/core';

@Component({
    selector: 'ChooseColor',
    template: `
        <div class="flex justify-center">
            <div
                *ngFor="let color of colors"
                class="w-10 h-10 rounded border-gray-400 hover:border-purple-800 border-2 m-2 cursor-pointer"
                [style.backgroundColor]="color"
                (click)="selectedColorChange.emit(color)"
            ></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseColorComponent {
    @Input()
    colors = [
        '#ED3B15',
        '#F7B52B',
        '#1CC564',
        '#D3F72B',
        '#6DF72B',
        '#2BF74F',
        '#2BF7B5',
        '#2BC6F7',
        '#2B60F7',
        '#C22BF7',
        '#F72BC6',
    ];

    @Input()
    selectedColor = '#ED3B15';

    @Output()
    selectedColorChange = new EventEmitter<string>();
}

@NgModule({
    imports: [CommonModule],
    declarations: [ChooseColorComponent],
    exports: [ChooseColorComponent],
})
export class ChooseColorModule {}
