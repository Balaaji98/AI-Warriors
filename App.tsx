
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message, FlightDetails } from './types';
import { MessageRole } from './types';
import { runChat } from './services/geminiService';
import { BotIcon, SendIcon, UserIcon, PlaneIcon } from './components/IconComponents';
import FlightCard from './components/FlightCard';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: MessageRole.ASSISTANT,
      text: "Hello! I'm your AI Travel Assistant. How can I help you with your flight plans today? You can ask me to find flights, check airline policies, or get airport information.",
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: MessageRole.USER, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-10); // Send last 10 messages for context
      const response = await runChat(input, chatHistory);

      const assistantMessage: Message = {
        role: MessageRole.ASSISTANT,
        text: response.text,
        flights: response.flights,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini:', error);
      const errorMessage: Message = {
        role: MessageRole.ASSISTANT,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center space-x-3 fixed top-0 w-full z-10">
        <div className="text-blue-500">
          <PlaneIcon />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">AI Travel Assistant</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pt-20 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
              {msg.role === MessageRole.ASSISTANT && (
                <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <BotIcon />
                </div>
              )}
              <div className={`max-w-lg p-4 rounded-2xl shadow ${msg.role === MessageRole.USER ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.flights && msg.flights.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {msg.flights.map((flight, flightIndex) => (
                      <FlightCard key={flightIndex} flight={flight} />
                    ))}
                  </div>
                )}
              </div>
              {msg.role === MessageRole.USER && (
                <div className="w-8 h-8 flex-shrink-0 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <UserIcon />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <BotIcon />
                </div>
              <div className="max-w-lg p-4 rounded-2xl shadow bg-white dark:bg-gray-700 rounded-bl-none flex items-center space-x-2">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-150">●</span>
                <span className="animate-pulse delay-300">●</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about flights, policies, and more..."
            className="flex-1 p-3 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ''}
            className="p-3 rounded-full bg-blue-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            <SendIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
