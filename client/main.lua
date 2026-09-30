local uiOpen = false

local function setUiVisible(visible)
    uiOpen = visible
    SetNuiFocus(visible, visible)

    SendNUIMessage({
        action = visible and 'ui:open' or 'ui:close',
    })
end

RegisterCommand('nui', function()
    setUiVisible(not uiOpen)
end, false)

RegisterKeyMapping('nui', 'Open FiveM React NUI', 'keyboard', 'F2')

RegisterNUICallback('ui:close', function(_, cb)
    setUiVisible(false)
    cb({ ok = true })
end)

RegisterNUICallback('nui:ping', function(data, cb)
    cb({
        ok = true,
        message = 'pong',
        received = data,
    })
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SetNuiFocus(false, false)
    end
end)
