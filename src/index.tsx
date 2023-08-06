import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import store, { persistor } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './themeOptions';


const domain : string = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

axios.defaults.baseURL = `https://${audience}`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <ThemeProvider theme={createTheme(themeOptions)}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: `https://${audience}/`,
            scope: "read:current_user"
          }}
          >
            <App />
          </Auth0Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
