# blockchain-explorer

A simple blockchain explorer web app.

### What is This?

This project is an Angular 5 based Bitcoin blockchain explorer, currently supporting basic operations of searching and viewing blocks and transactions.

It communicates with and queries the Bitcoin core full node via [this JSON RPC proxy server](https://github.com/CodeByZ/bitcoin-json-rpc-proxy).


### Building & Running the Explorer

 1. Clone the project
 2. Go into the project folder: `cd blockchain-explorer` 
 3. Install dependencies: `npm install` 
 4. Install Angular CLI globally: `npm install -g @angular/cli`
 5. Run the frontend (will automatically spawn the browser): `npm start`
 5. That's it!

##### Notes

* The application by default will attempt to communicate with the proxy server locally on port 8080. If you wish to install the proxy on a different machine simply update the `rpcProxyBaseUrl` configuration property accordingly in `environment.ts` file.
* In order to build the project for production/distribution simply run `npm run build`.
