import { Component, NgModule } from "@angular/core";
import { ButtonModule } from "../action-button/action-button.component";

@Component({
    selector: 'NavigationBar',
    template: `
        <div class="bg-purple-800 p-6 flex justify-between">
            
            <div>
                <ng-content select="LeftActions"></ng-content>
            </div>
            
            <span class="text-white self-center">
                <p class="text-2xl">
                    <ng-content></ng-content>
                </p>
            </span>
            
            <div>
                <ng-content select="RightActions"></ng-content>
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