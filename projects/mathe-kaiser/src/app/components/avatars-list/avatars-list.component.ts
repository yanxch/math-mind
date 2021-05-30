import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from "@angular/core";
import { AngularKawaiiModule } from "angular-kawaii";

@Component({
    selector: 'AvatarsList',
    template: `
        <div class="flex flex-wrap justify-center">
            <Planet
                class="p-10 hover:bg-green-300 cursor-pointer"
                [class.bg-green-300]="selected == 'planet' ? true : false"
                size="100"
                mood="happy"
                color="#A6E191"
                (click)="select('planet')"
            ></Planet>
            <Backpack
                class="p-10 hover:bg-green-300 cursor-pointer"
                [class.bg-green-300]="selected == 'backpack' ? true : false"
                size="100"
                mood="excited"
                color="#FFD882"
                (click)="select('backpack')"
            ></Backpack>
            <Cat
                class="p-10 hover:bg-green-300 cursor-pointer"
                [class.bg-green-300]="selected == 'cat' ? true : false"
                size="100"
                mood="excited"
                color="#596881"
                (click)="select('cat')"
            ></Cat>
            <Ghost
                class="p-10 hover:bg-green-300 cursor-pointer"
                [class.bg-green-300]="selected == 'ghost' ? true : false"
                size="100"
                mood="excited"
                color="#E0E4E8"
                (click)="select('ghost')"
            ></Ghost>
            <IceCream
                class="p-10 hover:bg-green-300 cursor-pointer"
                [class.bg-green-300]="selected == 'icecream' ? true : false"
                size="100"
                mood="blissful"
                color="#FDA7DC"
                (click)="select('icecream')"
            ></IceCream>
        </div>
    `,
    styles: [':host { display: block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarsListComponent {

    @Input()
    selected: string;

    @Output()
    avatarSelected = new EventEmitter<string>();

    select(avatar: string) {
        this.avatarSelected.emit(avatar);
    }
}

@NgModule({
    imports: [AngularKawaiiModule],
    declarations: [AvatarsListComponent],
    exports: [AvatarsListComponent]
})
export class AvatarsListComponentModule {

}