import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    NgModule,
    NO_ERRORS_SCHEMA,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { JoinedAction, randomReadableWord } from '@server/math-mind';
import { joined, store } from 'projects/mathe-kaiser/src/redux';
import { ButtonModule } from '../../components/action-button/action-button.component';
import {
    AVAILABLE_AVATARS,
    AvatarsListComponentModule,
} from '../../components/avatars-list/avatars-list.component';
import { ButtonBoxComponentModule } from '../../components/button-box/buttons.component';
import { ChooseColorModule } from '../../components/choose-color/choose-color.component';
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
            <ChooseColor (selectedColorChange)="selectedColorChanged($event)">
            </ChooseColor>
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
    selectedColor;
    gameCode = 'game1'; // TODO: random

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

    selectedColorChanged(color: string) {
        this.selectedColor = color;
        this.stateService.setAvatarColor(color);
    }

    nextScreen() {
        const payload: JoinedAction = {
            joinCode: `${this.gameCode}-${this.username}`
        };
        store.dispatch(joined(payload))

        this.router.navigate(['game', this.gameCode]);
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
        ChooseColorModule,
    ],
    declarations: [JoinComponent],
    exports: [JoinComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule { }
