import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  state = {
    modal: false,
    nestedModalResetPass: false,
    nestedModalActivate: false,
    closeAll: false,
    email: '',
    password: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.info.data.message });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Cealer errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleNestedRestPass = () => {
    this.setState({
      nestedModalResetPass: !this.state.nestedModalResetPass,
      closeAll: false
    });
  };

  toggleNestedActivate = () => {
    this.setState({
      nestedModalActivate: !this.state.nestedModalActivate,
      closeAll: false
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModalResetPass: false,
      nestedModalActivate: false,
      closeAll: true
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    }

    // Attempt to login
    this.props.login(user);
  };

  onSubmitReset = e => {
    e.preventDefault();

    const { email } = this.state;

    // Attempt to reset
    this.props.resetPassword(email);

    this.props.toggleNestedRestPass();
  }

  render() {
    return(
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            { this.state.msg ? (<Alert color='danger'>{ this.state.msg }</Alert>) : null }

            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button
                  color='success'
                  style={{marginTop: '2rem'}}
                  block
                >Submit</Button>
              </FormGroup>
            </Form>
            <Modal isOpen={this.state.nestedModalResetPass} toggle={this.toggleNestedRestPass} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Reset password</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitReset}>
                  <FormGroup>
                    <p>We will send you a link to your registered email to help you to reset your password.</p>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      className='mb-3'
                      onChange={this.onChange}
                    />

                    <Button
                      color='success'
                      style={{marginTop: '2rem'}}
                      block
                    >Login</Button>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNestedRestPass}>Back to login</Button>{' '}
                <Button color="primary" onClick={this.toggleAll}>Close all</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.nestedModalActivate} toggle={this.nestedModalActivate} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Reset password</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitReset}>
                  <FormGroup>
                    <p>Enter your email to activate your account.</p>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      className='mb-3'
                      onChange={this.onChange}
                    />

                    <Button
                      color='success'
                      style={{marginTop: '2rem'}}
                      block
                    >Login</Button>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNestedActivate}>Back to login</Button>{' '}
                <Button color="primary" onClick={this.toggleAll}>Close all</Button>
              </ModalFooter>
            </Modal>
            <ModalFooter>
              <a href='#' onClick={this.toggleNestedRestPass}>Forgot password?</a>
              <a href='#' onClick={this.toggleNestedActivate}>Activate email?</a>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
}); 

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
