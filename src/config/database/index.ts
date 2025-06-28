import {DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD} from "@/config";

export const dbConnection = {
    url: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};