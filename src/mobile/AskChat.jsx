import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

// Phone-only "Ask Bottega" conversation, shown inside the 🔍 search screen.
// Same backend as the desktop map search bar (/api/ask-bottega).
export default function AskChat({ initialQuestion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const ask = async (text, history) => {
    const msg = text.trim();
    if (!msg) return;
    setMessages((m) => [...m, { role: 'user', content: msg }]);
    setLoading(true);
    let reply;
    try {
      const res = await fetch('/api/ask-bottega', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: history.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json().catch(() => ({}));
      reply = data.reply || 'Mi dispiace, something went wrong. Try again?';
    } catch {
      reply = 'Connection error — please try again.';
    }
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  useEffect(() => {
    if (started.current || !initialQuestion) return;
    started.current = true;
    ask(initialQuestion, []);
  }, [initialQuestion]);

  const submit = (e) => {
    e.preventDefault();
    if (loading || !input.trim()) return;
    const text = input;
    setInput('');
    ask(text, messages);
  };

  return (
    <div className="ask-chat">
      <div className="ask-msgs" ref={bodyRef}>
        {messages.map((m, i) => <div key={i} className={`ask-msg ${m.role}`}>{m.content}</div>)}
        {loading && <div className="ask-typing" aria-label="Bottega is typing"><i /><i /><i /></div>}
      </div>
      <form className="ask-input" onSubmit={submit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a follow-up…" enterKeyHint="send" aria-label="Ask a follow-up" />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send"><Send size={18} /></button>
      </form>
    </div>
  );
}
