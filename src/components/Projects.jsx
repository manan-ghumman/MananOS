import { useState } from 'react';
import { playSound } from '../utils/sound';

const PROJECTS = [
    {
      name: 'MananOS',
      description: 'This portfolio itself! A desktop environment built with React.',
      tags: ['React', 'Vite', 'CSS'],
      link: 'https://github.com/manan-ghumman/MananOS',
      color: '#9b59b6',
    },
  {
    name: 'QooR',
    description: 'Minimal QR code generator with a clean, modern UI. Built with Java and JavaFX.',
    tags: ['Java', 'JavaFX', 'Desktop App'],
    link: 'https://github.com/manan-ghumman/QooR',
    color: '#3daee9',
  },
  {
    name: 'WellCheck (In development)',
    description: 'Mental health assessment platform with PHQ-9, GAD-7, and PSS questionnaires.',
    tags: ['React', 'C++', 'SQLite'],
    link: 'https://github.com/manan-ghumman/WellCheck',
    color: '#27ae60',
  },
  {
    name: 'Snake Game',
    description: 'Classic Snake Game built in C using the Raylib library.',
    tags: ['C', 'Raylib'],
    link: 'https://github.com/manan-ghumman/SnakeGame-C-Raylib',
    color: '#e74c3c',
  },
  {
    name: 'Sudoku Solver',
    description: 'A Sudoku solver implemented in C.',
    tags: ['C', 'Algorithm'],
    link: 'https://github.com/manan-ghumman/SudokuSolver-C',
    color: '#f1c40f',
  },
];

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  return (
    <div>
      <h2
        style={{
          margin: '0 0 6px 0',
          fontSize: '18px',
          fontWeight: 600,
          color: '#e0e2ec',
        }}
      >
        My Projects
      </h2>
      <p
        style={{
          margin: '0 0 20px 0',
          fontSize: '13px',
          color: '#6b7080',
        }}
      >
        A collection of things I've built
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(-1)}
            onClick={() => {
              playSound('close.mp3');
              if (proj.link && proj.link !== '#') window.open(proj.link, '_blank');
            }}
            style={{
              background:
                hoveredIdx === i
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(255,255,255,0.03)',
              borderRadius: '10px',
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: hoveredIdx === i ? 'translateY(-2px)' : 'none',
              boxShadow:
                hoveredIdx === i
                  ? '0 8px 24px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: proj.color,
                  boxShadow: `0 0 8px ${proj.color}60`,
                }}
              />
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#e0e2ec',
                }}
              >
                {proj.name}
              </span>
            </div>

            <p
              style={{
                fontSize: '12.5px',
                color: '#8b90a0',
                lineHeight: 1.5,
                margin: '0 0 14px 0',
              }}
            >
              {proj.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 500,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: `${proj.color}18`,
                    color: proj.color,
                    border: `1px solid ${proj.color}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
