param(
    $SubscriptionName = "SUB-ICT-PROGPOC",
    $ResourceGroupName = "rg-stl-poc",
    $Environment="poc",
    $location="northeurope"
)

Write-Host "Subscription: $($SubscriptionName)"
Write-Host "ResourceGroupName: $($ResourceGroupName)"
Write-Host "Environment: $($Environment)"
Write-Host "location: $($location)"

az account set --subscription "$SubscriptionName"
az group create --name $ResourceGroupName --location $location
az deployment group create --resource-group $ResourceGroupName --template-file ".\template.bicep" --parameters ".\parameters.$Environment.json" 

