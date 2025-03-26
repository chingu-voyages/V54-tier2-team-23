"use client";

import { PromptContentType, PromtContextType } from "@/type";
import { createContext, ReactNode, useState } from "react";

export const PromptContext = createContext<PromtContextType>(
	{} as PromtContextType
);

export default function PromptContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [promtContent, setPromptContent] = useState<PromptContentType>(
		{} as PromptContentType
	);
	return (
		<PromptContext.Provider
			value={{
				promptContext: promtContent,
				setPromptContext: setPromptContent,
			}}
		>
			{children}
		</PromptContext.Provider>
	);
}
