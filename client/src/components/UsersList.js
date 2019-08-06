import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../actions/userActions';
import PropTypes from 'prop-types';

class UsersList extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getUsers();
    console.log('this.props is', this.props);
  }

  onDeleteClick = id => {
    this.props.getUser(id);
  }

  render() {
    // const { items } = this.props.item;
    const { users } = this.props.user;
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="users-list">
            {users.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                { this.props.isAuthenticated ? <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >&times;</Button> : null }
                  
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(
  mapStateToProps,
    { getUsers, getUser }
  )(UsersList);