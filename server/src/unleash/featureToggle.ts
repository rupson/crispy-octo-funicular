import {isEnabled, getFeatureToggleDefinitions} from 'unleash-client'
import {Request, Response} from 'express'

const handler = (req: Request, res: Response) => {
    console.log(`server::get-toggles>>req received. sending toggles`)
    console.log(`req.query`, req.query)
    const userId = req.query['userId'] as string
    console.log(`userId: >`, userId)
    const featureToggles = getFeatureToggleDefinitions();
    const toggleNames = featureToggles.map( (ft) => ft.name)
    const result = toggleNames.map( (name) => ({name, enabled:isEnabled(name, {userId}) }))
    console.log(`server::get-toggles> result: `, result)
    res.json(result).end()
}

export default handler