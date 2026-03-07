import { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: () => [
    '  Available commands:',
    '  ─────────────────────────────',
    '  help       Show this help message',
    '  about      About me',
    '  skills     My technical skills',
    '  projects   My projects',
    '  contact    Contact information',
    '  socials    Social media links',
    '  clear      Clear terminal',
    '  neofetch   System information',
    '',
  ],
  about: () => [
    '  ┌──────────────────────────────────────────────────┐',
    '  │  I am a B.Tech Computer Science and Engineering  │',
    '  │  (AI & Data Science) student at Graphic Era      │',
    '  │  Deemed to be University, Dehradun, currently    │',
    '  │  in my 4th semester with a CGPA of 9.0. I work   │',
    '  │  with C, C++, Python, and Java, and I am         │',
    '  │  currently learning full-stack development with  │',
    '  │  HTML, CSS, JavaScript, React, and Node.js.      │',
    '  │                                                  │',
    '  │  I also use modern development tools such as Git,│',
    '  │  GitHub, GitLab, Docker, Kubernetes, and Vercel. │',
    '  │  Alongside this, I am exploring the fundamentals │',
    '  │  of Blockchain technology and continuously       │',
    '  │  building projects to strengthen my practical    │',
    '  │  development skills.                             │',
    '  │                                                  │',
    '  │  Fun fact: When I’m not coding, you’ll probably  │',
    '  │  find me riding bikes, playing guitar, or trying │',
    '  │  to solve complex problems late at night —       │',
    '  │  because app  arently bugs are more cooperative  │',
    '  │  after midnight.                                 │',
    '  └──────────────────────────────────────────────────┘',   
    '',
  ],
  skills: () => [
    '  ╔══════════════════════════════════════════════════╗',
    '  ║    Tech Stack:                                   ║',
    '  ╠══════════════════════════════════════════════════╣',
    '  ║  Java • Python • HTML5 • CSS3 • JavaScript       ║',
    '  ║  C • C++ • Notion                                ║',
    '  ╚══════════════════════════════════════════════════╝',
    '',
  ],
  projects: () => [
    '  ● QooR         — Minimal QR code generator (Java)',
    '  ● WellCheck    — Mental health assessment platform (In development)',
    '  ● Snake Game   — Classic Snake game in C (Raylib)',
    '  ● Sudoku Solver— C based Sudoku solving algorithm',
    '  ● MananOS      — This portfolio! (React)',
    '',
  ],
  contact: () => [
    '  How to reach me:',
    '  Feel free to email me at \"manan.ghumman19@gmail.com\".',
    '',
  ],
  socials: () => [
    '  Socials:',
    'Linkedin: linkedin.com/in/manan-ghumman',
    'Github: github.com/manan-ghumman',
    'Instagram: manan_ghumman',
    '',
  ],
  neofetch: () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return [
'        ███╗   ███╗          manan@MananOS',
'        ████╗ ████║          ─────────────────',
'        ██╔████╔██║          OS: MananOS v1.0',
'        ██║╚██╔╝██║          Host: Browser',
'        ██║ ╚═╝ ██║          Kernel: React 19',
'        ██║     ██║          Shell: manan-sh',
`        ██║     ██║          Resolution: ${w}x${h}`,
'        ██║     ██║          DE: KDE Plasma (simulated)',
'        ██║     ██║          Theme: Breeze Dark',
'        ╚═╝     ╚═╝          Terminal: MananOS Terminal',
'                            Uptime: since you opened this tab',
''
];
  },
};

const WELCOME = [
  '  ┌──────────────────────────────────────┐',
  '  │  Welcome to MananOS Terminal v1.0    │',
  '  │  Type "help" for available commands  │',
  '  └──────────────────────────────────────┘',
  '',
];

export default function Terminal() {
  const [history, setHistory] = useState([...WELCOME]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines = [`  manan@MananOS:~$ ${input}`];

    if (cmd === '') {
      // empty
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      setCmdHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);
      return;
    } else if (COMMANDS[cmd]) {
      newLines.push(...COMMANDS[cmd]());
    } else {
      newLines.push(`  Command not found: ${cmd}. Type "help" for commands.`, '');
    }

    setHistory((prev) => [...prev, ...newLines]);
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx =
        historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(newIdx);
      setInput(cmdHistory[cmdHistory.length - 1 - newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = historyIdx > 0 ? historyIdx - 1 : -1;
      setHistoryIdx(newIdx);
      setInput(
        newIdx >= 0 ? cmdHistory[cmdHistory.length - 1 - newIdx] || '' : ''
      );
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
        fontSize: '12.5px',
        color: '#a8e6cf',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0d1117',
        margin: '-20px',
        padding: '14px',
        lineHeight: 1.6,
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {history.map((line, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', minHeight: '18px' }}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
      >
        <span style={{ color: '#3daee9', fontWeight: 600 }}>
          manan@MananOS:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#a8e6cf',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            flex: 1,
            caretColor: '#3daee9',
          }}
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
