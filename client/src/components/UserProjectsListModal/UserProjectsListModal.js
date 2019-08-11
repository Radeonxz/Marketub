import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Col,
  Card,
  CardBody,
  Row,
  CardText,
  CardTitle,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';

import './UserProjectsListModal.css';

class UserProjectsListModal extends Component {
  state = {
    modal: false
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  toggle = () => {
    // Cealer errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { user_projects } = this.props;
    return(
      <Container>
        <Row>
        {/* <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink> */}
        <p onClick={this.toggle}>More Projects</p>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          contentClassName='user-projects-list-modal'
          centered='true'
          scrollable='true'
          size='xl'
        >
          {/* <ModalHeader toggle={this.toggle}>Projects</ModalHeader> */}
          {user_projects ? <ModalBody>
            {user_projects.map(({
              project_id,
              name,
              description,
              screenshot,
              site_link,
              github_link,
              skill_sets,
              timestamp,
              likes
            }) => (
              // <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Col lg='12' md='12' sm='12' key={project_id}>
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
          </ModalBody> : null}
        </Modal>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
}); 

export default connect(
  mapStateToProps,
  { getUser, clearErrors }
)(UserProjectsListModal);
