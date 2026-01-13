import { OpponentType } from '../poker';
import { CHART_ACTIONS, SecondActionType, SpinActionType, SpinPlayersCount } from '../../constants';

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
	minStack: number;
	maxStack: number;
	combinations: string;
	secondActions: SecondAction[];
	answers: RangeAnswer[];
	splitAnswers: RangeSplitAnswer[];
}

export interface RangeAnswer {
	type: CHART_ACTIONS;
	amount?: number;
	weight?: number;
}

export interface RangeSplitAnswer {
	answers: RangeAnswer[];
}

export interface SecondAction {
	type: SecondActionType;
	amount?: number;
	combinations: string;
}