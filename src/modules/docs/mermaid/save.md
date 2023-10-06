%%{
init: {
'theme': 'base',
'themeVariables': {
'primaryColor': '#3498db',
'primaryTextColor': '#fff',
'primaryBorderColor': '#2c3e50',
'lineColor': 'red',
'secondaryColor': '#2ecc71',
'tertiaryColor': '#ecf0f1'
}
}
}%%
flowchart BT
%% Internal_API-->BEC
%% Internal_API-->CradlePoint
%% Internal_API-->ReadyNet
%% amop_website --> Internal_API

subgraph Internal_API
direction BT
Device_API
Device_CMD_API
User_API
Manufacturer_API
Report_Generation_API
Alert_API
Bandwidth_API
Group_API
Synchronizations
amop_website --> Device_API
amop_website --> Device_CMD_API
amop_website --> User_API
amop_website --> Manufacturer_API
amop_website --> Report_Generation_API
amop_website --> Alert_API
amop_website --> Bandwidth_API
amop_website --> Group_API
amop_website --> Synchronizations
end

subgraph Device_API
direction LR
GET1[GET]--200 OK-->/devices
GET1[GET]--200 OK-->/deviceLists/{{device_id}}
PATCH1[PATCH]--200 OK-->/deviceLists/**device_id**
GET1[GET]--200 OK-->/deviceLists/count
PUT1[PUT]--200 OK-->/deviceLists/bulkUpdateDevices
DELETE1[DELETE]--200 OK-->/deviceLists/bulkDelDevices
GET1[GET]--200 OK-->/deviceLists/**pci**/**rfvalue**/DeviceAnalysis
POST1[POST]--201 Created-->/deviceLists/geoDevice
GET1[GET]--200 OK-->/deviceLists/devCarrierSummary
GET1[GET]--200 OK-->/deviceLists/devModelSummary
GET1[GET]--200 OK-->/deviceLists/devNetModeSummary
POST1[POST]--200 OK-->/deviceLists/updateMultiTags
PATCH1[PATCH]--200 OK-->/deviceLists/**device_id**/updateTags
GET1[GET]--200 OK-->/deviceLists/**device_id**/tags
GET1[GET]--200 OK-->/deviceLists/online
GET1[GET]--200 OK-->/deviceLists/offline
GET1[GET]--200 OK-->/deviceLists/gps-location
end

subgraph Device_CMD_API
direction LR
GET2[GET]--200 OK-->/DeviceCmds/**MAC**/**wifiEnable**/networkDevices
POST2[POST]--201 Created-->/DeviceCmds/reboot
POST2[POST]--201 Created-->/DeviceCmds/configuration
POST2[POST]--201 Created-->/DeviceCmds/firmware
end

subgraph User_API
direction LR
GET3[GET]--200 OK-->/users/api-keys
POST3[POST]--200 OK-->/users/login
POST3[POST]--201 Created-->/users/registration
POST3[POST]--200 OK-->/users/forget-password
POST3[POST]--200 OK-->/users/verify-email
end

subgraph Manufacturer_API
direction LR
POST4[POST]--201 Created-->/LicenseMgmts/assignDeviceLicense
POST4[POST]--201 Created-->/LicenseMgmts/assignISPBulkDeviceLicense
POST4[POST]--201 Created-->/LicenseMgmts/transferDeviceLicense
PUT4[PUT]--200 OK-->/LicenseMgmts/renew
DELETE4[DELETE]--204 No Content-->/LicenseMgmts/**MAC**/DelLicense
DELETE4[DELETE]--204 No Content-->/LicenseMgmts/**MAC**/ISPBulkDelLicense
GET4[GET]--200 OK-->/LicenseMgmts/licenseStatus
end

subgraph Report_Generation_API
direction LR
GET5[GET]--200 OK-->/ReportSystems/**reportname**/report
POST5[POST]--201 Created-->/ReportSystems/createOrUpdateOptions
end

subgraph Alert_API
direction LR
POST6[POST]--201 Created-->/alertSetups/setAlert
GET6[GET]--200 OK-->/alertSetups/**MAC**/getAlert
end

subgraph Bandwidth_API
direction LR
GET7[GET]--200 OK-->/usages/**MAC**/**start**/**end**/getUsage
GET7[GET]--200 OK-->/usages/**MAC**/bandwidthByMAC
end

subgraph Group_API
direction LR
POST8[POST]--201 Created-->/groups/create
GET8[GET]--200 OK-->/groups/all
GET8[GET]--200 OK-->/groups/by-id
PUT8[PUT]--200 OK-->/groups/update
DELETE8[DELETE]--204 No Content-->/groups/delete
DELETE8[DELETE]--204 No Content-->/groups/delete-bulk
GET8[GET]--200 OK-->/groups/device-count
POST8[POST]--201 Created-->/groups/plan-create
PUT8[PUT]--200 OK-->/groups/plan-update-delete
end

subgraph Synchronizations
direction LR
PUT9[PUT]--200 OK-->/synchronizations/DiagnosticTool
DELETE9[DELETE]--204 No Content-->/synchronizations/**MAC**/**node**/delEntry
GET9[GET]--200 OK-->/synchronizations/**MAC**/sync
POST9[POST]--201 Created-->/synchronizations/syncSettings
end
