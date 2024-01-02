param environment string='poc'
param location string = resourceGroup().location
param principalId string = 'xxxxxxxx'
param rgDentName string = 'xxxxxxx'
param enterpriseGradeCdnStatus string = 'Disabled'
param backendName string = 'xxxxxx'
param backendResourceGroup string = 'rg-api-dev'
param backendSubscriptionId string
param tags object = {}
param logWorkspaceId string=''

var swaName = 'swa-slt-app-${environment}'
var swaInsightsName = 'appi-stl-app-${environment}'

// SWA is not available in the northeurope region
resource swa_resource 'Microsoft.Web/staticSites@2021-01-15' = {
  name: swaName
  location: 'westeurope'
  tags: tags
  properties: {
    enterpriseGradeCdnStatus: enterpriseGradeCdnStatus
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
  sku: {
      name: 'Standard'
      size: 'Standard'
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '/subscriptions/${subscription().subscriptionId}/resourcegroups/${rgDentName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/${principalId}': {}
    }
  }
}

resource swa_backend 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = {
  name: '${swaName}/backend1'
  location: 'westeurope'
  dependsOn: [
    swa_resource
  ]
  properties:{
    backendResourceId: '/subscriptions/${backendSubscriptionId}/resourceGroups/${backendResourceGroup}/providers/Microsoft.ApiManagement/service/${backendName}'
    region: 'northeurope'
  }
}

resource swa_insights 'Microsoft.Insights/components@2020-02-02' = {
  name: swaInsightsName
  location: 'northeurope'
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    DisableIpMasking: true
    IngestionMode: 'LogAnalytics'
    RetentionInDays: 90
    WorkspaceResourceId: logWorkspaceId
  }
}
