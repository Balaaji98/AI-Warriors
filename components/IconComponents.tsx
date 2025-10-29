
import React from 'react';

export const BotIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M12 12v-2" />
    <path d="M12 20v-4" />
    <path d="M9 12V8" />
    <path d="M15 12V8" />
  </svg>
);

export const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export const PlaneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 21l2.4-7.3L15 11l-2.4-2.4L2 21zM21 3l-2.4 7.3L10 13l2.4 2.4L21 3zM3 10.3l7.3 2.4L13 22l2.4-7.3L22 10l-7.3-2.4L12 2 10.3 3 3 10.3z"/>
        <path d="M2 21l2.4-7.3L15 11l-2.4-2.4L2 21zM21 3l-2.4 7.3L10 13l2.4 2.4L21 3z"/>
    </svg>
);
