import { Component, Input, NgModule, Output } from '@angular/core';

@Component({
    selector: 'ActionButton',
    template: `
        <button
            class="p-3 bg-purple-500 text-xl rounded-md border-2 border-white text-white"
            [style.visibility]="show ? 'visible' : 'hidden'"
        >
            <ng-content></ng-content>
        </button>
    `,
    styles: [''], // :host { display: flex; }
})
export class ButtonComponent {
    @Input()
    show: boolean;
}

@NgModule({
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule { }
