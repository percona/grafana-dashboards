import React from 'react';
import { Messages } from './ParseError.messages';

const ParseError: React.FC = () => <pre data-testid="example-query-invalid">{Messages.parsingFailed}</pre>;

export default ParseError;
