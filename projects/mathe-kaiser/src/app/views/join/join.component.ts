import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    NgModule,
    NO_ERRORS_SCHEMA,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { randomReadableWord } from '@server/math-mind';
import { ButtonModule } from '../../components/action-button/action-button.component';
import {
    AVAILABLE_AVATARS,
    AvatarsListComponentModule,
} from '../../components/avatars-list/avatars-list.component';
import { ButtonBoxComponentModule } from '../../components/button-box/buttons.component';
import { NavigationBarComponentModule } from '../../components/navigation-bar/navigation-bar.component';
import { UsernameInputComponentModule } from '../../components/username-input/username-input.component';
import { randomIntegerNumber } from '../../random';
import { StateService } from '../../state/state.service';

@Component({
    selector: 'AvatarLogin',
    template: `
        <nav>
            <NavigationBar>
                <LeftActions>
                    <ButtonBox>
                        <ActionButton [show]="false">Back</ActionButton>
                    </ButtonBox>
                </LeftActions>
                Wähle deinen Avatar
                <RightActions>
                    <ActionButton
                        [show]="showNextAction"
                        (click)="nextScreen()"
                    >
                        Let's go
                    </ActionButton>
                </RightActions>
            </NavigationBar>
        </nav>
        <main>
            <AvatarsList
                [selected]="avatar"
                (avatarSelected)="setAvatar($event)"
            >
            </AvatarsList>
            <div class="flex flex-wrap justify-center">
                <div
                    *ngFor="let color of colors"
                    class="w-10 h-10 rounded border-gray-400 hover:border-purple-800 border-2 m-2 cursor-pointer"
                    [style.backgroundColor]="color"
                    (click)="chooseColor(color)"
                ></div>
            </div>
            <!-- weirdly enough banana in a box does not trigger change-detection in nav bar??-->
            <UsernameInput
                [username]="username"
                placeholder="Username"
                (usernameChanged)="usernameChanged($event)"
            >
            </UsernameInput>
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements OnInit {
    username = randomReadableWord(5);
    avatar = '';
    showNextAction = true;
    colors = [
        '#ED3B15',
        '#F7B52B',
        '#1CC564',
        '#D3F72B',
        '#6DF72B',
        '#2BF74F',
        '#2BF7B5',
        '#2BC6F7',
        '#2B60F7',
        '#C22BF7',
        '#F72BC6',
    ];
    selectedColor = '#ED3B15';


    constructor(private stateService: StateService, private router: Router) { }

    ngOnInit(): void {
        const number = randomIntegerNumber(AVAILABLE_AVATARS.length);
        this.avatar = AVAILABLE_AVATARS[number];
    }

    setAvatar(name: string) {
        this.avatar = name;
        this.stateService.setAvatar(name);
        if (this.username) {
            this.showNextAction = true;
        }
    }

    usernameChanged(u: string) {
        this.username = u;
        if (this.avatar) {
            this.showNextAction = true;
        }
    }

    chooseColor(color: string) {
        this.selectedColor = color;
        this.stateService.setAvatarColor(color);
    }

    nextScreen() {
        this.router.navigate(['avatar']);
    }
}

@NgModule({
    imports: [
        CommonModule,
        NavigationBarComponentModule,
        AvatarsListComponentModule,
        UsernameInputComponentModule,
        ButtonModule,
        ButtonBoxComponentModule,
    ],
    declarations: [JoinComponent],
    exports: [JoinComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule { }
