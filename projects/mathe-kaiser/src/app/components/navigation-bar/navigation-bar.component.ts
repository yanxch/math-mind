import { Component, NgModule } from "@angular/core";
import { ButtonModule } from "../button/button.component";

@Component({
    selector: 'NavigationBar',
    template: `
        <div class="bg-purple-800 p-6">
            <div class="flex justify-center text-white">
                <p class="text-2xl">
                    Wähle deinen Avatar
                </p>
            </div>
            <div class="flex justify-end">
                <ActionButton>Let's go</ActionButton>
            </div>
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