import React, { Component } from 'react';
import './App.css';
import { ListGroup, ListGroupItem, Modal, Button,
  FormGroup, FormControl,ControlLabel,HelpBlock, } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal : false,
      modal_todo : { title:'', desc: '', state:'To Do' },
      todolist: [
      	{title:'write the test for to do', desc: '1', state:'To Do'},
        {title:'write the test for doing', desc: '2', state:'Doing'},
        {title:'write the test for done', desc: '3', state:'Done'},
      ],
      state_color : {
        'To Do'   :   'info',
        'Doing'   :   'warning',
        'Done'    :   'success',
      },
      current_open_modal_key : null
    };
    this.close_modal = this.close_modal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    //this.getValidationState = this.getValidationState.bind(this)
    this.save = this.save.bind(this)
    this.new = this.new.bind(this)
    this.delete = this.delete.bind(this)
  }
  
  open_modal(todo,key)  { 
    this.setState({
      modal_todo:{title:todo.title, desc: todo.desc, state:todo.state},
      showModal : true,
      current_open_modal_key : key
    })
  }

  close_modal() { 
    this.setState({ showModal: false,
      modal_todo : {title:'', desc: '', state:'To Do'} ,
      current_open_modal_key : null
    }) 
  }  

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
        new_modal = { title: this.state.modal_todo.title, desc: this.state.modal_todo.desc , state: val}
        break
      default:
        break
    }
    this.setState({ modal_todo: new_modal})
  }

  new(){
    this.open_modal(this.state.modal_todo,null)
  }

  delete(){
    var array = this.state.todolist
    var index = array.indexOf(this.state.modal_todo)
    array.splice(index, 1)
    this.setState({todolist: array })
    this.close_modal()
  }

  save(e,key=null){
    key = this.state.current_open_modal_key
    if (key==null) {
      var newArray = this.state.todolist.slice()
      newArray.push(e)
      this.setState({todolist:newArray})
    }
    else {
      const items = this.state.todolist;
      items[key] = e;
      this.forceUpdate();
    }
    this.close_modal()
  }

  gimme_listgroup () {
    const listgroupInstance = (
      <ListGroup>
      {this.state.todolist.map((todo, key)=>
        <ListGroupItem
          key={key}
          className="Card" 
          bsStyle={this.state.state_color[todo.state]}
          onClick={() => this.open_modal(todo,key)}
        >{todo.title}</ListGroupItem>
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
          <Modal.Title>To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formTitle"
             validationState={this.getValidationState()}
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
