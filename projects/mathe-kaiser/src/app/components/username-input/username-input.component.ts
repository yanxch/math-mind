import { Component, NgModule } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'UsernameInput',
    template: `
    <input
        [formControl]="usernameControl"
        type="text"
        placeholder=""
        class="p-10 min-w-full text-5xl shadow bg-green-500 bg-opacity-25 outline-none text-center"
    />
    `,
    styles: [':host { display: flex; }']
})
export class UsernameInputComponent {
    usernameControl = new FormControl();
}

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [UsernameInputComponent],
    exports: [UsernameInputComponent]
})
export class UsernameInputComponentModule {

}