import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
    origin: '*',
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export default async function applyCors(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    await runMiddleware(req, res, cors)
    return fn(req, res)
}
