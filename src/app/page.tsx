'use client';

import { useChat } from '@ai-sdk/react';
import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import { useChatMock } from '../../test/mockChat'

export default function Chat() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage } = useChat();
  // const { messages, sendMessage } = useChatMock();

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
  const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
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
    // other properties
  }
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <div className='fixed top-0 flex flex-col items-center w-full bg-[#1a1a1a] z-20'>
        <img src="/Query-osity_hex.png" className='max-w-[9rem] p-2'></img>
      </div>

      <div className="w-full max-w-3xl py-24 pb-32">
        {messages.map(message => (
          <div key={message.id} className={`flex w-full mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${message.role === 'user' ? 'w-fit max-w-[80%] h-fit bg-blue-900/20 border border-blue-800 rounded-3xl rounded-tr-none p-4 shadow-lg' : 'whitespace-pre-wrap overflow-x-auto'}`}>
              {message.role === 'user' ? (<div className='text-right'><span className='text-3xl'>👨</span></div>) : (<div className='text-left'><span className='text-3xl'>✨</span></div>)}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div key={`${message.id}-${i}`} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: marked(part.text!) }}></div>
                    );
                  case 'tool-databaseQuery':
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="my-2 p-3 bg-purple-900/20 rounded border border-purple-800">
                        <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                          🔎 Database Query:
                        </div>
                        {(part.input as ToolInput)?.query && (
                          <pre className="text-xs bg-black dark:bg-white-900 p-2 rounded mb-2 overflow-x-auto">
                            {(part.input as ToolInput).query}
                          </pre>
                        )}
                        {part.state === 'output-available' && part.output as [] && (
                          <div className="text-sm text-green-700 dark:text-green-300">
                            ✔️✔️ Returned {(part.output as []).length || 0} rows
                          </div>
                        )}
                      </div>
                    );
                  case 'step-start':
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="text-sm text-green-500 dark:text-green-400 my-4">
                        <div className="font-semibold text-green-700 dark:text-green-300 mb-1">
                          ⏳ Processing...
                        </div>
                      </div>
                    );
                  case 'reasoning':
                    return null;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <div className='fixed bottom-0 w-full max-w-4xl bg-[#1a1a1a] z-20'>
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
          />
          <div className="text-center text-xs">Vinz Query-osity has only read access to your database</div>
        </form>
      </div>
    </div>
  );
}