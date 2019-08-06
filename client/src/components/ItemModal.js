import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    description: '',
    skill_sets: '',
    timestamp: '',
    site_link: '',
    github_link: '',
    screenshot: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    if(e.target.name === 'screenshot') {
      this.setState({ screenshot: e.target.files[0] });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, description, skill_sets, timestamp, site_link, github_link, screenshot } =this.state;
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('skill_sets', skill_sets);
    fd.append('timestamp', timestamp);
    fd.append('site_link', site_link);
    fd.append('github_link', github_link);
    fd.append('screenshot', screenshot, screenshot.name);

    //add item via addItem action
    this.props.addItem(fd);

    //close modal
    this.toggle();
  };

  render() {
    return(
      <div>
        { this.props.isAuthenticated ? <Button
          color='dark'
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Add Project</Button> : <h4 className='mb-3 ml-4'>Please log in to manage projects</h4> }
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Required'
                  onChange={this.onChange}
                />

                <Label for='item'>Description</Label>
                <Input
                  type='text'
                  name='description'
                  id='description'
                  placeholder='Required'
                  onChange={this.onChange}
                />

                <Label for='item'>Skill Sets</Label>
                <Input
                  type='text'
                  name='skill_sets'
                  id='skill_sets'
                  placeholder='Optional'
                  onChange={this.onChange}
                />

                <Label for='item'>Created At</Label>
                <Input
                  type='text'
                  name='timestamp'
                  id='timestamp'
                  placeholder='Required'
                  onChange={this.onChange}
                />

                <Label for='item'>Site Link</Label>
                <Input
                  type='text'
                  name='site_link'
                  id='site_link'
                  placeholder='Optional'
                  onChange={this.onChange}
                />

                <Label for='item'>Github Repo</Label>
                <Input
                  type='text'
                  name='github_link'
                  id='github_link'
                  placeholder='Optional'
                  onChange={this.onChange}
                />

                <Label for='item'>Screenshot</Label>
                <Input
                  type='file'
                  name='screenshot'
                  id='screenshot'
                  placeholder='Optional'
                  onChange={this.onChange}
                />
                <Button
                  color='dark'
                  style={{marginTop: '2rem'}}
                  block
                >Add Project</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(mapStateToProps, { addItem })(ItemModal);
