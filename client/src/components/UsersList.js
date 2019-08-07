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

  onFetchUserClick = id => {
    this.props.getUser(id);
  }

  render() {
    // const { items } = this.props.item;
    const { users } = this.props.user;
    return(
      <Container>
        <Row>
          {users.map(({ _id, name }) => (
            // <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Col lg='3' md='4' sm='6'>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm='5'>
                      <img width='100%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
                    </Col>
                    <Col sm='7'>
                      <CardTitle className='allusers-card-title'><strong>{name}</strong></CardTitle>
                      <CardText className='allusers-card-text'>Popularity: 199</CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className='text-center'>
                  <Button
                    className='projects-btn'
                    color='info'
                    size='sm'
                    onClick={this.onFetchUserClick.bind(this, _id)}
                  >More Projects</Button>
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