import { boot } from 'quasar/wrappers'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'

// @feathersjs/client is exposed as the `feathers` global.
const appFeathers = feathers()
const socket = io('http://localhost:3030', { transports: ['websocket'] })

// Configure an AJAX library (see below) with that client
appFeathers.configure(socketio(socket))

appFeathers.configure(auth({
  storage: window.localStorage
}))

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$feathers = appFeathers
})
