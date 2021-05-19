import { ChangeDetectionStrategy, Component, EventEmitter, NgModule, Output } from "@angular/core";
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
                (click)="avatarSelected.next('planet')"
            ></Planet>
            <Backpack
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#FFD882"
                (click)="avatarSelected.next('backpack')"
            ></Backpack>
            <Cat
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#596881"
                (click)="avatarSelected.next('cat')"
            ></Cat>
            <Ghost
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="excited"
                color="#E0E4E8"
                (click)="avatarSelected.next('ghost')"
            ></Ghost>
            <IceCream
                class="p-10 hover:bg-green-400 cursor-pointer"
                size="100"
                mood="blissful"
                color="#FDA7DC"
                (click)="avatarSelected.next('icecream')"
            ></IceCream>
        </div>
    `,
    styles: [':host { display: block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarsListComponent {

    @Output()
    avatarSelected = new EventEmitter<string>();
}

@NgModule({
    imports: [AngularKawaiiModule],
    declarations: [AvatarsListComponent],
    exports: [AvatarsListComponent]
})
export class AvatarsListComponentModule {

}