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

CreateThread(function()
    while true do
        Wait(0)

        if uiOpen and IsControlJustPressed(0, 322) then
            setUiVisible(false)
        end
    end
end)
