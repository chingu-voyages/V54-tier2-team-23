"use client";

import Form from "@/components/form/Form";
import { Input } from "@/type";
import { useRef, useState } from "react";

export default function PromptInput() {
	const personaRef = useRef<HTMLDivElement | null>(null);
	const contextRef = useRef<HTMLDivElement | null>(null);
	const taskRef = useRef<HTMLDivElement | null>(null);
	const outputRef = useRef<HTMLDivElement | null>(null);
	const constrainRef = useRef<HTMLDivElement | null>(null);

	const inputs: Input[] = [
		{ title: "Persona", inputRef: personaRef },
		{ title: "Context", inputRef: contextRef },
		{ title: "Task", inputRef: taskRef },
		{ title: "Output", inputRef: outputRef },
		{ title: "Constrain", inputRef: constrainRef },
	];
	//add state to handle active step.
	const [activeStep, setActiveStep] = useState(0);

	function handleNext() {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}

	function handleBack() {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}

	function handleReset() {
		setActiveStep(0);
	}

	return (
		<div className="h-full  overflow-y-hidden">
			<section className=" flex justify-center items-center">
				<div className="p-3 text-black">O-O-O-O-O</div>
			</section>
			<main className="">
				<Form
					inputs={inputs}
					activeStep={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
					handleReset={handleReset}
				/>
			</main>
		</div>
	);
}
