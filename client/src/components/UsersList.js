import React, { Component, Fragment } from 'react';
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
import { getUsers, getUser } from '../actions/userActions';
import UserProjectsListModal from './UserProjectsListModal/UserProjectsListModal';
import PropTypes from 'prop-types';

class UsersList extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getUsers();
    // console.log('this.props is', this.props);
  }

  onFetchUserClick = username => {
    this.props.getUser(username);
  }

  render() {
    // const { items } = this.props.item;
    const { users } = this.props.user;
    console.log('uuu this.props is', this.props);
    console.log('uuu this.users is', users);
    return(
      <Container>
        <Row>
          {users.map(({ user_id, username }) => (
            // <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Col lg='3' md='4' sm='6' key={user_id}>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm='5'>
                      <img width='100%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
                    </Col>
                    <Col sm='7'>
                      <CardTitle className='allusers-card-title'><strong>{username}</strong></CardTitle>
                      <CardText className='allusers-card-text'>Popularity: 199</CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className='text-center'>
                  {/* <Button
                    className='projects-btn'
                    color='info'
                    size='sm'
                    onClick={this.onFetchUserClick.bind(this, username)}
                  >More Projects</Button> */}
                  <Fragment>
                    <Button onClick={this.onFetchUserClick.bind(this, username)}>
                      <UserProjectsListModal user_projects={this.props.user.user.projects_array}/>
                    </Button>
                  </Fragment>
                </CardFooter>
              </Card>
            </Col>
          ))}
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