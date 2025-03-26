"use client";

import { FormEvent, useContext, useState } from "react";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import AnimationContainer from "../animationContainer/AnimationContainer";
import { PromptContext } from "@/context/promt-context";
import { useRouter } from "next/navigation";
import { FormProps, Input } from "@/type";

export default function Form({ inputs, handleNext, handleBack }: FormProps) {
	const contetext = useContext(PromptContext);
	const [persona, setPersona] = useState("persona value");
	const [context, setContext] = useState("context value");
	const [task, setTask] = useState("task value");
	const [output, setOutput] = useState("output value");
	const [constrain, setConstrain] = useState("constraint value");

	const route = useRouter();

	const valueMapper: Record<string, string> = {
		persona,
		context,
		task,
		output,
		constrain,
	};

	function scrollToNextComponent(input: Input, idx: number) {
		inputs[idx + 1].inputRef.current?.scrollIntoView({
			behavior: "smooth",
		});
		handleNext();
	}

	function scrollToPrevComponent(input: Input, idx: number) {
		inputs[idx - 1].inputRef.current?.scrollIntoView({
			behavior: "smooth",
		});
		handleBack();
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		contetext.setPromptContext({
			...contetext.promptContext,
			persona,
			context,
			task,
			output,
			constrain,
		});

		route.push("/review");
	}

	function handleChange(title: string, value: string) {
		title = title.toLowerCase();

		if (title == "persona") setPersona(value);
		if (title == "context") setContext(value);
		if (title == "task") setTask(value);
		if (title == "output") setOutput(value);
		if (title == "constraint") setConstrain(value);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col  w-full h-[60vh] overflow-scroll  p-10 items-center"
		>
			{/* Form Sections */}
			{inputs.map((input, idx) => (
				<AnimationContainer key={input.title} input={input} idx={idx}>
					<div className="flex flex-col items-center text-black">
						<label className="bg-white  m-2">{input.title}</label>
						<textarea
							// type="text"
							required
							name={input.title}
							className="p-4 bg-[#CAD2C5] w-1/2 flex h-[20vh]"
							placeholder={input.title}
							value={valueMapper[input.title.toLowerCase()]}
							onChange={(e) => handleChange(input.title, e.target.value)}
						/>

						<NavigationButtons
							idx={idx}
							scrollToNextComponent={scrollToNextComponent}
							scrollToPrevComponent={scrollToPrevComponent}
							input={input}
						/>
					</div>
				</AnimationContainer>
			))}
			<button
				type="submit"
				className="text-black cursor-pointer p-2 bg-[#CAD2C5]"
			>
				Review
			</button>
		</form>
	);
}
