export const environment = {
    production: true,
    contextPath: "/",
    healthCheckEndpoint: 'http://localhost:8080/health',
    healthCheckPollIntervalMs: 1000,
    automationEndpoint: 'api/v1/automation/',
    treeIcons: {
        "Root": "fa-hashtag",
        "SectionRoot": "fa-puzzle-piece",
        "KMPExplicitAssignmentFolder": "fa-black-tie",
        "KMPExternalObject": "fa-external-link",
        "KMPPrivateFolder": "fa-user-secret",
        "KMPInvestigation": "fa-search",
        "KMPSystemFolder": "fa-folder-open",
        "KMPSystemObject": "fa-object-group",
        "KMPOrganization": "fa-sitemap",
        "KMPInsight": "fa-lightbulb-o",
        "KMPFolder": "fa-folder",
        "KMPFile": "fa-file",
        "Workspace": "fa-briefcase",
        "Domain": "fa-globe",
        "KMPPerson": "fa-user",
        "KMPIdentifier": "fa-bullseye",
        "KMPCreditCard": "fa-credit-card",
        "KMPBankAccount": "fa-university",
        "KMPAddress": "fa-map-marker",
        "KMPInstitution": "fa-building-o"
    },
    entityTypes: [
        {
            value: 'KMPPerson',
            display: 'Person'
        },
        {
            value: 'KMPOrganization',
            display: 'Organization'
        }
    ]
};
