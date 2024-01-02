param app_name string = 'stlstorybook'
param location string='northeurope'
param app_env string=''




output environmentOutput object = environment()

// Storage Account for VD


resource stg 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name:'stfi${app_name}${app_env}' 
  location: location
  tags: {
    deploymentMethod: 'Bicep'
  }
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: 'None'
    }
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}


 resource st_blobservices 'Microsoft.Storage/storageAccounts/blobServices@2021-06-01' = {
  parent: stg
  name: 'default'
  properties: {
    cors: {
      corsRules: [
          {
              allowedOrigins: [
                  '*'
              ]
              allowedMethods: [
                  'GET'
                  'HEAD'
                  'POST'
              ]
              maxAgeInSeconds: 20000
              exposedHeaders: [
                  ''
              ]
              allowedHeaders: [
                  '*'
              ]
          }
      ]
    }
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

 resource web_container 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: st_blobservices
  name: '$web'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }

} 

resource resource_container 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' =if (environment().name=='PROD') {
  parent: st_blobservices
  name: 'resources'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }

} 
