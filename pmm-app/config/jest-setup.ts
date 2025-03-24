import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';
import 'jest-canvas-mock';


// Missing in jsdom 
Object.assign(global, { TextDecoder, TextEncoder });