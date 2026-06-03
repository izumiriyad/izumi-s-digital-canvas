import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles, RotateCcw, Trash2, AlertTriangle, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Status = 'idle' | 'connecting' | 'streaming' | 'error';
type Msg = {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const STORAGE_KEY = 'izumi-chat-history-v1';

const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hey — I'm **izumi.ai**, Riyad's AI concierge. Ask about pentests, pricing, methodology, or how to book a call.",
};

const SUGGESTIONS = [
  'What services do you offer?',
  'How much for a web app pentest?',
  'How long does an engagement take?',
  'How do I book a call?',
];

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {}
    return [GREETING];
  });

  const navigate = useNavigate();

  const handleInternalNav = useCallback(
    (href: string) => {
      setOpen(false);
      // hash on current page: /#section or #section
      const hashMatch = href.match(/^\/?#(.+)$/);
      if (hashMatch) {
        const id = hashMatch[1];
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 250);
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus('idle');
  }, []);

  const send = useCallback(
    async (text: string, retryOf?: number) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setErrorMsg(null);
      lastUserRef.current = trimmed;

      // If retrying, drop the failed assistant message before the retry index
      let baseMessages: Msg[];
      setMessages((prev) => {
        if (retryOf !== undefined) {
          baseMessages = prev.slice(0, retryOf);
        } else {
          baseMessages = [...prev, { role: 'user', content: trimmed }];
        }
        return baseMessages;
      });

      // Read latest state synchronously
      const conversation =
        retryOf !== undefined
          ? messages.slice(0, retryOf)
          : [...messages, { role: 'user' as const, content: trimmed }];

      setInput('');
      setStatus('connecting');

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const resp = await fetch(CHAT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: conversation }),
          signal: ctrl.signal,
        });

        if (!resp.ok || !resp.body) {
          const err = await resp.json().catch(() => ({ error: 'Request failed.' }));
          throw new Error(err.error || `HTTP ${resp.status}`);
        }

        setStatus('streaming');
        // Seed empty assistant message
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let acc = '';
        let done = false;

        while (!done) {
          const { done: d, value } = await reader.read();
          if (d) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf('\n')) !== -1) {
            let line = buffer.slice(0, nl);
            buffer = buffer.slice(nl + 1);
            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (!line.startsWith('data: ')) continue;
            const json = line.slice(6).trim();
            if (json === '[DONE]') {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(json);
              const c = parsed.choices?.[0]?.delta?.content;
              if (c) {
                acc += c;
                setMessages((prev) =>
                  prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: acc } : m,
                  ),
                );
              }
            } catch {
              buffer = line + '\n' + buffer;
              break;
            }
          }
        }

        setStatus('idle');
        abortRef.current = null;
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        const msg =
          e?.message?.includes('Failed to fetch')
            ? 'Network error. Check your connection and retry.'
            : e?.message || 'Something went wrong.';
        setErrorMsg(msg);
        setStatus('error');
        abortRef.current = null;
      }
    },
    [messages],
  );

  const retry = () => {
    if (!lastUserRef.current) return;
    // Drop trailing empty/failed assistant placeholder if present
    setMessages((prev) => {
      const trimmed = [...prev];
      if (trimmed.length && trimmed[trimmed.length - 1].role === 'assistant' && !trimmed[trimmed.length - 1].content) {
        trimmed.pop();
      }
      return trimmed;
    });
    setErrorMsg(null);
    send(lastUserRef.current);
  };

  const clear = () => {
    stop();
    setMessages([GREETING]);
    setErrorMsg(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'connecting' || status === 'streaming') return;
    send(input);
  };

  const busy = status === 'connecting' || status === 'streaming';
  const statusLabel =
    status === 'connecting'
      ? 'Connecting…'
      : status === 'streaming'
        ? 'Typing…'
        : status === 'error'
          ? 'Error'
          : 'Online · streams live';

  return (
    <>
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(152_100%_50%/0.45)] hover:shadow-[0_0_35px_hsl(152_100%_50%/0.65)] transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        <span className="text-sm font-mono font-semibold hidden sm:inline">
          {open ? 'Close' : 'Ask AI'}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 w-[min(400px,calc(100vw-3rem))] h-[min(600px,calc(100vh-8rem))] flex flex-col bg-background/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="izumi.ai assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-card/60">
              <div className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    status === 'error' ? 'bg-destructive' : 'bg-primary animate-ping'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    status === 'error' ? 'bg-destructive' : 'bg-primary'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-semibold text-primary">izumi.ai</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
                  {statusLabel}
                </div>
              </div>
              <button
                onClick={clear}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-3 py-2 rounded-xl text-sm break-words ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm border border-border'
                    }`}
                  >
                    {m.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-background/60 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-strong:text-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content || '\u200B'}
                        </ReactMarkdown>
                        {status === 'streaming' && i === messages.length - 1 && (
                          <span className="inline-block w-1.5 h-3 ml-0.5 bg-primary animate-pulse align-middle" />
                        )}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    )}
                  </div>
                </div>
              ))}

              {status === 'connecting' && (
                <div className="flex justify-start">
                  <div className="bg-muted border border-border rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Thinking…</span>
                  </div>
                </div>
              )}

              {status === 'error' && errorMsg && (
                <div className="flex justify-start">
                  <div className="bg-destructive/10 border border-destructive/40 text-destructive rounded-xl px-3 py-2 text-sm max-w-[88%] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{errorMsg}</div>
                      <button
                        onClick={retry}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-mono underline hover:no-underline"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && status === 'idle' && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2 py-1 rounded-full border border-border hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-border bg-card/60 flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={busy ? 'Streaming reply…' : 'Ask about pentests, pricing…'}
                disabled={busy}
                className="flex-1 h-9 text-sm"
                aria-label="Message"
              />
              {busy ? (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={stop}
                  className="h-9 w-9 shrink-0"
                  title="Stop"
                  aria-label="Stop streaming"
                >
                  <X className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="h-9 w-9 shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
