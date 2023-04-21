import { debug, setFailed } from "@actions/core";
import fs from 'fs';

(
    async () => {
        try {
            const data = fs.readFileSync('./plag.json', { encoding:'utf8', flag:'r' });
            console.log(data);

            return data;

        } catch (error) {
            setFailed(error.message);
        }
    }

)();