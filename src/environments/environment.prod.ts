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
};