import { Component, NgModule } from "@angular/core";
import { AngularKawaiiModule } from "angular-kawaii";

@Component({
    selector: 'AvatarsList',
    template: `
        <div class="flex flex-wrap justify-center mt-10">
            <Planet
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="happy"
                color="#A6E191"
                (click)="chooseAvatar('planet')"
            ></Planet>
            <Backpack
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#FFD882"
                (click)="chooseAvatar('backpack')"
            ></Backpack>
            <Cat
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#596881"
                (click)="chooseAvatar('cat')"
            ></Cat>
            <Ghost
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#E0E4E8"
                (click)="chooseAvatar('ghost')"
            ></Ghost>
            <IceCream
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="blissful"
                color="#FDA7DC"
                (click)="chooseAvatar('icecream')"
            ></IceCream>
        </div>
    `,
    styles: [':host { display: block; }']
})
export class AvatarsListComponent {

    chooseAvatar(avatarName: string) {
        console.log(avatarName);
    }
}

@NgModule({
    imports: [AngularKawaiiModule],
    declarations: [AvatarsListComponent],
    exports: [AvatarsListComponent]
})
export class AvatarsListComponentModule {

}