/* Initialize the unleash client */
import { initialize } from 'unleash-client'
const instance = initialize({
    url: 'http://localhost:4242/api/',
    appName: 'crispy-octo-funicular',
    // instanceId: '1234'
})

/* Optional events */
instance.on('error', console.error)
instance.on('warn', console.warn)
instance.on('ready', console.log)
console.log('hostname', process.env.HOSTNAME)

/* Metric Hooks */
instance.on('registered', clientData => { console.log('registered', clientData) })
instance.on('sent', payload => console.log('metrics bucket/payload sent', payload))
instance.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`))