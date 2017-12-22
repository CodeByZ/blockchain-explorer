// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    contextPath: "/",
    rpcProxyBaseUrl: 'http://localhost:8080/api',
    endpoints: {
        healthCheck: '/health',
        connect: '/connect',
        disconnect: '/disconnect',
        getBlockchainInfo: '/get-blockchain-info',
        getBlock: '/get-block',
        getReceivedByAddress: '/get-received-by-address',
        getBlockCount: '/get-block-count',
        getRawTransaction: '/get-raw-transaction'
    },
    healthCheckPollIntervalMs: 5000,
    treeIcons: {
        "?": "fa-hashtag",
        "??": "fa-puzzle-piece"
    }
};
