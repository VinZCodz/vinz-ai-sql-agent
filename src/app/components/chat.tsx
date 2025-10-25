'use client'

import { useChat } from '@ai-sdk/react';
import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
// import { useChatMock } from '../../../test/mockChat

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { messages, sendMessage, status } = useChat();
    // const { messages, sendMessage } = useChatMock();

    // Auto-scrolling effect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resizing effect
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';

            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = 200;

            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [input]);

    // Submission handler (Enter submits, Shift+Enter creates a new line)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                sendMessage({ text: input });
                setInput('');
            }
        }
        // If Shift + Enter is pressed, do nothing, allow the default (new line)
    };

    interface ToolInput {
        query: string;
        tableName: string;
        // other properties
    }
    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <div className='fixed top-0 flex flex-col items-center w-full bg-[var(--background)] z-20'>
                <img src="/Query-osity_hex.png" className='max-w-[9rem] p-2' alt='Vinz Query-osity'></img>
            </div>

            <div className="w-full max-w-3xl py-24 pb-32">
                {messages.map(message => (
                    <div key={message.id} className={`flex w-full mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${message.role === 'user' ? 'w-fit max-w-[80%] h-fit bg-blue-900/40 border border-blue-800 rounded-3xl rounded-tr-none p-4 shadow-lg' : 'whitespace-pre-wrap overflow-x-auto'}`}>
                            {message.role === 'user' ? (<div className='text-right'><span className='text-3xl'>👨</span></div>) : (<div className='text-left'><span className='text-3xl'>✨</span></div>)}
                            {message.parts.map((part, i) => {
                                switch (part.type) {
                                    case 'text':
                                        return (
                                            <div key={`${message.id}-${i}`} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: marked(part.text!) }}></div>
                                        );
                                    case 'tool-dbTableNames':
                                        return (
                                            <div key={`${message.id}-${i}`}>
                                                <div className="text-sm text-green-300 my-4">
                                                    <div className="font-semibold mb-1">
                                                        ⏳ Checking...
                                                    </div>
                                                </div>
                                                <div className="max-w-xs my-2 p-3 bg-blue-900/40 rounded border border-blue-800">
                                                    <div className="font-semibold text-blue-300 mb-1">
                                                        🚦 Permit:
                                                    </div>
                                                    {part.state === 'output-available' && part.output as [] && (
                                                        <div className="text-sm text-green-300">
                                                            ☑️ {(part.output as []).length || 0} Table(s) are Permitted.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    case 'tool-dbTableSchema':
                                        return (
                                            <div key={`${message.id}-${i}`}>
                                                <div className="text-sm text-green-300 my-4">
                                                    <div className="font-semibold mb-1">
                                                        ⏳ Fetching...
                                                    </div>
                                                </div>
                                                <div className="max-w-xs my-2 p-3 bg-blue-900/40 rounded border border-blue-800">
                                                    <div className="font-semibold text-blue-300 mb-1">
                                                        🚀 Schema:
                                                    </div>
                                                    {part.state === 'output-available' && (part.output as string).length && (
                                                        <div className="text-sm text-green-300">
                                                            ☑️ {(part.input as ToolInput).tableName} Loaded.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    case 'tool-dbQuery':
                                        return (
                                            <div key={`${message.id}-${i}`} className="max-w-2xl">
                                                <div className="text-sm text-green-300 my-4">
                                                    <div className="font-semibold mb-1">
                                                        ⏳ Querying...
                                                    </div>
                                                </div>
                                                <div className="my-2 p-3 bg-purple-900/40 rounded border border-purple-800">
                                                    <div className="font-semibold text-purple-300 mb-1">
                                                        ⚡ SQL:
                                                    </div>
                                                    {(part.input as ToolInput)?.query && (
                                                        <pre className="text-xs bg-black bg-white-900 p-2 rounded mb-2 overflow-x-auto">
                                                            {(part.input as ToolInput).query}
                                                        </pre>
                                                    )}
                                                    {part.state === 'output-available' && part.output as [] && (
                                                        <div className="text-sm text-green-300">
                                                            ✔️✔️ Returned {(part.output as []).length || 0} rows
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="inline-flex flex-col items-center justify-center w-full">
                                                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-700 border-0 rounded-sm" />
                                                    🔬 Analysis
                                                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-700 border-0 rounded-sm" />
                                                </div>
                                            </div>
                                        );
                                    // case 'step-start':
                                    //   return (
                                    //     <div
                                    //       key={`${message.id}-${i}`}
                                    //     >
                                    //     </div>
                                    //   );
                                    case 'reasoning':
                                        return null;
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>
                ))}
                {status != 'ready' && status != 'error' && (
                    <div role="status" className="max-w-2xl animate-pulse">
                        <div className="h-3.5 bg-purple-200 rounded-full dark:bg-purple-700 w-48 mb-4"></div>
                        <div className="h-3 bg-purple-200 rounded-full dark:bg-purple-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-3 bg-purple-200 rounded-full dark:bg-purple-700 mb-2.5"></div>
                        <div className="h-3 bg-purple-200 rounded-full dark:bg-purple-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-3 bg-purple-200 rounded-full dark:bg-purple-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-3 bg-purple-200 rounded-full dark:bg-purple-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {status == 'error' && (
                    <div className="text-sm text-red-500 my-4">
                        <div className="font-bold mb-1">
                            🚫 Server down! Please try after sometime.
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className='fixed bottom-0 w-full max-w-4xl bg-[var(--background)] z-20'>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                >
                    <textarea
                        ref={textareaRef}
                        rows={4}
                        className="w-full p-3 border border-purple-800 rounded-3xl shadow-xl resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={input}
                        placeholder="✨ Hello! Let's talk to your Database!"
                        onChange={e => setInput(e.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        disabled={status != 'ready'}
                    />
                    <div className="text-center text-xs">Vinz Query-osity has only read access to your database</div>
                </form>
            </div>
        </div>
    );
}

export default ChatComponent;