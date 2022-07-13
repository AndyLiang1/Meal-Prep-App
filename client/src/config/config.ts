

const ENV: string = process.env.ENV || '';

export const config = {
    client: {
        env: ENV,
    }
};