import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

// eslint-disable-next-line no-undef
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
