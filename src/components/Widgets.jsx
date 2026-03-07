import { useState, useEffect } from 'react';

const QUOTES = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Any fool can write code that a computer can understand.', author: 'Martin Fowler' },
  { text: 'Programs must be written for people to read.', author: 'Hal Abelson' },
];

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="widget"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(18, 20, 32, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '14px',
        padding: '20px 24px',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        textAlign: 'right',
        minWidth: '180px',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          fontSize: '38px',
          fontWeight: 300,
          color: '#e0e2ec',
          letterSpacing: '2px',
          lineHeight: 1,
        }}
      >
        {hours}:{minutes}
        <span style={{ fontSize: '18px', color: '#6b7080', marginLeft: '4px' }}>
          {seconds}
        </span>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#6b7080',
          marginTop: '6px',
          fontWeight: 400,
        }}
      >
        {dateStr}
      </div>
    </div>
  );
}

export function QuoteWidget() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  if (!quote) return null;

  return (
    <div
      className="widget"
      style={{
        position: 'absolute',
        bottom: '90px',
        right: '20px',
        background: 'rgba(18, 20, 32, 0.65)',
        backdropFilter: 'blur(16px)',
        borderRadius: '12px',
        padding: '16px 20px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        maxWidth: '280px',
        userSelect: 'none',
      }}
    >
      <p
        style={{
          margin: '0 0 8px 0',
          fontSize: '12.5px',
          color: '#8b90a0',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}
      >
        "{quote.text}"
      </p>
      <p
        style={{
          margin: 0,
          fontSize: '11px',
          color: '#5a5f72',
          textAlign: 'right',
          fontWeight: 500,
        }}
      >
        — {quote.author}
      </p>
    </div>
  );
}
