import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../../actions/userActions';
import PropTypes from 'prop-types';

import UserProjectsListCollapse from '../../components/UserProjectsListCollapse/UserProjectsListCollapse';

import './UsersList.css';

class UsersList extends Component {
  state = {
    collapse: false,
    user_projects: []
  };

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getUsers();
    // document.addEventListener('mousedown', this.onClickToCloseCollapse);
  }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.onClickToCloseCollapse);
  // }

  onFetchUserClick = username => {
    if (this.props.user.user_projects.length === 0) {
      this.props.getUser(username);
    }
    this.setState(state => ({ collapse: !state.collapse }));
  };

  onClickToCloseCollapse = () => {
    this.setState(state => ({ collapse: false }));
  };

  render() {
    const { users, user_projects } = this.props.user;
    const button_text = this.state.collapse ? 'Close' : 'Projects';
    return (
      <Container>
        <Row>
          {users.map(({ user_id, username }) => (
            // <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Col lg="3" md="4" sm="6" key={user_id}>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="5">
                      <img
                        width="100%"
                        src="https://randomuser.me/api/portraits/lego/2.jpg"
                        alt="Avatar"
                      />
                    </Col>
                    <Col sm="7">
                      <CardTitle className="allusers-card-title">
                        <strong>{username}</strong>
                      </CardTitle>
                      <CardText className="allusers-card-text">
                        Popularity: 199
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="users-list-card-btn"
                    color="primary"
                    onClick={this.onFetchUserClick.bind(this, username)}
                    style={{ marginBottom: '1rem' }}
                  >
                    {button_text}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
          <Col lg="12" md="12" sm="12">
            <UserProjectsListCollapse
              collapse={this.state.collapse}
              user_projects={user_projects}
            />
          </Col>
        </Row>
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
