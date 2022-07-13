import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || ''
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.l8h5c.mongodb.net/Meap_Prep_App?retryWrites=true&w=majority`
const SERVER_PORT: number = Number(process.env.PORT) ? Number(process.env.PORT) : 4000
const ENV: string = process.env.ENV || ''
const JWT_SECRET = process.env.JWT_SECRET || ''

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        env: ENV,
        JWT_SECRET,
    }
};