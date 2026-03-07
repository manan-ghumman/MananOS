import { useState } from 'react';
import { playSound } from '../utils/sound';

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { label: 'GitHub', icon: '🐙', url: 'https://github.com/manan-ghumman', color: '#e0e2ec' },
    { label: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/manan-ghumman', color: '#0a66c2' },
    { label: 'Email', icon: '📧', url: 'mailto:manan.ghumman19@gmail.com', color: '#3daee9' },
  ];

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#d0d3e0',
    fontSize: '13px',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ color: '#d0d3e0' }}>
      <h2
        style={{
          margin: '0 0 6px 0',
          fontSize: '18px',
          fontWeight: 600,
          color: '#e0e2ec',
        }}
      >
        Get in Touch
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#6b7080' }}>
        Feel free to reach out — I'd love to connect!
      </p>

      {/* Social Links */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('close.mp3')}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background:
                hoveredLink === link.label
                  ? 'rgba(61, 174, 233, 0.12)'
                  : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#d0d3e0',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              transform: hoveredLink === link.label ? 'translateY(-1px)' : 'none',
            }}
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>

      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          margin: '0 0 20px 0',
        }}
      />

      {/* Contact Form */}
      <form action="https://formspree.io/f/xnjgnnrp" method="POST">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#8b90a0',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(61, 174, 233, 0.4)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(255,255,255,0.08)')
              }
            />
          </div>
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#8b90a0',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(61, 174, 233, 0.4)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(255,255,255,0.08)')
              }
            />
          </div>
          <div>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#8b90a0',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What's on your mind?"
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(61, 174, 233, 0.4)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(255,255,255,0.08)')
              }
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '7px',
              border: 'none',
              background: 'linear-gradient(135deg, #3daee9, #2980b9)',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(61, 174, 233, 0.25)',
              alignSelf: 'flex-start',
            }}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
