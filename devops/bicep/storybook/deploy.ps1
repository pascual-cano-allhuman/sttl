param(
    $SubscriptionName = "SUB-ICT-PROGPROD",
    $ResourceGroupName = "rg-digitalenterprise-dps",
    $Environment="dev",
    $location="northeurope"
)

Write-Host "Subscription: $($SubscriptionName)"
Write-Host "ResourceGroupName: $($ResourceGroupName)"
Write-Host "Environment: $($Environment)"
Write-Host "location: $($location)"


az account set --subscription "$SubscriptionName"
az group create --name $ResourceGroupName --location $location
az deployment group create --resource-group $ResourceGroupName --template-file ".\template.bicep" --parameters ".\parameters.$Environment.json" 



