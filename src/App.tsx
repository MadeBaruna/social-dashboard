import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header';
import UserList from './pages/UserList';
import { client } from './graphql/client';

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
              </Switch>
            </>
          </Router>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
