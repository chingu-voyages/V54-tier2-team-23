"use client";

import { PromptContext } from "@/context/promt-context";
import { generateResponse } from "@/util/api";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Review() {
	const { promptContext, setPromptContext } = useContext(PromptContext);
	const [finalPromt, setFinalPromt] = useState("");
	const [result, setResult] = useState("");
	const [responseLoading, setResponseLoading] = useState(false);

	useEffect(() => {
		let prompt: string = `${promptContext.persona || ""} ${
			promptContext.context || ""
		} ${promptContext.task || ""} ${promptContext.output || ""} ${
			promptContext.constraint || ""
		}`;
		setFinalPromt(prompt);
	}, [promptContext]);

	const handleChange = (value: string) => {
		setFinalPromt(value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setResponseLoading(true);
		const response = (await generateResponse(finalPromt)) as string;
		setResponseLoading(false);
		setResult(response);
	};

	return (
		<section className="text-black flex flex-col items-center h-full overflow-y-auto">
			<h1 className="mt-[49px] text-[36px] font-[Open_Sans] font-normal leading-[normal]">
				Prompt Review
			</h1>

			<section className="flex flex-col mt-[58px]">
				<Link href="/promptInput">Back</Link>

				<div>
					<form onSubmit={handleSubmit} className="">
						<textarea
							className="w-[1080px] h-[326px]  p-[40px] flex flex-col mt-[62px]  bg-gray-300  rounded-4xl"
							value={finalPromt}
							onChange={(e) => handleChange(e.target.value)}
						/>

						<div className="flex justify-center">
							<button
								type="submit"
								className="mt-[80px] w-[245px] h-[60px] bg-gray-300 cursor-pointer"
							>
								Generate Prompt
							</button>
						</div>
					</form>
				</div>

				<div className="mb-7">
					Result
					<div className="w-[1080px] h-min-[326px]  p-[40px] flex flex-col mt-[62px]  bg-gray-300  rounded-4xl">
						{responseLoading && <p>Loading ...</p>}
						{!responseLoading && result}
					</div>
				</div>
			</section>
		</section>
	);
}
