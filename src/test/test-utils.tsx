import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, type RenderOptions } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import type { RootState } from '@/store';

const createMockStore = configureMockStore<RootState>([]);

export function createMockReduxStore(initialState?: Partial<RootState>) {
  return createMockStore(initialState as RootState);
}

function createWrapper(
  store: ReturnType<typeof createMockReduxStore>
): (props: { children: React.ReactNode }) => ReactElement {
  return function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

interface MockReduxRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof createMockReduxStore>;
}

export function renderWithMockRedux(
  ui: React.ReactElement,
  {
    preloadedState,
    store = createMockReduxStore(preloadedState),
    ...renderOptions
  }: MockReduxRenderOptions = {}
) {
  const Wrapper = createWrapper(store);
  return {
    store,
    getActions: () => store.getActions(),
    clearActions: () => store.clearActions(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// eslint-disable-next-line react-refresh/only-export-components -- test utils re-export RTL
export * from '@testing-library/react';
