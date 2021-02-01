
import express from 'express';
import path from 'path';
import featureToggleHandler from './unleash/featureToggle'
import {createUnleashInstance} from './unleash/setup'

const app = express();

const port = process.env.PORT || 8080

createUnleashInstance()

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/feature-toggles', featureToggleHandler)


app.listen(port, () => console.log(`Listening on port ${port}`));