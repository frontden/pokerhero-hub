import { Chart } from './chart';
import { SpinGameType } from '../../constants';

export interface Pack {
	id?: number;
	title: string;
	description: string;
	gameType: SpinGameType;
	charts: Chart[];
}