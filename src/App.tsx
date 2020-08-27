import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import GlobalStyles from './styles/globalStyles';
import { AppContainer } from './styles/appStyles';
import Sidebar from './components/Sidebar';
import { RootState } from './redux/reducers';
import base from './themes/base';
import { getTree } from './redux/app/actions';
import history from './services/history';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  getTree: Function;
}

const App: React.FC<IProps> = ({ getTree }) => {
  React.useEffect(() => {
    getTree();
  }, [getTree]);

  return (
    <ThemeProvider theme={base}>
      <AppContainer>
        <GlobalStyles />
        <Sidebar />
        <Router history={history}>
          <Routes />
          <ToastContainer />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, any, any>) => ({
  getTree: async () => dispatch(getTree()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
