import { RefObject } from "react";

export interface Input {
	title: string;
	inputRef: RefObject<HTMLDivElement | null>;
}

export interface AnimationProps {
	children: React.ReactNode;
	input: Input;
	idx: number;
}

export interface PromptContentType {
	persona: string;
	context: string;
	task: string;
	output: string;
	constraint: string;
}

export interface PromtContextType {
	promptContext: PromptContentType;
	setPromptContext: Function;
}

export interface FormProps {
	inputs: Input[];
	activeStep: number;
	handleNext: () => void;
	handleBack: () => void;
	handleReset: () => void;
}
