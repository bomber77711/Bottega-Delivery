import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, X, Send, RotateCcw } from 'lucide-react';
import { regionData } from './regionData';
import { recipesData } from './recipesData';

export default function AskBottega({ onSelect }) {
  var _a = useState(''), query = _a[0], setQuery = _a[1];
  var _b = useState(false), focused = _b[0], setFocused = _b[1];
  var _c = useState([]), results = _c[0], setResults = _c[1];
  var _d = useState([]), chatMessages = _d[0], setChatMessages = _d[1];
  var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
  var _f = useState(false), showChat = _f[0], setShowChat = _f[1];
  var inputRef = useRef(null);
  var chatBodyRef = useRef(null);

  var suggestions = [
    'Best cheese for pasta?',
    'Traditional dishes from Tuscany',
    'What wine pairs with truffle?',
    'Tell me about Parmigiano Reggiano',
    'Seafood dishes from Sicily'
  ];

  useEffect(function() {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  var handleInput = function(val) {
    setQuery(val);
    if (showChat) return;
    if (!val) { setResults([]); return; }
    var q = val.toLowerCase();
    var regionMatches = Object.entries(regionData)
      .filter(function(entry) {
        var r = entry[1];
        return r.name.toLowerCase().includes(q) || r.featuredProducts.some(function(p) { return p.toLowerCase().includes(q); });
      })
      .slice(0, 3).map(function(entry) {
        return { type: 'Region', icon: 'ðºï¸', label: entry[1].name, sub: entry[1].featuredProducts.slice(0, 2).join(' Â· '), id: entry[0] };
      });
    var recipeMatches = (recipesData || [])
      .filter(function(r) { return r.name?.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q); })
      .slice(0, 2).map(function(r) { return { type: 'Recipe', icon: 'ð', label: r.name, sub: r.regionName || '', id: r.id }; });
    var producerMatches = Object.values(regionData)
      .flatMap(function(r) { return r.producers || []; })
      .filter(function(p) { return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q); })
      .slice(0, 2).map(function(p) { return { type: 'Producer', icon: 'ð¨âð¾', label: p.name, sub: p.city + ' Â· ' + p.category }; });
    setResults([].concat(regionMatches, recipeMatches, producerMatches));
  };

  var handleAskAI = async function(customQuery) {
    var msg = (customQuery || query).trim();
    if (!msg || isLoading) return;
    setQuery('');
    setResults([]);
    setShowChat(true);
    setChatMessages(function(prev) { return prev.concat([{ role: 'user', content: msg }]); });
    setIsLoading(true);

    try {
      var history = chatMessages.map(function(m) { return { role: m.role, content: m.content }; });
      var res = await fetch('/api/ask-bottega', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: history })
      });
      var data = await res.json();
      if (data.reply) {
        setChatMessages(function(prev) { return prev.concat([{ role: 'assistant', content: data.reply }]); });
      } else {
        setChatMessages(function(prev) { return prev.concat([{ role: 'assistant', content: 'Mi dispiace, something went wrong. Try again?' }]); });
      }
    } catch (err) {
      setChatMessages(function(prev) { return prev.concat([{ role: 'assistant', content: 'Connection error â please try again.' }]); });
    } finally {
      setIsLoading(false);
    }
  };

  var handleKeyDown = function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) handleAskAI();
    }
    if (e.key === 'Escape' && showChat) {
      setShowChat(false);
    }
  };

  var handleClose = function() {
    setShowChat(false);
    setChatMessages([]);
    setQuery('');
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>

      {/* ââ Search Input ââ */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        borderRadius: showChat ? '16px 16px 0 0' : 100,
        background: showChat ? 'rgba(6,13,6,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        border: showChat
          ? '1px solid rgba(76,175,80,0.4)'
          : ('2px solid ' + (focused ? '#4CAF50' : 'rgba(200,200,200,0.5)')),
        borderBottom: showChat ? '1px solid rgba(76,175,80,0.15)' : undefined,
        boxShadow: showChat
          ? '0 -4px 24px rgba(0,0,0,0.3)'
          : (focused ? '0 0 0 4px rgba(76,175,80,0.2), 0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(0,0,0,0.25)'),
        transition: 'all 0.25s ease'
      }}>
        {showChat
          ? <Sparkles size={14} color="#4CAF50" />
          : <Search size={13} color="#999" />
        }
        <input
          ref={inputRef}
          value={query}
          onChange={function(e) { handleInput(e.target.value); }}
          onFocus={function() { setFocused(true); }}
          onBlur={function() { if (!showChat) setTimeout(function() { setFocused(false); }, 150); }}
          onKeyDown={handleKeyDown}
          placeholder={showChat ? "Ask a follow-upâ¦" : "Ask Bottega about Italian foodâ¦"}
          style={{
            border: 'none', outline: 'none', fontSize: 13, flex: 1,
            fontFamily: "'DM Sans',sans-serif", background: 'transparent',
            color: showChat ? '#fff' : '#1A1A1A',
            caretColor: '#4CAF50'
          }}
        />
        {showChat ? (
          <button onClick={function() { if (query.trim()) handleAskAI(); }} style={{
            background: query.trim() ? '#4CAF50' : 'rgba(76,175,80,0.2)',
            border: 'none', borderRadius: 8, padding: '5px 8px', cursor: query.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', transition: 'all 0.15s'
          }}>
            <Send size={12} color={query.trim() ? '#fff' : 'rgba(255,255,255,0.3)'} />
          </button>
        ) : (
          <Sparkles size={13} color="#4CAF50" />
        )}
      </div>

      {/* ââ Local Search Results (when NOT in chat mode) ââ */}
      {!showChat && focused && (results.length > 0 || !query) && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, zIndex: 300,
          background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16,
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)', overflow: 'hidden'
        }}>
          {!query && (
            <>
              <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#aaa', textTransform: 'uppercase' }}>Try asking</div>
              {suggestions.map(function(s, i) {
                return (
                  <button key={i} onClick={function() { handleAskAI(s); }}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#555', transition: 'all 0.1s' }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = '#F0F7EE'; e.currentTarget.style.color = '#2E7D32'; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#555'; }}>
                    â¦ {s}
                  </button>
                );
              })}
              <div style={{ borderTop: '1px solid #f0f0f0', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={10} color="#4CAF50" />
                <span style={{ fontSize: 10, color: '#aaa' }}>Powered by Claude AI Â· Press Enter to ask</span>
              </div>
            </>
          )}
          {results.map(function(r, i) {
            return (
              <button key={i} onClick={function() { onSelect && onSelect(r); setQuery(''); setResults([]); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s' }}
                onMouseEnter={function(e) { e.currentTarget.style.background = '#F0F7EE'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = 'none'; }}>
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 1 }}>{r.label}</p>
                  <p style={{ fontSize: 11, color: '#999' }}>{r.sub}</p>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', borderRadius: 100, padding: '2px 8px' }}>{r.type}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ââ AI Chat Panel ââ */}
      {showChat && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 300,
          background: 'rgba(6,13,6,0.95)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(76,175,80,0.3)', borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          maxHeight: 360, display: 'flex', flexDirection: 'column'
        }}>

          {/* Chat header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 14px',
            borderBottom: '1px solid rgba(76,175,80,0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 0 6px rgba(76,175,80,0.8)' }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(76,175,80,0.7)', textTransform: 'uppercase' }}>Bottega AI</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={function() { setChatMessages([]); }} title="New chat"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', opacity: 0.5 }}
                onMouseEnter={function(e) { e.currentTarget.style.opacity = 1; }}
                onMouseLeave={function(e) { e.currentTarget.style.opacity = 0.5; }}>
                <RotateCcw size={11} color="#fff" />
              </button>
              <button onClick={handleClose} title="Close"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', opacity: 0.5 }}
                onMouseEnter={function(e) { e.currentTarget.style.opacity = 1; }}
                onMouseLeave={function(e) { e.currentTarget.style.opacity = 0.5; }}>
                <X size={12} color="#fff" />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div ref={chatBodyRef} style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chatMessages.map(function(msg, i) {
              var isUser = msg.role === 'user';
              return (
                <div key={i} style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  padding: '8px 12px',
                  borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: isUser ? 'rgba(76,175,80,0.25)' : 'rgba(255,255,255,0.08)',
                  border: isUser ? '1px solid rgba(76,175,80,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: isUser ? '#C8E6C9' : 'rgba(255,255,255,0.88)',
                  fontFamily: "'DM Sans',sans-serif",
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {msg.content}
                </div>
              );
            })}

            {/* Loading animation */}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start', maxWidth: '88%',
                padding: '10px 16px',
                borderRadius: '12px 12px 12px 2px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span style={{ display: 'inline-flex', gap: 3 }}>
                  {[0, 1, 2].map(function(dot) {
                    return (
                      <span key={dot} style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#4CAF50',
                        animation: 'bottegaPulse 1.2s ease-in-out infinite',
                        animationDelay: (dot * 0.15) + 's'
                      }} />
                    );
                  })}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Mono',monospace" }}>thinkingâ¦</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '5px 14px 6px',
            borderTop: '1px solid rgba(76,175,80,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
          }}>
            <Sparkles size={8} color="rgba(76,175,80,0.5)" />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono',monospace" }}>Powered by Claude</span>
          </div>
        </div>
      )}

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes bottegaPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
