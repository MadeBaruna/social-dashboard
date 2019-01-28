import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class App extends Component {
  public render() {
    return (
      <Container text>
        <GlobalStyle />
        <Router>
          <Header />
        </Router>
      </Container>
    );
  }
}

export default App;
