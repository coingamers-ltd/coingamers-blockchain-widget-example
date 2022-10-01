# coingamers-blockchain-widget-example
Example repo showing the integration and communication between parent and child (widget) component

## Getting started

Iframe usage
The base URL: ‘http://localhost:3000/wallets-and-balances’
The widget will be loaded in an iframe and will be able to communicate with the parent component via postMessage.
The URL: should contains the following parameters:
- ‘token’ - the token that will be used to authenticate the user. This token is mandatory and should be provided by your side.
- 'page' - the page that will be loaded in the widget. This parameter is optional and if not provided the default page will be loaded.
the following pages are available:
  - ‘nfts’ - the default page that will be loaded if no page parameter is provided.
  - 'history' - the page that will be loaded if the page parameter is provided with the value ‘history’.

## Development
·         history -optional
_<iframe src="http://localhost:3000/wallets-and-balances?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&page=nfts"> </iframe>_

When the token expires, the widget will send a post message to the iframe component with the following payload:
_{
  expiredToken: true
}_

The parent component should listen to this message and reload the iframe with a new token.

_window.addEventListener('message', function (e) {
        if(e.data.expiredToken){
            const iframe = document.getElementsByTagName('iframe')[0];
            iframe.contentWindow.postMessage({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…'} , '*');}
});_


