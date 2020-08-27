import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Editor from '../pages/Editor';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => null} />
      <Route exact path="/editor" component={Editor} />
    </Switch>
  );
};

export default Routes;
