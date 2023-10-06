%%{
init: {
'theme': 'base',
'themeVariables': {
'primaryColor': '#3498db', // Primary color (e.g., for headings)
'primaryTextColor': '#fff', // Text color on primary background
'primaryBorderColor': '#2c3e50', // Border color for primary elements
'lineColor': 'red', // Color for lines or separators
'secondaryColor': '#2ecc71', // Secondary color (e.g., for buttons)
'tertiaryColor': '#ecf0f1' // Tertiary color (e.g., for backgrounds)
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
        /devices
        /devices/info
        /devices/update
        /devices/count
        /devices/move
        /devices/delete
        /devices/retrieve
        /devices/address
        /devices/connected
        /devices/connected-by-model
        /devices/connected-by-network-type
        /devices/tags/assign-multiple
        /devices/tags/assign-one
        /devices/tags/get-per
        /devices/online
        /devices/offline
        /devices/gps-location
    end

    subgraph Device_CMD_API
        direction LR
        /devices/cmd/retrieve-network-info
        /devices/cmd/reboot
        /devices/cmd/push-configuration
        /devices/cmd/update-firmware
    end

    subgraph User_API
        direction LR
        /users/api-keys
        /users/login
        /users/registration
        /users/forget-password
        /users/verify-email
    end

    subgraph Manufacturer_API
        direction LR
        /devices/license/assign
        /devices/license/assign-bulk
        /devices/license/transfer
        /devices/license/renew
        /devices/license/delete
        /devices/license/delete-bulk
        /devices/license/user-details
    end

    subgraph Report_Generation_API
        direction LR
        /reports/generate
        /reports/user-report
    end

    subgraph Alert_API
        direction LR
        /alerts/enable
        /alerts/current-info
    end

    subgraph Bandwidth_API
        direction LR
        /bandwidth/usage-with-range
        /bandwidth/usage-by-mac
    end

    subgraph Group_API
        direction LR
        /groups/create
        /groups/all
        /groups/by-id
        /groups/update
        /groups/delete
        /groups/delete-bulk
        /groups/device-count
        /groups/plan-create
        /groups/plan-update-delete
    end

    subgraph Synchronizations
        direction LR
        /synchronizations/ping-status
        /synchronizations/delete-entry
        /synchronizations/current-configuration
        /synchronizations/edit-configuration
    end
