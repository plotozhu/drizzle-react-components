import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

/*
 * Create component.
 */

class ContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    this.sendOptions = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      value:"0"
    };
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = '';
            }

            break;
        }
    }
  initialState.sendOptions = {
    transValue:false,
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    value:"0"
  };
    this.state = initialState;

    let that = this;




  }

  optionsRender(){
    let sendOptions = this.state.sendOptions;
    let state = this.state;
    return (Object.keys(sendOptions).map( (prop,index) => {
      if(prop === 'payable'){
        // check if input type is struct and if so loop out struct fields as well
          return (<div key={prop}> <input key={prop} type="checkbox" name={prop} checked={sendOptions['payable']} placeholder={`${prop}:${sendOptions[prop]}`} onClick={this.handleOptionChange.bind(this)} /><label htmlFor={prop} >{prop}</label></div>)

      }else{
        // check if input type is struct and if so loop out struct fields as well
        return (<div key={prop}> <input key={prop} type="text" name={prop} value={sendOptions[prop]} placeholder={`${prop}:${sendOptions[prop]}`} onChange={this.handleOptionChange.bind(this)} /><label htmlFor={prop} >{prop}</label></div>)

      }
    }));
  }
  inputsRender (){
    let inputs = this.inputs;
    let labels = this.props.labels || [];
    let state = this.state;
    function translateType(type) {
      switch(true) {
          case /^uint/.test(type):
              return 'number'
              break
          case /^string/.test(type) || /^bytes/.test(type):
              return 'text'
              break
          case /^bool/.test(type):
              return 'checkbox'
              break
          default:
              return 'text'
      }
    }
    return inputs.map((input, index) => {
        var inputType = translateType(input.type)
        var inputLabel = labels ? labels[index] : input.name
        // check if input type is struct and if so loop out struct fields as well
        return (<input key={input.name} type={inputType} name={input.name} value={state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
    });
  }
  formRender(){
    return(  (<form className="pure-form pure-form-stacked">

        {this.props.inputsRender?this.props.inputsRender():this.inputsRender()}
        {this.props.optionsRender?this.props.optionsRender():this.optionsRender()}

        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>));

  }
  handleSubmit() {
    let result =_.clone(this.state);
    result.sendOptions = _.clone(this.state.sendOptions);

    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(result));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleOptionChange(event) {
    let sendOptions = this.state.sendOptions || {};

    if(event.target.name === 'payable'){
      this.state.sendOptions.payable = !this.state.sendOptions.payable;
        sendOptions[event.target.name] = this.state.sendOptions.payable;
        if(!this.state.sendOptions.payable){
          sendOptions.value = 0;
        }

    }else{
      sendOptions[event.target.name] = event.target.value;
    }
    this.setState({sendOptions:sendOptions});
  }



  render() {
    return  this.props.formRender?this.props.formRender():this.formRender() ;
  }
}

ContractForm.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(ContractForm, mapStateToProps)
