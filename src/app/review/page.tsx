'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useStoreContext } from '../helpers/StoreContext';
import { ButtonDirection } from '@/components/buttons/ButtonDirection';
import { generateResponse } from '@/util/api';
import MarkdownComponent from '@/components/markdown/MarkdownComponent';

export default function Review() {
    const { storeValue } = useStoreContext();

    const [combineInputs, setCombineInputs] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [geminiResponse, setGeminiResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const result = storeValue.inputValues
            .map((input) => input.question)
            .filter((input) => input.length > 0)
            .join('\n');
        setCombineInputs(result);
    }, [storeValue.inputValues]);

    const handleSubmit = async () => {
        setLoading(true);
        const response = await generateResponse(combineInputs);
        setLoading(false);
        setGeminiResponse(response as string);
    };

    return (
        <section className="text-black flex flex-col items-center h-full overflow-y-auto container">
            <section className="flex flex-col mt-[58px] w-full">
                <Link href="/promptInput" className="underline">
                    Back
                </Link>

                <h3 className="mt-8 font-bold mb-2">Preview your prompt</h3>
                <div className="flex flex-col items-start p-2  bg-gray-300  rounded-2xl w-full">
                    <textarea
                        disabled={disabled}
                        className={`w-full h-[326px] rounded-md p-2 ${
                            disabled ? 'text-gray-400' : 'text-black border-1 border-amber-50'
                        }`}
                        value={combineInputs}
                        onChange={(e) => setCombineInputs(e.target.value)}
                    />
                    <div
                        className={`p-2 cursor-pointer  rounded-md mt-2 text-xs ${
                            disabled ? 'bg-gray-400 text-white' : ''
                        }`}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />

                        <button
                            onClick={() => setDisabled(!disabled)}
                            className="px-1 cursor-pointer "
                        >
                            Edit Prompt
                        </button>
                    </div>
                </div>
            </section>

            <ButtonDirection active={true} text="Generate Result" onClick={handleSubmit} />

            <div className="w-full flex flex-col my-[62px] ">
                <h3 className="font-bold mb-2">Ember Response</h3>
                <div className="w-full p-4 bg-gray-300  rounded-lg geminiMarkdown">
                    {loading ? (
                        <BeatLoader
                            size={12}
                            color="#3498db"
                            loading={loading}
                            speedMultiplier={1}
                            className="mx-auto"
                        />
                    ) : geminiResponse ? (
                        <MarkdownComponent markdownText={geminiResponse} />
                    ) : (
                        <p> {'Ask your question in the prompt'}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
