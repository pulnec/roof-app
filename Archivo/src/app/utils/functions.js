
import { promises as fs } from 'fs';


const readConfig = async () => {
    try {
        const file = await fs.readFile(process.cwd() + '/src/app/config/config.json', 'utf8');
        const data = JSON.parse(file);
        return data;
    } catch {
        return new Error('config not valid');
    }
}

export {
    readConfig,
}