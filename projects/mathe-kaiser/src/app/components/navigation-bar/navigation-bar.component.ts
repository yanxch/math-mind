import { Component, NgModule } from "@angular/core";

@Component({
    selector: 'NavigationBar',
    template: `
        <div class="bg-purple-800 p-6">
            <div class="flex justify-center text-white">
                <p class="text-2xl">
                    Wähle deinen Avatar
                </p>
            </div>
        </div>
    `
})
export class NavigationBarComponent {

}

@NgModule({
    declarations: [NavigationBarComponent],
    exports: [NavigationBarComponent]
})
export class NavigationBarComponentModule {

}