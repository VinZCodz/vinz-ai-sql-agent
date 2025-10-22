export const useChatMock = () => {
  return {
    messages: mockMessages,
    sendMessage: (text: { text: string; }) => {
      console.log("Mock sendMessage called with:", text);
    }
  };
}

const mockMessages = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What is the current maximum width of this chat window?' }]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'The chat window is currently set to **max-w-xl**, which is a large screen width in Tailwind CSS. You can see how the messages and input field now stretch wider.' }]
  },
  {
    id: '3',
    role: 'user',
    parts: [{ type: 'text', text: 'Show me an example of a mock tool call output.' }]
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      {
        type: 'tool-databaseQuery',
        input: { query: 'SELECT COUNT(*) FROM users WHERE status = "active";' },
        state: 'output-available',
        output: [{ count: 1240 }]
      },
      { type: 'text', text: 'The query executed successfully, as demonstrated above.' }
    ]
  },
  {
    id: '5',
    role: 'user',
    parts: [{ type: 'text', text: 'What is the current maximum width of this chat window?' }]
  },
  {
    id: '6',
    role: 'assistant',
    parts: [{ type: 'text', text: 'The chat window is currently set to **max-w-xl**, which is a large screen width in Tailwind CSS. You can see how the messages and input field now stretch wider.' }]
  },
  {
    id: '7',
    role: 'user',
    parts: [{ type: 'text', text: 'Show me an example of a mock tool call output.' }]
  },
  {
    id: '8',
    role: 'assistant',
    parts: [
      {
        type: 'tool-databaseQuery',
        input: { query: 'SELECT COUNT(*) FROM users WHERE status = "active";' },
        state: 'output-available',
        output: [{ count: 1240 }]
      },
      { type: 'text', text: 'The query executed successfully, as demonstrated above.' }
    ]
  },
  {
    id: '9',
    role: 'user',
    parts: [{ type: 'text', text: 'What is the current maximum width of this chat window?' }]
  },
  {
    id: '10',
    role: 'assistant',
    parts: [{ type: 'text', text: 'The chat window is currently set to **max-w-xl**, which is a large screen width in Tailwind CSS. You can see how the messages and input field now stretch wider.' }]
  },
  {
    id: '11',
    role: 'user',
    parts: [{ type: 'text', text: 'Show me an example of a mock tool call output.' }]
  },
  {
    id: '12',
    role: 'assistant',
    parts: [
      {
        type: 'tool-databaseQuery',
        input: { query: 'SELECT COUNT(*) FROM users WHERE status = "active";' },
        state: 'output-available',
        output: [{ count: 1240 }]
      },
      { type: 'text', text: 'The query executed successfully, as demonstrated above.' }
    ]
  },
];

