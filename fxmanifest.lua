fx_version 'cerulean'
game 'gta5'

lua54 'yes'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/*'
}

client_script 'client/main.lua'
server_script 'server/main.lua'

shared_script 'shared/config.lua'
