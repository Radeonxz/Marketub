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
import { login, resetPassword, activateAccount } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  state = {
    modal: false,
    nestedModal: false,
    nestedModalHeader: '',
    nestedModalText: '',
    nestedModalResetPass: false,
    closeAll: false,
    email: '',
    password: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    activateAccount: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'LOGIN_FAIL'
        || error.id === 'RESETPASS_FAIL'
        || error.id === 'ACTIVATE_FAIL'
      ) {
        this.setState({ msg: error.info.data.details });
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

  toggleNestedModal = (header, text, resetPass) => {
    // Cealer errors
    this.props.clearErrors();
    if(header && text) {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        nestedModalHeader: header,
        nestedModalText: text,
        nestedModalResetPass: resetPass,
      });
    } else {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false
      });
    }
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
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
    };

    // Attempt to login
    this.props.login(user);
  };

  onSubmitNestModal = e => {
    e.preventDefault();
    const { email } = this.state;

    // Attempt to reset or activate
    this.state.nestedModalResetPass ? this.props.resetPassword({ email: email }) : this.props.activateAccount({ email: email });
    this.toggleNestedModal();
  };

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
                <Label for='email'>
                  Email or Username
                </Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email or Username'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>
                  Password
                </Label>
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
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNestedModal}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>{this.state.nestedModalHeader}</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitNestModal}>
                  <FormGroup>
                    <p>{this.state.nestedModalText}</p>
                    <Label for='email'>
                      Email
                    </Label>
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
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onClick={this.toggleNestedModal}
                >
                  Back to login
                </Button>
                {' '}
                <Button
                  color='primary'
                  onClick={this.toggleAll}
                >
                  Close all
                </Button>
              </ModalFooter>
            </Modal>
            <ModalFooter>
              <a href='/#' onClick={() => this.toggleNestedModal(
                'Reset Password',
                'Enter your email to reset your password.',
                true
              )}>Forgot password?</a>
              <a href='/#' onClick={() => this.toggleNestedModal(
                'Find Username',
                'Enter your email to find your username.',
                false
              )}>Forgot username?</a>
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
  { login, resetPassword, activateAccount, clearErrors }
)(LoginModal);
