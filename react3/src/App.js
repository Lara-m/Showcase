import React, { Component } from 'react';
import './App.css';
import {Button, Glyphicon, FormGroup, FormControl, 
	ControlLabel, ListGroup, ListGroupItem, Popover,
	Tooltip, Modal
} from 'react-bootstrap';
import ReactDOM from 'react-dom';

var list = [{
	'title' : 'To Do',
	'desc' : 'Add a todo'
}];

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>To Do</h2>
				</div>
				<div className="container" id = "test"/>
				<div className="container" id = "list"/>
				<div className="container" id = "test2"/>
			</div>
		);
	}
}

export default App;

export class FormExample extends Component{
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault()
		list.push({
			'title' : e.target.title1.value,
			'desc': e.target.desc.value
		})
		ReactDOM.render(<ListExample/>, document.getElementById('list'));
	}
	render() {
		return (
			<form onSubmit = {this.handleSubmit}>
				<FormGroup
				controlId="formBasicText"
				style = {{padding:20}}
				>
					<ControlLabel><h4>Title</h4></ControlLabel>
					<FormControl
						name = "title1"
						type="text"
						placeholder="Title"
						bsSize="large"
					/>
					<ControlLabel><h4>Description</h4></ControlLabel>
					<FormControl 
						name = "desc"
						componentClass="textarea" 
						placeholder="Description" 
						bsSize="large"
					/>
					<Button 
						id = "Submit" 
						className="btn btn-primary btn-large" 
						type="submit">
				 		Add</Button>
					<FormControl.Feedback />
				</FormGroup>
			</form>
		);
	}
}

export class ListExample extends Component{
	render() {
		return (
			<div>
				<div>
					{list.map((dynamicComponent, i) => 
					<Content 
						key = {i} 
						componentData = {dynamicComponent}
					/>)}
				</div>
				<ListGroup>
				</ListGroup>
			</div>
		)
	}
}

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.open = this.open.bind(this)
		this.close = this.close.bind(this)
		this.dlt = this.dlt.bind(this)
		this.state = {showModal: false}
	}
	edit(e) {
		console.log('You clicked.')
	}
	dlt(e){
		e.preventDefault()
		var index = list.indexOf(this.props.componentData)
		if (index > -1) {
		    list.splice(index, 1)
		}
		ReactDOM.render(<ListExample/>, document.getElementById('list'))
	}
	close() {
		this.setState({ showModal: false })
	}
	open() {
		this.setState({showModal:true})
	}
	render() {
		return (
			<div>
				<ListGroupItem >
				<Button 
					className='btn btn-primary pull-right' 
					bsSize="large"
					onClick={this.dlt}
					>
					<Glyphicon glyph="glyphicon glyphicon-trash"/>
				</Button>
				<div onClick={this.open}>
					<h3>{this.props.componentData.title}</h3>
						{this.props.componentData.desc}
				</div>
				</ListGroupItem>
				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
				 		<Modal.Title>Edit</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Ceebs</h4>
						<p> I couldn't be bothered and didn't have the time for writing something for this section.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Cancel</Button>
						<Button onClick={this.edit} className='btn btn-primary'>Save</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}