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
