import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
      super();
      this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
      this.updateState = this.updateState.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.state = {
      	somestate:'start typing!',
         data: 
         [
            {
            	"time":"7 AM",
            	"feeling":"good"
            },
            {
            	"time": "2 PM",
            	"feeling":"bored"
            },
            {
            	"time":"11 PM",
            	"feeling":"sleepy"
            }
         ]
      }
   }
   findDomNodeHandler() {
      var myDiv = document.getElementById('someid');
      // Didn't work
      //ReactDOM.findDOMNode(myDiv).style.color=='red'?'green':'red';
      if(ReactDOM.findDOMNode(myDiv).style.color=='red'){
      	ReactDOM.findDOMNode(myDiv).style.color='green'}
      	else{ReactDOM.findDOMNode(myDiv).style.color='red'}
      console.log(ReactDOM.findDOMNode(myDiv).style.color);
   }

   updateState(e) {
   	this.setState({somestate: e.target.value});
   }
   clearInput() {
      this.setState({somestate: ''});
      ReactDOM.findDOMNode(this.refs.tb).focus();
   }

   render() {
   	var myStyle = {
         fontSize: 12,
         color: 'red'
      }
      return (
          <div>
	        <h1 >Hi there!</h1>

            <table>
            	<thead>
            		<tr>
	            	<td>{this.props.prop1}</td>
	            	<td>{this.props.prop2}</td>
	            	</tr>
            	</thead>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} data = {person} />)}
                  {this.state.data.map((person, i) => console.log(i))}
               </tbody>
            </table>
	        <button onClick = {this.findDomNodeHandler}>FIND DOME NODE</button>
            <p id="someid" style={myStyle}>Tihihihihi :D</p>
          	{// it's refreshing the page every time it updates and I don't know why
      		}
          <input type = "text" value = {this.state.somestate}
               onChange = {this.updateState} onFocus={this.clearInput} ref = "tb"/>
            <h4>{this.state.somestate}</h4>
         </div>
      );
   }
}

class TableRow extends React.Component {
   render() {
      return (
         <tr>
            <td>{this.props.data.time}</td>
            <td>{this.props.data.feeling}</td>
         </tr>
      );
   }
}

App.defaultProps = {
	prop1:"by",
	prop2:"feeling",
	prop3:"start typing"
}

export default App;

