import { Folder, SquareTerminal, FileText, Mail } from 'lucide-react';

export const DESKTOP_ICONS = [
  { id: 'projects', name: 'Projects', icon: <Folder size="1em" color="#f6c253" fill="#f6c253" fillOpacity={0.3} strokeWidth={1.5} />, appId: 'projects' },
  { id: 'terminal', name: 'Terminal', icon: <SquareTerminal size="1em" color="#3daee9" fill="#3daee9" fillOpacity={0.2} strokeWidth={1.5} />, appId: 'terminal' },
  { id: 'resume', name: 'Resume', icon: <FileText size="1em" color="#95a5a6" fill="#95a5a6" fillOpacity={0.2} strokeWidth={1.5} />, appId: 'resume' },
  { id: 'contact', name: 'Contact', icon: <Mail size="1em" color="#e74c3c" fill="#e74c3c" fillOpacity={0.2} strokeWidth={1.5} />, appId: 'contact' },
];

export const LAUNCHER_CATEGORIES = [
  {
    label: 'Applications',
    apps: ['projects', 'terminal', 'resume', 'contact'],
  },
];
