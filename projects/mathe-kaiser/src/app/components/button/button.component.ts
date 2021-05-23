import { Component, NgModule } from "@angular/core";

@Component({
    selector: 'ActionButton',
    template: `
        <button class="p-3 bg-purple-500 text-xl rounded-md border-2 border-white text-white">
            <ng-content></ng-content>
        </button>
    `,
    styles: [''] // :host { display: flex; }
})
export class ButtonComponent {

}

@NgModule({
    declarations: [ButtonComponent],
    exports: [ButtonComponent]
})
export class ButtonModule { }