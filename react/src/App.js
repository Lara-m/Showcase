import React, { Component } from 'react';
import './App.css';
import { ListGroup, ListGroupItem, Modal, Button,
  FormGroup, FormControl,ControlLabel,HelpBlock, } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      modal_todo:{title:'', desc: '', state:''},
      todolist: [
      	{title:'sd', desc: 'jth', state:'info'},
        {title:'fhf', desc: 'dfg', state:'warning'},
        {title:'dgf', desc: 'owirs', state:'success'},
      ]
    };
    this.close_modal = this.close_modal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.save = this.save.bind(this)
    this.new = this.new.bind(this)
    this.delete = this.delete.bind(this)
  }
  
  open_modal(todo)  { 
    this.setState({
      modal_todo:{title:todo.title, desc: todo.desc, state:todo.state},
    })
    this.setState({ showModal: true })
  }

  close_modal() { this.setState({ showModal: false }) }  

  getValidationState() {
    const length = this.state.modal_todo.title.length
    if (length > 2) return 'success';
    else if (length > 1) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e){
    let val = e.target.value 
    let new_modal = null
    switch(e.target.id){
      case 'formTitle':
        new_modal = { title: val, desc: this.state.modal_todo.desc, state: this.state.modal_todo.state}
        break
      case 'formDesc':
        new_modal = { title: this.state.modal_todo.title, desc: val, state: this.state.modal_todo.state}
        break
      case 'formState':
        new_modal = { title: this.state.modal_todo.title, desc: this.state.modal_todo.desc , state:val}
        break
      default:
        break
    }
    this.setState({ modal_todo: new_modal})
  }


  new(){
    this.setState({
      modal_todo:{title:'', desc: '', state:''},
    })
    this.open_modal(this.state.modal_todo)
  }

  //complete this
  delete(){
    var array = this.state.todolist
    var index = array.indexOf(this.state.modal_todo)
    array.splice(index, 1)
    this.setState({todolist: array })
    this.close_modal()
  }

  save(e){
    //this.setState({ modal_todo.state: e.target.value });
    var newArray = this.state.todolist.slice()
    newArray.push(e)
    this.setState({todolist:newArray})
    this.close_modal()
  }

  gimme_listgroup () {
    const listgroupInstance = (
      <ListGroup>
      {this.state.todolist.map((todo, key)=>
        <ListGroupItem
          key={key}
          className="Card" 
          bsStyle={todo.state}
          onClick={() => this.open_modal(todo)}
        >{todo.title} </ListGroupItem>
      )}
       <ListGroupItem
          key=""
          className="Card" 
          bsStyle="danger"
          onClick={() => this.new()}
        > + </ListGroupItem>
      </ListGroup>
    )
    return listgroupInstance
  }

  prepare_modal(){
    return(
      <Modal show={this.state.showModal} onHide={this.close_modal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formTitle"
             validationState={this.getValidationState}
             >
              <ControlLabel>What</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.state.modal_todo.title}
                placeholder="Enter what should be done"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Should be more than two character.</HelpBlock>
            </FormGroup>
            <FormGroup controlId="formDesc">
              <ControlLabel>How</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.state.modal_todo.desc}
                placeholder="Describe away!"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formState">
              <ControlLabel>How far are we?</ControlLabel>
                <FormControl componentClass="select" placeholder="select" 
                	defaultValue={this.state.modal_todo.state}
                  onChange={this.handleChange}
                  >
                  <option value="To Do">To Do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
              </FormControl>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            className = "btn-danger pull-left"
            onClick={this.delete}>
            Delete the whole lot</Button>
          <Button onClick={()=>this.save(this.state.modal_todo)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <div className="App container" >
        <div id="ffs" className="container">
          {this.prepare_modal()}
        </div>
        <header className="App-header">
          <h1 className="App-title">To Do</h1>
        </header>

        <p className="App-intro">
        </p>

        <div className="Card ">
          <div>
            {this.gimme_listgroup()}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
