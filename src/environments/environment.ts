// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
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
