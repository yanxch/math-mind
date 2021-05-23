import { Component, NgModule } from "@angular/core";
import { ButtonModule } from "../button/button.component";

@Component({
    selector: 'NavigationBar',
    template: `
        <div class="bg-purple-800 p-6 grid flex">
            
            <ActionButton class="self-start">Let's go</ActionButton>
            
            <span class="text-white self-center">
                <p class="text-2xl">
                    Wähle deinen Avatar
                </p>
            </span>
            
            <ActionButton class="self-end">Let's go</ActionButton>
            
        </div>
    `
})
export class NavigationBarComponent {

}

@NgModule({
    imports: [ButtonModule],
    declarations: [NavigationBarComponent],
    exports: [NavigationBarComponent]
})
export class NavigationBarComponentModule {

}