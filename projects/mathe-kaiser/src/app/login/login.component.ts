import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarsListComponentModule } from '../components/avatars-list/avatars-list.component';
import { ButtonModule } from '../components/action-button/action-button.component';
import { NavigationBarComponentModule } from '../components/navigation-bar/navigation-bar.component';
import { UsernameInputComponentModule } from '../components/username-input/username-input.component';
import { StateService } from '../state/state.service';
import { ButtonBoxComponentModule } from '../components/button-box/buttons.component';

@Component({
    selector: 'AvatarLogin',
    template: `
        <nav>
            <NavigationBar>
                <LeftActions>
                    <ButtonBox>
                        <!--ActionButton>Back</ActionButton-->
                    </ButtonBox>  
                </LeftActions>
                Wähle deinen Avatar
                <RightActions>
                    <!--ActionButton>Let's go</ActionButton-->
                </RightActions>
            </NavigationBar>
        </nav>
        <main>
            <AvatarsList 
                (selectedAvatar)="nextScreen($event)">
            </AvatarsList>
            <UsernameInput [(username)]="username"></UsernameInput>
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    username: string;

    constructor(private stateService: StateService, private router: Router) { }

    ngOnInit(): void { }

    nextScreen(name: string) {
        this.stateService.setAvatar(name);
        this.router.navigate(['avatar']);
    }
}

@NgModule({
    imports: [
        NavigationBarComponentModule,
        AvatarsListComponentModule,
        UsernameInputComponentModule,
        ButtonModule,
        ButtonBoxComponentModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }