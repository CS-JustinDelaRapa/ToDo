import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import DateNavigator from './components/DateNavigator';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import TabBar from './components/TabBar';
import SquareContainer from './components/SquareContainer';
import theme from './theme';
import ActionsRow from './components/ActionsRow';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Container
            maxWidth={false}
            disableGutters
            sx={{
              minHeight: '100vh',
              backgroundColor: '#242424',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/otis-redding.png")',
              backgroundSize: 'fill',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
          <SquareContainer>
            <div style={{ width: '100%' }}>
              <TabBar />
              <DateNavigator />
              <ActionsRow />
              <TaskList />
            </div>
          </SquareContainer>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
 