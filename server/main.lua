RegisterNetEvent('fivem-react-nui:server:example', function(payload)
    local source = source

    TriggerClientEvent('fivem-react-nui:client:example', source, {
        ok = true,
        received = payload,
    })
end)
