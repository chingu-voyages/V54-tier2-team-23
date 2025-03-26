import { Input } from "@/type";
import Link from "next/link";

interface NavigationButtonsProps {
	idx: number;
	scrollToNextComponent: (input: Input, idx: number) => void;
	scrollToPrevComponent: (input: Input, idx: number) => void;
	input: Input;
}

export default function NavigationButtons({
	idx,
	scrollToNextComponent,
	scrollToPrevComponent,
	input,
}: NavigationButtonsProps) {
	const FIRST_INPUT_INDEX = 0;
	const LAST_INPUT_INDEX = 4;
	function NextButton({ input, idx }: { input: Input; idx: number }) {
		return (
			<button
				className="w-1/4 mt-4 flex justify-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="button"
				onClick={() => scrollToNextComponent(input, idx)}
			>
				Next
			</button>
		);
	}

	function BackButton({ input, idx }: { input: Input; idx: number }) {
		return (
			<button
				className={`${
					idx === 0 ? "hidden" : "visible"
				} w-1/4 flex justify-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4`}
				type="button"
				onClick={() => scrollToPrevComponent(input, idx)}
			>
				Back
			</button>
		);
	}

	function ReviewButton() {
		return (
			<Link
				href="review"
				className="flex w-full justify-end p-4 m-2 h-12  text-black underline"
			>
				ReView
			</Link>
		);
	}

	return idx === FIRST_INPUT_INDEX ? (
		<div className="w-1/2 flex justify-evenly">
			<div className=" w-full flex ">
				<button>Inspire Me</button>
			</div>

			<NextButton idx={idx} input={input} />
		</div>
	) : idx === LAST_INPUT_INDEX ? (
		<div className=" w-1/2">
			<BackButton idx={idx} input={input} /> <ReviewButton />{" "}
		</div>
	) : (
		<div className="w-1/2 flex justify-evenly">
			<div className=" w-full flex ">
				<BackButton idx={idx} input={input} />
			</div>
			<div className="flex justify-end w-full">
				<NextButton idx={idx} input={input} />
			</div>
		</div>
	);
}
