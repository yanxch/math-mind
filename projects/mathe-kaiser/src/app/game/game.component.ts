import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecondLevelCalculationService } from '../calculation.2nd';
import { FirstLevelCalculationService } from '../calculation.easy';
import { MultiplyCalculationService } from '../calculation.multiply';
import { StateService } from '../state/state.service';
import { Option } from './dropdown/dropdown.component';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent implements AfterViewInit, OnDestroy {
    difficultyOptions = [
        {
            label: 'Level 1',
            value: this.firstLevelCalculation,
        },
        {
            label: 'Level 2',
            value: this.secondLevelCalculation,
        },
        {
            label: 'Level 3',
            value: this.multiplyCalculationService,
        },
    ];

    result = new FormControl();
    showSuccess = false;

    points$ = this.stateService.points$;
    avatar$ = this.stateService.avatar$;
    avatarColor$ = this.stateService.avatarColor$;

    selectedDifficultyOption = this.difficultyOptions[0];
    selectedDifficultyCalculation = this.selectedDifficultyOption.value;

    currentCalculation = this.selectedDifficultyCalculation.calculationParts();

    showMenu = false;
    subject: WebSocketSubject<any>;

    @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

    constructor(
        private firstLevelCalculation: FirstLevelCalculationService,
        private secondLevelCalculation: SecondLevelCalculationService,
        private multiplyCalculationService: MultiplyCalculationService,
        private stateService: StateService
    ) {
        this.result.valueChanges.subscribe((value) => this.checkResult(value));

        this.subject = webSocket('ws://localhost:8080');

        this.subject.subscribe(
            (msg) => console.log('message received: ', msg), // Called whenever there is a message from the server.
            (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        );
    }

    ngAfterViewInit() {
        this.inputElement.nativeElement.focus();
    }

    ngOnDestroy() {
        this.subject.complete();
    }

    checkResult(value: any) {
        this.subject.next({ message: value });
        const result = eval(`${this.currentCalculation.join(' ')}`);
        // console.log(value, result);

        const isCorrect =
            Number(result).toFixed(3) === Number(value).toFixed(3);

        if (isCorrect) {
            this.stateService.incrementPoints(10);
            this.showSuccess = true;

            setTimeout(() => {
                this.showSuccess = false;
                this.result.setValue(null);
                this.selectedDifficultyCalculation.newCalculation();
                this.currentCalculation = this.selectedDifficultyCalculation.calculationParts();
            }, 2000);
        }
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    difficultySelected(event: Option) {
        console.log(event);
        this.selectedDifficultyOption = event;
        this.selectedDifficultyCalculation = event.value;

        this.selectedDifficultyCalculation.newCalculation();
        this.currentCalculation = this.selectedDifficultyCalculation.calculationParts();
    }

    pressed(char: string) {
        this.result.setValue((this.result.value || '') + char);
    }

    pressedDelete() {
        const currentValue: string = this.result.value;
        const newValue = currentValue.substring(0, currentValue.length - 1);
        this.result.setValue(newValue);
    }
}
