import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import { client } from './graphql/client';
import Header from './components/Header';
import UserList from './pages/UserList';
import NotFoundPage from './pages/NotFoundPage';
import UserDetail from './pages/UserDetail/UserDetail';
import PostDetail from './pages/PostDetail';

class App extends Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Container text>
          <GlobalStyle />
          <Router>
            <>
              <Header />
              <Switch>
                <Route exact path="/" component={UserList} />
                <Route exact path="/user/:id" component={UserDetail} />
                <Route exact path="/user/:id/albums" component={UserDetail} />
                <Route exact path="/post/:id" component={PostDetail} />
                <Route component={NotFoundPage} />
              </Switch>
            </>
          </Router>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
