# drizzle-react-components
forked from truffle: A set of useful components for common UI elements.
Add customable render .

## Components

### LoadingContainer

This components wraps your entire app (but within the DrizzleProvider) and will show a loading screen until Drizzle, and therefore web3 and your contracts, are initialized.

`loadingComp` (component) The component displayed while Drizzle intializes.

`errorComp` (component) The component displayed if Drizzle initialization fails.

### ContractBaseDisp

`contract` (string, required) Name of the contract to call.

`method` (string, required) Method of the contract to call.

`methodArgs` (array) Arguments for the contract method call. EX: The address for an ERC20 balanceOf() function. The last argument can optionally be an options object with the typical from, gas and gasPrice keys.

`hideIndicator` (boolean) If true, hides the loading indicator during contract state updates. Useful for things like ERC20 token symbols which do not change.

`toUtf8` (boolean) Converts the return value to a UTF-8 string before display.

`toAscii` (boolean) Converts the return value to an Ascii string before display.

### ContractBaseForm

`contract` (string, required) Name of the contract whose method will be the basis the form.

`method` (string, required) Method whose inputs will be used to create corresponding form fields.

`labels` (array) Custom labels; will follow ABI input ordering. Useful for friendlier names. For example "_to" becoming "Recipient Address".


###  extend with your own style
### ContractData
the original is simple display,

create a class with any of this three function

  `_doRender(data)`  return a jsx format to render your data ex:

          return(
            <span>{displayData}{pendingSpinner}</span>
          )

  `_renderNotInited()`  return a jsx format to render when it is not initialized, default:

        return (
          <span>Initializing...</span>
        )

  `_renderNotInited()`  return a jsx format to render when it is not initialized, default:

      return (
        <span>Fetching...</span>
      )

the object should be like this:

      let _render = {
        _doRender: function (data){
          return ...
        },
        _renderNotInited:function(){ //optional
          return ...
        },
        _renderFetching:function(){ //optional
          return ...ß
        }
      }      

then in html it should be like This

     <ContractData contract="ContractName" method="methodName" methodArgs={[...methodArgs...]} render={..._render}/>

###ContractForm
we can customize the form appearence by three props:

#### formRender ####
 use this function to render total form, the default is

    formRender(){
      return(  (<form className="pure-form pure-form-stacked">

          {this.props.inputsRender?this.props.inputsRender():this.inputsRender()}
          {this.props.optionsRender?this.props.optionsRender():this.optionsRender()}

          <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
        </form>));

    }

this render can rarely be customized, or only class is to be modified;

 this.handleSubmit should be called when you want to send transaction.

#### inputsRender####
 use this to customize inputs,
there are three properties would be used:

1.*inputs*: inputs infomation of the function

2.*label*: labels properties of inputs

3.*state*: state of this function(inputs value stored)

the default is:

        inputsRender (){
          let inputs = this.inputs;
          let labels = this.props.labels || [];
          let state = this.state;
          ......
          return inputs.map((input, index) => {
            ...... onChange={this.handleInputChange} />)
          });
        }

custom render should rend data from this.inputs, and   this.handleInputChange should be called when you need to changed the stored input value


#### optionsRender ####
 this part is used to render the extra options(gasLimit,gasPrice,from,to,value,payable)
there is one property would be used:


*sendOptions*: the sendOptions of this function




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
custom render should rend data from sendOptions, and   this.handleOptionChanged should be called when you need to changed the stored sendOptions value

      <ContractForm contract="SimpleStorage" method="set" optionsRender={myOpRender.bind(this)}
      inputsRender={myInputRender.bind(this)}
      formRender={myFormRender.bind(this)} labels={['x']} />


!!! Enjoy it, Enjoy ethereum, Long live ethereum !!!
