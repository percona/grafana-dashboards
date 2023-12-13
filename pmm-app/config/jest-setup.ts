import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-canvas-mock';

configure({ adapter: new Adapter() });
