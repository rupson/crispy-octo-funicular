import { 
  initialize,
  isEnabled,
  getVariant,
  getFeatureToggleDefinition,
  getFeatureToggleDefinitions
  } from 'unleash-client';
import express from 'express';
import path from 'path';
const app = express();

const port = process.env.PORT || 8080

const unleashConfig = {
  url: 'http://localhost:4242/api/',
  appName: 'my-app-name',
  instanceId: 'my-unique-instance-id',
  refreshInterval: 1000,
  metricsInterval: 1000
}


const instance = initialize({...unleashConfig});


// // optional events
instance.on('error', console.error);
instance.on('warn', console.warn);
instance.on('ready', console.log);

// // metrics hooks
instance.on('registered', clientData => console.log('registered', clientData));
instance.on('sent', payload => console.log('metrics bucket/payload sent', payload));
instance.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`));



app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/feature-toggles', (_, res) => {
  console.log(`server::get-toggles>>req received. sending toggles`)
  const featureToggles = getFeatureToggleDefinitions();
  const result = featureToggles.map( (ft) => 
    ({name: ft.name, enabled: ft.enabled})
  )
  console.log(`server::get-toggles> result: `, result)
  res.json(result).end()

  // isEnabled('red-things');

  // const { enabled, name, payload } = getVariant('red-things', { userId: '1234' });
  // console.log({enabled, name, payload })

  // const featureToogleX = getFeatureToggleDefinition('red-things');
  // console.log(`red-things>`, featureToogleX)

  // // console.log(`unleahs isntance: >`, instance)

  // console.log(`is red thigns??? > `, instance.isEnabled('red-things', {...unleashConfig, userId: '1', sessionId: '1234'}));
  // res.send('hi')
})



app.listen(port, () => console.log(`Listening on port ${port}`));