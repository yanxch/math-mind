import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    AnswerAction,
    Calculation,
    CalculationState,
    GameState,
    PlayerState,
} from '@server/math-mind';
import { AnswerState } from 'projects/mathe-kaiser-server/src/redux/model/Task';
import { SecondLevelCalculationService } from '../../calculation.2nd';
import { FirstLevelCalculationService } from '../../calculation.easy';
import { MultiplyCalculationService } from '../../calculation.multiply';
import { StateService } from '../../state/state.service';
import { Option } from './dropdown/dropdown.component';

@Component({
    selector: 'Game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input()
    gameState: GameState;

    @Input()
    playerState: PlayerState;

    @Input()
    username: string;

    @Input()
    points: number;

    @Output()
    checkAnswer = new EventEmitter<AnswerState>();

    calculation: Calculation;
    calculationParts: any[];

    gameCode = 'game1';

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

    showMenu = false;

    @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

    constructor(
        private firstLevelCalculation: FirstLevelCalculationService,
        private secondLevelCalculation: SecondLevelCalculationService,
        private multiplyCalculationService: MultiplyCalculationService,
        private stateService: StateService
    ) {
        this.result.valueChanges.subscribe((value) => this.checkResult(value));
    }

    ngOnChanges({ playerState, gameState, points }: SimpleChanges) {
        if (
            playerState &&
            playerState.currentValue !== playerState.previousValue
        ) {
            this.playerState = playerState.currentValue;
        }
        if (
            gameState &&
            gameState.currentValue?.task !== gameState.previousValue?.task
        ) {
            this.calculationParts = this.gameState.task.calculation;

        }
        if (points && points.currentValue !== points.previousValue) {
            if (points.currentValue > points.previousValue) {
                this.success();
            }
        }
    }

    ngOnInit() { }

    ngAfterViewInit() {
        console.log('Gamestate:', this.gameState);
        this.inputElement.nativeElement.focus();
    }

    ngOnDestroy() { }

    private success() {
        this.result.setValue(null);
        this.showSuccess = true;
        setTimeout(() => (this.showSuccess = false), 2000);
    }

    checkResult(value: any) {
        if (value) {
            this.checkAnswer.emit({
                username: this.playerState.joinState.username,
                gameCode: this.gameState.gameCode,
                answer: {
                    result: value,
                },
            });
        }

        /*const result = eval(`${this.calculationParts.join(' ')}`);
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
                this.calculationParts = this.selectedDifficultyCalculation.calculationParts();
            }, 2000);
        }*/
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    difficultySelected(event: Option) {
        console.log(event);
        this.selectedDifficultyOption = event;
        this.selectedDifficultyCalculation = event.value;

        this.selectedDifficultyCalculation.newCalculation();
        this.calculationParts =
            this.selectedDifficultyCalculation.calculationParts();
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
