import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../redux/actions';

export class StreamCreate extends Component {
  
  renderError({touched,error}){
    if(touched && error){
      return(
        <div className="error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }
  
  renderInput=({input, label, meta})=>{
    const className = `field ${meta.error && meta.touched? 'error': ''}`
    
    return(
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" /> 
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }
  
  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field name="description" component={this.renderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = formValues =>{
  const errors= {};

  if(!formValues.title){
    errors.title = 'Title is required';
  }

  if(!formValues.description){
    errors.description = 'Description is required';
  }

  return errors;
}

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);
