# PMM App - Grafana Plugin

> AI agent documentation for PMM App development

## What This Is

PMM App is a Grafana App Plugin that provides database monitoring and query analytics for MySQL, MongoDB, and PostgreSQL.

**Plugin Type**: Grafana App Plugin
**Plugin ID**: `pmm-app`
**Primary Language**: TypeScript + React 18
**Grafana Version**: 11.x.x

## Project Structure

```
pmm-app/
├── src/
│   ├── pmm-qan/              # Query Analytics panel (main feature)
│   │   ├── panel/            # Panel component (see panel/AGENTS.md)
│   │   │   ├── QueryAnalytics.tsx
│   │   │   ├── components/   # UI components
│   │   │   └── provider/     # Context providers
│   │   └── plugin.json
│   ├── shared/               # Shared utilities and components
│   │   ├── components/       # Reusable React components
│   │   ├── core/             # Core utilities (theme, API)
│   │   ├── global-styles/    # SCSS/LESS styles
│   │   └── assets/           # Static assets
│   ├── module.ts             # Plugin entry point
│   └── plugin.json           # Plugin metadata
├── dist/                     # Build output (git-ignored, mounted in docker)
├── .config/                  # Build configuration
│   ├── webpack/
│   └── jest.config.js
└── docker-compose.yaml       # Development environment
```

## Technology Stack

```json
{
  "core": {
    "react": "18.2.0",
    "typescript": "4.8.4",
    "webpack": "5.94.0"
  },
  "grafana": {
    "@grafana/data": "^11.6.3",
    "@grafana/ui": "^11.6.3",
    "@grafana/runtime": "^11.6.3"
  },
  "ui": {
    "antd": "^5.19.2",
    "@emotion/css": "11.10.6",
    "react-router-dom": "^6.22.0",
    "final-form": "^4.20.2",
    "chart.js": "^3.7.0"
  },
  "build": {
    "@swc/core": "^1.3.90",
    "swc-loader": "^0.2.3",
    "jest": "^29.5.0"
  }
}
```

## Development Commands

```bash
# Install dependencies
yarn install --frozen-lockfile

# Development mode (hot reload)
yarn dev

# Production build
yarn build

# Testing
yarn test          # Watch mode
yarn test:ci       # CI mode (all tests)
yarn jest path/to/file.test.tsx  # Specific test

# Code quality
yarn typecheck     # Type checking
yarn lint:dev      # Lint with auto-fix
yarn lint:check    # Lint check only
```

## Code Style Rules

### TypeScript - NEVER Use 'any'

```typescript
// ✅ CORRECT: Always provide types
interface User {
  id: string;
  name: string;
}

const getUser = (id: string): Promise<User> => {
  return api.fetch(`/users/${id}`);
};

// ❌ WRONG: Never use 'any'
const getUser = (id: any): any => {  // FORBIDDEN!
  return api.fetch(`/users/${id}`);
};
```

### Import Rules - Always Absolute from src/

```typescript
// ✅ CORRECT: Absolute imports from src/
import { Button } from 'shared/components/Elements/Button';
import { useTheme } from 'shared/core/theme';
import { QueryAnalytics } from 'pmm-qan/panel/QueryAnalytics';

// ❌ WRONG: Relative imports
import { Button } from '../../../shared/components/Elements/Button';
```

### Formatting Rules

```typescript
// Single quotes (not double)
const name = 'John'; // ✅
const name = "John"; // ❌

// Blank lines before returns
const calculate = () => {
  const result = 10 + 20;
  const doubled = result * 2;

  return doubled; // ✅ Blank line before return
};

// Blank lines after imports
import React from 'react';
import { Button } from 'antd';

export const MyComponent = () => { // ✅ Blank line after imports
  // ...
};

// Max line length: 110 characters (strings/regex excluded)
```

### Naming Conventions

```typescript
// Component files: PascalCase.tsx
QueryAnalytics.tsx
UserProfile.tsx

// Non-component files: camelCase.ts
userUtils.ts
apiClient.ts

// Style files
ComponentName.styles.ts  // emotion/css
component-name.scss      // SCSS

// Test files
ComponentName.test.tsx
utils.test.ts

// Constants
CONSTANT_VALUE
MAX_RETRIES

// Snake_case allowed for API data
const { user_id, created_at } = apiResponse;
```

## Grafana Plugin Patterns

### Standard Panel Component

```typescript
import React from 'react';
import { PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';

interface MyPanelOptions {
  showLegend: boolean;
  displayMode: 'table' | 'chart';
}

export const MyPanel: React.FC<PanelProps<MyPanelOptions>> = ({
  data,      // Time series data from Grafana
  width,     // Panel width
  height,    // Panel height
  options,   // Panel configuration options
  timeRange, // Current time range
}) => {
  const theme = useTheme2();

  return (
    <div style={{ width, height }}>
      {/* Panel content */}
    </div>
  );
};
```

### Theme Integration

```typescript
import { useTheme2 } from '@grafana/ui';
import { css } from '@emotion/css';

export const ThemedComponent = () => {
  const theme = useTheme2(); // Get current Grafana theme

  const styles = {
    container: css`
      background: ${theme.colors.background.primary};
      color: ${theme.colors.text.primary};
      border: 1px solid ${theme.colors.border.weak};
      padding: ${theme.spacing(2)};
    `,
  };

  return <div className={styles.container}>Content</div>;
};
```

### Ant Design Theme Configuration

```typescript
import { ConfigProvider } from 'antd';
import { useTheme2 } from '@grafana/ui';
import { getAntdTheme } from 'shared/core/theme/getAntdTheme';

export const App = () => {
  const theme = useTheme2();
  const antdTheme = getAntdTheme(theme); // Convert Grafana → Ant Design theme

  return (
    <ConfigProvider theme={antdTheme}>
      {/* All Ant Design components inherit this theme */}
      <Button type="primary">Click Me</Button>
    </ConfigProvider>
  );
};
```

## State Management - Context API Only

**Important**: This project uses Context API. Do NOT use Redux or other external state libraries.

### Creating a Context Provider

```typescript
import React, { createContext, useContext, useState } from 'react';

interface AppState {
  user: User | null;
  isLoading: boolean;
}

interface AppContextType extends AppState {
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ user, isLoading, setUser, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook for consuming context
export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};

// Usage in component
const MyComponent = () => {
  const { user, setUser } = useApp();

  return <div>{user?.name}</div>;
};
```

## API Integration Pattern

```typescript
import { getBackendSrv } from '@grafana/runtime';

// API client pattern
class PMMApiClient {
  private baseUrl = '/api/plugins/pmm-app/resources';

  async get<T>(endpoint: string): Promise<T> {
    const response = await getBackendSrv().get(`${this.baseUrl}${endpoint}`);

    return response;
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await getBackendSrv().post(`${this.baseUrl}${endpoint}`, data);

    return response;
  }
}

export const api = new PMMApiClient();

// Usage
interface QueryData {
  query_id: string;
  query_text: string;
  execution_time: number;
}

const fetchQueries = async (): Promise<QueryData[]> => {
  const data = await api.post<{ queries: QueryData[] }>('/v1/qan/GetQueries', {
    filters: {},
    limit: 100,
  });

  return data.queries;
};
```

## Testing Patterns

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  // Simple render test
  it('should render correctly', () => {
    render(<MyComponent />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  // User interaction test
  it('should handle button click', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<MyComponent onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  // Async test
  it('should load data', async () => {
    render(<MyComponent />);

    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
  });

  // Snapshot test
  it('should match snapshot', () => {
    const { container } = render(<MyComponent />);

    expect(container).toMatchSnapshot();
  });
});
```

## Common Patterns

### Form with Final Form

```typescript
import { Form, Field } from 'react-final-form';
import { Button, Input } from 'antd';

interface FormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const onSubmit = async (values: FormValues) => {
    await api.login(values);
  };

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field<string> name="username">
            {({ input }) => <Input {...input} placeholder="Username" />}
          </Field>

          <Field<string> name="password">
            {({ input }) => <Input.Password {...input} placeholder="Password" />}
          </Field>

          <Button type="primary" htmlType="submit" loading={submitting}>
            Login
          </Button>
        </form>
      )}
    />
  );
};
```

### Router Navigation

```typescript
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
```

### Chart Integration

```typescript
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const MyChart = ({ data }: { data: number[] }) => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};
```

## Build Configuration

### TypeScript Config Key Points
- `baseUrl: ./src` - enables absolute imports
- `noImplicitAny: false` - but avoid `any` per style guide
- `noUnusedLocals: true` and `noUnusedParameters: true`

### Webpack
- Uses **SWC** for fast TypeScript compilation (not Babel)
- Webpack 5 with caching enabled
- Live reload plugin for development
- Externals: React, Grafana SDK, lodash, moment (provided by Grafana)

### Jest
- Uses `@swc/jest` for fast test execution
- Timezone: GMT (for consistent snapshots)
- Coverage from `**/*.{ts,tsx}` (excluding styles, constants)

## Development Environment

### Docker Setup

```bash
# Start full environment (PMM server + databases + test load)
docker-compose up -d

# Start minimal environment (just PMM server)
docker-compose up -d pmm-server

# Access Grafana at http://localhost:80
# Credentials: admin / admin
```

The `./dist` folder is mounted to `/srv/grafana/plugins/pmm-app/dist` in the container for hot reload.

### Environment Variables
- `PMM_DEBUG=1` - Enable debug mode (set in docker-compose)

## Plugin Registration

Plugin is registered in `plugin.json` as:
- Type: `app`
- Includes custom panel: `pmm-qan-app-panel`
- Includes dashboards from JSON files
- Integration with PMM backend services

## Troubleshooting

### Types not found after installing dependencies
```bash
# Restart TypeScript server in IDE or run:
yarn typecheck
```

### Hot reload not working
```bash
# Check if dist folder is mounted
docker exec pmm-server ls /srv/grafana/plugins/pmm-app/dist

# Restart webpack dev server
yarn dev
```

### Tests failing with timezone errors
```bash
# Tests run in GMT (configured in jest.config.js)
import MockDate from 'mockdate';
MockDate.set('2024-01-01T00:00:00Z');
```

### ESLint errors about imports
```bash
# Use absolute imports from src/
# Correct:   import { X } from 'shared/components/X'
# Incorrect: import { X } from '../../../shared/components/X'
```

## Do's and Don'ts

### ✅ DO
- Use TypeScript types for everything
- Use absolute imports from `src/`
- Use single quotes for strings
- Add blank lines before returns
- Use `useTheme2()` for theme-aware styling
- Use Context API for state management
- Test with `@testing-library/react`
- Follow 110 character line limit
- Use `const` over `let`, never `var`

### ❌ DON'T
- Use `any` type
- Use inline styles
- Use double quotes
- Use relative imports (`../../../`)
- Add inline comments
- Exceed line length limit (except strings/regex)
- Use Redux or external state management
- Skip type definitions
- Use `var` keyword

## Questions to Ask Before Coding

1. What Grafana SDK APIs do I need?
2. Is this component theme-aware? (Use `useTheme2()`)
3. Do I need state management? (Use Context API)
4. Are all imports absolute from `src/`?
5. Have I defined all TypeScript types? (No `any`)
6. Does this follow the style guide?
7. Have I added tests?
8. Is this compatible with Grafana 11.x.x?

## Related Documentation

- Root: `/AGENTS.md` - General project info
- Component: `src/pmm-qan/panel/AGENTS.md` - QAN panel specifics
- Style Guide: `CODE-STYLE.md` - AirBnB-based rules
- Contributing: `../CONTRIBUTING.md`

## Key Files Reference

```
src/module.ts                           # Plugin entry point
src/plugin.json                         # Plugin metadata
src/pmm-qan/panel/QueryAnalytics.tsx   # Main QAN component
src/shared/core/theme/getAntdTheme.ts  # Theme configuration
src/shared/components/                  # Reusable components
src/shared/global-styles/              # Global styles
```

---

**Last Updated**: 2025-01-25
**Grafana Version**: 11.x.x
**Plugin Version**: 2.32.0
