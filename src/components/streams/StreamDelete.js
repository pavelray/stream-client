import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream,deleteStream} from '../../redux/actions';

export class StreamDelete extends Component {
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }
  
  renderActions(){
    const id = this.props.match.params.id;
    return(
      <>
        <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    )
  }

  renderContent(){
    if(!this.props.stream){
      return('Are you sure want to delete this stream?')
    }
    else{
      return(`Are you sure want to delete the steam with title: ${this.props.stream.title}`)
    }
  }

  render() {
    return (
        <Modal 
          title="Delete Stream" 
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={()=> history.push('/')}/>
    )
  }
}

const mapStateToProps=(state,ownProps)=>{
  return{stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete)
