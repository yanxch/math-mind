import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output, SimpleChanges } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { combineLatest, Subject } from "rxjs";
import { flatMap, takeUntil } from "rxjs/operators";

@Component({
    selector: 'UsernameInput',
    template: `
        <input
            [formControl]="usernameControl"
            type="text"
            placeholder=""
            class="p-10 min-w-full text-5xl shadow bg-green-500 bg-opacity-25 outline-none text-center"
        />
    `,
    styles: [':host { display: flex; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsernameInputComponent implements OnChanges, OnDestroy {
    usernameControl = new FormControl();

    @Input()
    username: string;

    @Output()
    usernameChanged = new EventEmitter<string>();

    destroy$ = new Subject();

    constructor() {
        this.usernameControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.usernameChanged.next(value);
            })
    }

    ngOnChanges({ username }: SimpleChanges) {
        if (username) {
            this.usernameControl.setValue(username.currentValue);
        }
    }

    ngOnDestroy() {
        this.destroy$.next({});
        this.destroy$.complete();
    }
}

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [UsernameInputComponent],
    exports: [UsernameInputComponent]
})
export class UsernameInputComponentModule {

}