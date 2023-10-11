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

amop_website --> Device_API

subgraph Internal_API["<font size=24>Internal_API"]
direction BT
Device_API
User_API
Manufacturer_API
Notification_API

amop_website --> User_API
amop_website --> Manufacturer_API
amop_website --> Notification_API
end

subgraph Device_API
direction LR
device_API_GET[GET]--200 OK-->getAllDeviceList["/devices"]
device_API_GET[GET]--200 OK-->getDeviceInfoById["/devices/status/{device_id}"]
device_API_PATCH[PATCH]--200 OK-->updateDeviceInfoById["/devices/{device_id}"]
device_API_GET[GET]--200 OK-->countDeviceListsBasedOnFilter["/devices/count"]
device_API_PUT[PUT]--200 OK-->moveMultipleDevicesToTheAssignedOwner["/devices/bulk"]
device_API_DELETE[DELETE]--200 OK-->deleteMultipleRouters["/devices/bulk"]
device_API_GET[GET]--200 OK-->retrieveAllRoutersInformationBasedOnProvidedConditions["/devices/{pci}/{rfvalue}/analysis"]
device_API_POST[POST]--201 Created--> addOrEditRouterAddress["/devices/geo-location"]
device_API_GET[GET]--200 OK-->listConnectedDevicesByCarrier["/devices/list/carrier"]
device_API_GET[GET]--200 OK--> connectedDeviceByModel["/devices/model/list"]
device_API_GET[GET]--200 OK-->connectedDeviceByNetworkType["/devices/network/list"]
device_API_POST[POST]--200 OK-->assignMultipleTagsToMultipleDevice["/devices/tags/multiple"]
device_API_PATCH[PATCH]--200 OK--> assignTagsToOneDevice["/devices/tags/update/{device_id}"]
device_API_GET[GET]--200 OK-->getTheTagsByDeviceId["/devices/tags/{device_id}"]
device_API_GET[GET]--200 OK-->getNoOfOnlineDevices["/devices/online"]
device_API_GET[GET]--200 OK-->getNoOfOfflineDevices["/devices/offline"]
device_API_GET[GET]--200 OK-->getTheGPSLocationByMAC["/devices/gps-location/{MAC}"]
device_API_GET[GET]--200 OK-->getDeviceConfiguationByMAC["/devices/configurations/{MAC}"]
device_API_PATCH[PATCH]--200 OK-->updateDeviceConfigurationByMAC["/devices/configurations/{MAC}"]
device_API_GET[GET]--200 OK-->retreiveBandwidthUsageOfDeviceWithRange["/devices/usages/bandwidth/{MAC}/{start}/{end}"]
device_API_GET[GET]--200 OK-->retreiveBandwidthUsageOfDeviceByMAC["/devices/usages/bandwidth/{MAC}"]

device_API_GET[GET]--200 OK-->retrieveARoutersNetworkInformation["/devices/network-information/{MAC}/{wifiEnable}"]
device_API_POST[POST]--201 Created-->sendRebootCommandToRouter["/devices/reboot/{MAC}"]
device_API_GET[POST]--201 Created-->pushTheConfigurationToRouter["/devices/configuration"]
device_API_GET[POST]--201 Created-->updateTheFirmwareOfOneOrMoreRouters["/devices/firmware"]

device_API_PUT[PUT]--200 OK-->retrievePingStatusOnTheRouter["/device/synchronizations/ping-status/{MAC}"]
device_API_DELETE[DELETE]--204 No Content-->deleteAnEntryInTheRouterSystemConfiguration["/device/synchronizations/delete-entry/{MAC}/{node}"]
device_API_GET[GET]--200 OK-->retrieveCurrentSystemConfigurationOfARouter["/device/synchronizations/configuration/{MAC}"]
device_API_POST[POST]--201 Created-->editARouterSystemConfiguration["/device/synchronizations/configuration/{MAC}"]

device_API_POST[POST]--201 Created-->createGroup["/devices/groups"]
device_API_GET[GET]--200 OK-->getAllGroups["/devices/groups"]
device_API_GET[GET]--200 OK-->getGroupsById["/devices/groups/{GROUP_ID}"]
device_API_PUT[PUT]--200 OK-->updateAGroupInformation["/devices/groups/{GROUP_ID}"]
device_API_DELETE[DELETE]--204 No Content-->deleteGroup["/devices/groups/{GROUP_ID}"]

device_API_DELETE[DELETE]--204 No Content-->bulkDeleteGroups["/devices/groups/bulk"]
device_API_GET[GET]--200 OK-->countDevicesOfAGroup["/devices/groups/device-count/{GROUP_ID}"]

end

subgraph User_API
direction LR
user_API_GET[GET]--200 OK-->getAPIKeys["/users/api-keys"]
user_API_POST[POST]--200 OK-->login["/users/login"]
user_API_POST[POST]--201 Created-->register["/users/registration"]
user_API_GET[GET]--200 OK-->forgetPassword["/users/forget-password"]
user_API_POST[POST]--200 OK-->verifyEmail["/users/verify-email"]
%% admin create user, edit user, update user info, delete user
end

subgraph Manufacturer_API
direction LR
manufacturer_API_POST[POST]--201 Created-->assignTheLicenseToTheDevice["/manufacturer/license/assign"]
manufacturer_API_POST[POST]--201 Created-->assignTheBulkLicenseToTheDevice["/manufacturer/license/assign/bulk"]
manufacturer_API_POST[POST]--201 Created-->transferTheLicenseFromOneDeviceToAnother["/manufacturer/license/transfer"]
manufacturer_API_PUT[PUT]--200 OK-->renewTheDeviceLicense["/manufacturer/license/renew/{MAC}"]
manufacturer_API_DELETE[DELETE]--204 No Content-->deleteTheDeviceLicenseByMAC["/manufacturer/license/delete/{MAC}"]
manufacturer_API_DELETE[DELETE]--204 No Content-->deleteDeviceLicenseInBulk["/manufacturer/license/delete/bulk/{MAC}"]
manufacturer_API_GET[GET]--200 OK-->retrieveTheUsersLicenseDetails["/manufacturer/license-status"]

%% the following endpoints are for report generation regarding manufacturers
manufacturer_API_GET[GET]--200 OK-->generateAReportOfADeviceByMAC["/manufacturer/report/{reportname}/{MAC}"]
manufacturer_API_POST[POST]--201 Created-->createAReportOfAUser["/manufacturer/report/create/{USER_ID}"]
manufacturer_API_POST[PUT]--200 OK-->editAReportOfAUser["/manufacturer/report/edit/{USER_ID}"]
end

subgraph Notification_API
direction LR
notification_API_POST[POST]--201 Created-->enableTypesOfAlertsForARouter["/alerts/set/{ALERT_TYPE}/{MAC}"]
notification_API_GET[GET]--200 OK-->geCurrentAlertInfoOfARouter["/alerts/get/{MAC}"]
end
