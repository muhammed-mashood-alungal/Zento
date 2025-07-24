import dotenv from 'dotenv'
dotenv.config()

export const env = {
    get PORT(){
        return process.env.PORT
    },
    get DATABASE_USER(){
        return process.env.DATABASE_USER
    },
    get DATABASE_PASSWORD(){
        return process.env.DATABASE_PASSWORD
    },
    get DATABASE_NAME(){
        return process.env.DATABASE_NAME
    },
    get DATABASE_HOST(){
        return process.env.DATABASE_HOST
    },
    get CLIENT_ORIGIN(){
        return process.env.CLIENT_ORIGIN
    }
}