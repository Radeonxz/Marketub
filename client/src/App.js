import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import UsersList from './components/UsersList';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    // console.log('1111111', store.getState());
    const token = store.getState().auth.token;
    if(token) {
      store.dispatch(loadUser());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            {/* <ItemModal/> */}
            {/* <ShoppingList/> */}
            <UsersList/>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
