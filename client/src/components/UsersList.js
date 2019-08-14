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
  state = {
    collapse: false
  }

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
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // toggle = () => {
  //   this.setState(state => ({ collapse: !state.collapse }));
  // };

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
                    // <Button onClick={this.onFetchUserClick.bind(this, username)}>
                    //   <UserProjectsListModal user_projects={this.props.user.user.projects_array}/>
                    // </Button>
                    <Button color="primary" onClick={this.onFetchUserClick.bind(this, username)} style={{ marginBottom: '1rem' }}>
                      Toggle
                    </Button>
                    <Collapse isOpen={this.state.collapse}>
                      {user_projects.map(({ project_id, name }) => (
                        <Col lg='12' md='12' sm='12' key={ project_id }>
                          <Card className='user-projects-list-card'>
                            <CardBody>
                              <Row>
                                <Col sm='8'>
                                  <img width='80%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
                                </Col>
                                <Col sm='4'>
                                  <CardTitle className='allusers-card-title'><strong>Project name: {name}</strong></CardTitle>
                                  <CardText className='allusers-card-text'>Desc: {description}</CardText>
                                  <CardText className='allusers-card-text'>Site Link: {site_link}</CardText>
                                  <CardText className='allusers-card-text'>Github: {github_link}</CardText>
                                  <CardText className='allusers-card-text'>Skill Sets: {skill_sets}</CardText>
                                  <CardText className='allusers-card-text'>Timestamp: {timestamp}</CardText>
                                  <CardText className='allusers-card-text'>Likes: {likes}</CardText>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Collapse>
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