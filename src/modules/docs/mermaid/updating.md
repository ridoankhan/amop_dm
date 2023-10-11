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

Device_Info_API[Device_Info]-->getAllDeviceList["GET /devices"]
Device_Info_API[Device_Info]-->updateDeviceInfoById["PATCH /devices/{DEVICE_ID}"]
Device_Info_API[Device_Info]-->countDeviceListsBasedOnFilter["GET /devices/count"]
Device_Info_API[Device_Info]-->moveMultipleDevicesToTheAssignedOwner["PUT /devices/bulk"]
Device_Info_API[Device_Info]-->deleteMultipleRouters["DELETE /devices/bulk"]
Device_Info_API[Device_Info]-->retrieveAllRoutersInformationBasedOnProvidedConditions["GET /devices/{pci}/{rfvalue}/analysis"]
Device_Info_API[Device_Info]-->listConnectedDevicesByCarrier["GET /devices/carrier/list"]
Device_Info_API[Device_Info]--> connectedDeviceByModel["GET /devices/model/list"]
Device_Info_API[Device_Info]-->connectedDeviceByNetworkType["GET /devices/network/list"]

Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->assignTheLicenseToADevice["POST /devices/manufacturer/license/assign/{DEVICE_ID}"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->assignTheBulkLicenseToTheDevices["POST /devices/manufacturer/license/assign/bulk"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->transferTheLicenseFromOneDeviceToAnother["POST /devices/manufacturer/license/transfer"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->renewTheDeviceLicense["PUT /devices/manufacturer/license/renew/{MAC}"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->deleteTheDeviceLicenseByMAC["DELETE /devices/manufacturer/license/delete/{MAC}"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->deleteDeviceLicenseInBulk["DELETE /devices/manufacturer/license/delete/bulk"]
Device_And_Manufacturer_License_API[Device_And_Manufacturer_License]-->getTheCurrentLicenseStatusOfDevice["GET /devices/manufacturer/license/status/{DEVICE_ID}"]

Device_Report_API[Device_Report]-->generateAReportForMultipleDevices["GET /devices/report/{REPORT_NAME}"]
Device_Report_API[Device_Report]-->generateAReportOfADeviceByMAC["GET /devices/report/{REPORT_NAME}/{MAC}"]

Device_Status_API[Device_Status]-->getDeviceInfoById["GET /devices/status/{DEVICE_ID}"]
Device_Status_API[Device_Status]-->getNoOfOnlineDevices["GET /devices/status/online"]
Device_Status_API[Device_Status]-->getNoOfOfflineDevices["GET /devices/status/offline"]
Device_Status_API[Device_Status]-->retrievePingStatusOnTheRouter["PUT /devices/status/ping/{MAC}"]

Device_Location_API[Device_Location]--> addOrEditRouterAddress["POST /devices/gps-location/{DEVICE_ID}"]
Device_Location_API[Device_Location]-->getTheGPSLocationByMAC["GET /devices/gps-location/{MAC}"]

Device_Tag_API[Device_Tag]-->assignMultipleTagsToMultipleDevice["POST /devices/tags/multiple"]
Device_Tag_API[Device_Tag]--> assignTagsToOneDevice["PATCH /devices/tags/update/{DEVICE_ID}"]
Device_Tag_API[Device_Tag]-->getTheTagsByDeviceId["GET /devices/tags/{DEVICE_ID}"]

Device_Configuration_API[Device_Configuration]-->getDeviceConfiguationByMAC["GET /devices/configurations/{MAC}"]
Device_Configuration_API[Device_Configuration]-->updateDeviceConfigurationByMAC["PATCH /devices/configurations/{MAC}"]
Device_Configuration_API[Device_Configuration]-->sendRebootCommandToRouter["POST /devices/configurations/reboot/{MAC}"]
Device_Configuration_API[Device_Configuration]-->pushTheConfigurationToRouters["POST /devices/configurations"]
Device_Configuration_API[Device_Configuration]-->updateTheFirmwareOfOneOrMoreRouters["POST /devices/configurations/firmware"]
Device_Configuration_API[Device_Configuration]-->deleteAnEntryInTheRouterSystemConfiguration["DELETE /devices/configurations/delete-entry/{MAC}/{NODE}"]
Device_Configuration_API[Device_Configuration]-->retrieveCurrentSystemConfigurationOfARouter["GET /devices/configurations/{MAC}"]
Device_Configuration_API[Device_Configuration]-->editARouterSystemConfiguration["POST /devices/configurations/{MAC}"]
Device_Configuration_API[Device_Configuration]-->getOrUpdateRouterNetworkStatus["GET /devices/configurations/{MAC}/{WIFI_ENABLE}"]

Device_Bandwidth_API[Device_Bandwidth]-->retreiveBandwidthUsageOfDeviceWithRange["GET /devices/usages/bandwidth/{MAC}/{START}/{END}"]
Device_Bandwidth_API[Device_Bandwidth]-->retreiveBandwidthUsageOfDeviceByMAC["GET /devices/usages/bandwidth/{MAC}"]

Device_Group_API[Device_Group]-->createGroup["POST /devices/groups"]
Device_Group_API[Device_Group]-->getAllGroups["GET /devices/groups"]
Device_Group_API[Device_Group]-->getGroupsById["GET /devices/groups/{GROUP_ID}"]
Device_Group_API[Device_Group]-->updateAGroupInformation["PUT /devices/groups/{GROUP_ID}"]
Device_Group_API[Device_Group]-->deleteGroup["DELETE /devices/groups/{GROUP_ID}"]
Device_Group_API[Device_Group]-->bulkDeleteGroups["DELETE /devices/groups/bulk"]
Device_Group_API[Device_Group]-->countDevicesOfAGroup["GET /devices/groups/count/{GROUP_ID}"]

end

subgraph User_API
direction LR
Users_Auth_API[Users_Auth]-->getAPIKeys["GET /users/api-keys"]
Users_Auth_API[Users_Auth]-->login["POST /users/login"]
Users_Auth_API[Users_Auth]-->register["POST /users/registration"]
Users_Auth_API[Users_Auth]-->forgetPassword["GET /users/forget-password"]
Users_Auth_API[Users_Auth]-->verifyEmail["POST /users/verify-email"]
Users_Auth_API[Users_Auth]-->updatePassword["PATCH /users/update-password"]
Users_Auth_API[Users_Auth]-->updateUserInfo["PATCH /users/update-info"]

Users_Report_API[Users_Report]-->createAReportOfAUser["POST /users/reports/{USER_ID}"]
Users_Report_API[Users_Report]-->getAReportOfAUser["GET /users/reports/{USER_ID}"]
Users_Report_API[Users_Report]-->editAReportOfAUser["PUT /users/reports/{USER_ID}"]

Admin_API[Admin]-->createUser["POST /users/admin"]
Admin_API[Admin]-->getAllUsersList["GET /users/admin"]
Admin_API[Admin]-->getUserInfoById["GET /users/admin/{USER_ID}"]
Admin_API[Admin]-->updateUserInfo["PATCH /users/admin"]
Admin_API[Admin]-->deleteUser["DELETE /users/admin"]
Admin_API[Admin]-->activateOrDeActivateUserById["DELETE /users/admin/{ACTIVATION_STATUS}/{USER_ID}"]

end

subgraph Manufacturer_API
direction LR
Manufacturer_API[Admin]-->buyBulkLicenseFromManufacturers["POST /manufacturers/license/purchase/bulk/{MANUFACTURER_NAME}/{LICENSE_TYPE}"]
Manufacturer_API[Admin]-->buySingleLicenseFromManufacturers["POST /manufacturers/license/purchase/{MANUFACTURER_NAME}/{LICENSE_TYPE}"]

end

subgraph Notification_API
direction LR
Device_Notification_API[Device_Notification]-->enableTypesOfNotificationForARouter["POST /notifications/device/enable/{ALERT_TYPE}/{MAC}"]
Device_Notification_API[Device_Notification]-->disableTypesOfNotificationForARouter["POST /notifications/device/disable{ALERT_TYPE}/{MAC}"]
Device_Notification_API[Device_Notification]-->geCurrentNotificationInfoOfARouter["GET /notifications/device/status/{MAC}"]

User_Notification_API[User_Notification]-->sendSystemWideNotifications["POST /notifications/system"]

User_Notification_API[User_Notification]-->customizeNotificationPreferencesOfAUser["PUT /notifications/user/preferences/{user_id}"]
User_Notification_API[User_Notification]-->getNotificationTemplatesForAUser["GET /notifications/users/templates"]
User_Notification_API[User_Notification]-->getNotificationLogs["GET /notifications/users/logs"]
User_Notification_API[User_Notification]-->getBandwidthUsageNotication["GET /notifications/users/bandwidth"]
end
