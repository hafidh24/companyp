
import { Message } from '../types';

const MESSAGES_KEY = 'company_test_messages';

export const getMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addMessage = (message: Omit<Message, 'id' | 'date' | 'isRead'>) => {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    isRead: false
  };
  messages.unshift(newMessage);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMessage;
};

export const markAsRead = (id: string) => {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index !== -1) {
    messages[index].isRead = true;
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
};

export const deleteMessage = (id: string) => {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};
