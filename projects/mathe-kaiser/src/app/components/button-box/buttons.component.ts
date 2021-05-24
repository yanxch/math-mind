import { Component, NgModule } from "@angular/core";

@Component({
    selector: 'ButtonBox',
    template: `
        <ng-content></ng-content>
    `,
    styles: [':host { display: flex; justify-content: space-between}']

})
export class ButtonBoxComponent { }

@NgModule({
    declarations: [ButtonBoxComponent],
    exports: [ButtonBoxComponent]
})
export class ButtonBoxComponentModule {

}