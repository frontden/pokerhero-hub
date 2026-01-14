import { OpponentType } from '../poker';
import { SecondActionType, SpinActionType, SpinPlayersCount } from '../../constants';

export interface Chart {
	id?: number;
	ranges: ChartRange[];
	playersCount: SpinPlayersCount;
	actionType: SpinActionType;
	actionAmount: number;
	btnOpponentType?: OpponentType;
	sbOpponentType?: OpponentType;
	bbOpponentType?: OpponentType;
}

export interface ChartRange {
	id?: number;
	minStack: number;
	maxStack: number;
	combinations: string;
	answers: string;
	splitAnswers: string;
	secondActions: SecondAction[];
}

export interface SecondAction {
	id?: number;
	type: SecondActionType;
	amount?: number;
	combinations: string;
	answers: string;
	splitAnswers: string;
}