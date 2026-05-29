import { useState, useCallback, useRef } from 'react';
import type { Conversation } from '../lib/types';

const REPLIES = [
  'gm! love your onchain profile',
  'haha that bio got me. coffee soon?',
  'wait you went to ETHDenver too??',
  'no way, I hold that collection too',
  'ok this is a green flag fr',
  'send me your fav Base dapp',
  'lol stop you are too smooth',
  'wanna debug life together? 😅',
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [typing, setTyping] = useState(false);
  const typingRef = useRef<string | null>(null);

  const getConversation = useCallback((matchId: string) => {
    return conversations.find((c) => c.matchId === matchId);
  }, [conversations]);

  const ensureConversation = useCallback((matchId: string) => {
    setConversations((prev) => {
      if (prev.some((c) => c.matchId === matchId)) return prev;
      return [...prev, { matchId, messages: [{
        id: `init-${matchId}`,
        matchId,
        fromMe: false,
        text: 'gm, looks like we matched onchain ⚡',
        ts: Date.now() - 120000,
      }] }];
    });
  }, []);

  const sendMessage = useCallback((matchId: string, text: string) => {
    if (!text.trim()) return;
    setConversations((prev) => {
      const exists = prev.find((c) => c.matchId === matchId);
      const msg = { id: `${matchId}-${Date.now()}`, matchId, fromMe: true, text, ts: Date.now() };
      if (!exists) return [...prev, { matchId, messages: [msg] }];
      return prev.map((c) => (c.matchId === matchId ? { ...c, messages: [...c.messages, msg] } : c));
    });

    typingRef.current = matchId;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setConversations((prev) => prev.map((c) =>
        c.matchId === matchId
          ? { ...c, messages: [...c.messages, { id: `${matchId}-r-${Date.now()}`, matchId, fromMe: false, text: reply, ts: Date.now() }] }
          : c
      ));
    }, 1600 + Math.random() * 1200);
  }, []);

  return { conversations, sendMessage, getConversation, ensureConversation, typing };
}
