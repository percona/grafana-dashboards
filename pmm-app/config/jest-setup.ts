import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { TextEncoder, TextDecoder } from 'util';
import 'jest-canvas-mock';

configure({ adapter: new Adapter() });

// Missing in jsdom 
Object.assign(global, { TextDecoder, TextEncoder });