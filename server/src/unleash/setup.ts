import { initialize } from 'unleash-client';

const unleashConfig = {
    url: 'http://localhost:4242/api/',
    appName: 'my-app-name',
    instanceId: `${Math.floor(Math.random()*101)}`,
    refreshInterval: 1000,
    metricsInterval: 1000
}


export const createUnleashInstance = () => {
    const unleashInstance = initialize({...unleashConfig})

    // // optional events
    unleashInstance.on('error', console.error);
    unleashInstance.on('warn', console.warn);
    unleashInstance.on('ready', console.log);
    
    // // metrics hooks
    unleashInstance.on('registered', clientData => console.log('registered', clientData));
    unleashInstance.on('sent', payload => console.log('metrics bucket/payload sent', JSON.stringify(payload)));
    unleashInstance.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`));

    return unleashInstance
};


