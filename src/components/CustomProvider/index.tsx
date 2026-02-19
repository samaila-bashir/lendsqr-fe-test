import { StrictMode, createElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import AppLoadingScreen from '@/components/AppLoadingScreen';
import Bootstrap from '@/components/Bootstrap';
import { UsersLoadGate } from '@/components/AppLoadingScreen/UsersLoadGate';
import AuthenticatedRedirect from '@/components/AuthenticatedRedirect';
import { store, persistor } from '@/store';
import { nest } from '@/utils/providerUtils';
import App from '@/App';

const wrappers: Parameters<typeof nest>[0] = [
  [StrictMode, {}],
  [Provider, { store }],
  [
    PersistGate,
    {
      loading: createElement(AppLoadingScreen, { progress: 0 }),
      persistor,
    },
  ],
  [Bootstrap, {}],
  [UsersLoadGate, {}],
  [BrowserRouter, {}],
  [AuthenticatedRedirect, {}],
];

function CustomProvider() {
  return nest(wrappers, createElement(App)) as React.ReactElement;
}

export default CustomProvider;
