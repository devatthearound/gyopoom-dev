import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/global-styles';
import { theme } from '@styles/theme';
import App from './App';
import { ErrorHandlerProvider } from "@context/ErrorHandleContext";
import './axios.config'
import { AuthProvider } from "@context/AuthContext";
import ChatProvider from '@context/ChatContext';
import MainSocket from '@components/MainSocket';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <MainSocket>
              <ErrorHandlerProvider>
                <App />
              </ErrorHandlerProvider>
            </MainSocket>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);