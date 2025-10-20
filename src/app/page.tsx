'use client';

import { useChat } from '@ai-sdk/react';
import { marked } from 'marked';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch ">
      {messages.map(message => (
        <div key={message.id} className={`flex w-full mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`${message.role === 'user' ? 'w-fit max-w-[80%] h-fit bg-blue-900/20 border border-blue-800 rounded-3xl rounded-tr-none p-4 shadow-lg' : 'whitespace-pre-wrap'}`}>
            {message.role === 'user' ? (<div className='text-right'><span className='text-3xl'>👨</span></div>) : (<div className='text-left'><span className='text-3xl'>✨</span></div>)}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <div key={`${message.id}-${i}`} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: marked(part.text) }}></div>
                  );
                case 'tool-databaseQuery':
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className="my-2 p-3 bg-purple-900/20 rounded border border-purple-800">
                      <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                        🔎 Database Query:
                      </div>
                      {part.input?.query && (
                        <pre className="text-xs bg-black dark:bg-white-900 p-2 rounded mb-2 overflow-x-auto">
                          {part.input.query}
                        </pre>
                      )}
                      {part.state === 'output-available' && part.output && (
                        <div className="text-sm text-green-700 dark:text-green-300">
                          ✔️✔️ Returned {part.output?.length || 0} rows
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

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-gray-900 bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 dark:border-gray-800 rounded-3xl shadow-xl"
          value={input}
          placeholder="Hello! I can help talk to your Database!"
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}