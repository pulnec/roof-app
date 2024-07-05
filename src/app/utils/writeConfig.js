import axios from 'axios';

const writeConfig = async (nextPosition) => {
    const { data } = await axios.post('/api', { nextPosition });
    return data;
}

export default writeConfig;