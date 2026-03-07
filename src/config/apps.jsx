import { Folder, SquareTerminal, FileText, Mail } from 'lucide-react';

const APP_REGISTRY = {
  projects: {
    id: 'projects',
    name: 'Projects',
    icon: <Folder size="1em" color="#f6c253" fill="#f6c253" fillOpacity={0.3} strokeWidth={1.5} />,
    defaultWidth: 750,
    defaultHeight: 500,
    defaultX: 120,
    defaultY: 80,
    minWidth: 400,
    minHeight: 300,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: <SquareTerminal size="1em" color="#3daee9" fill="#3daee9" fillOpacity={0.2} strokeWidth={1.5} />,
    defaultWidth: 680,
    defaultHeight: 420,
    defaultX: 200,
    defaultY: 120,
    minWidth: 400,
    minHeight: 250,
  },
  resume: {
    id: 'resume',
    name: 'Resume',
    icon: <FileText size="1em" color="#95a5a6" fill="#95a5a6" fillOpacity={0.2} strokeWidth={1.5} />,
    defaultWidth: 700,
    defaultHeight: 520,
    defaultX: 160,
    defaultY: 60,
    minWidth: 400,
    minHeight: 350,
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    icon: <Mail size="1em" color="#e74c3c" fill="#e74c3c" fillOpacity={0.2} strokeWidth={1.5} />,
    defaultWidth: 500,
    defaultHeight: 450,
    defaultX: 280,
    defaultY: 100,
    minWidth: 350,
    minHeight: 300,
  },
};

export default APP_REGISTRY;
