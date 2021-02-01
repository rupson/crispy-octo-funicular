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
  instanceId: `${Math.floor(Math.random()*101)}`,
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
instance.on('sent', payload => console.log('metrics bucket/payload sent', JSON.stringify(payload)));
instance.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`));


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/feature-toggles', (req, res) => {
  console.log(`server::get-toggles>>req received. sending toggles`)
  console.log(`req.query`, req.query)
  const userId = req.query['userId'] as string
  const featureToggles = getFeatureToggleDefinitions();
  let result = featureToggles.map( (ft) => 
    ({name: ft.name, enabled: ft.enabled})
  )

  const isRedThings = isEnabled('red-things', {userId})
  console.log(`isRedThings >`, isRedThings)
  console.log(`userId: >`, userId)
  result = [{name: 'red-things', enabled: isRedThings}, {name: 'green-circle', enabled: isEnabled('green-circle', {userId})}]

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