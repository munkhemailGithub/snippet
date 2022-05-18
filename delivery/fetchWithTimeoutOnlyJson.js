import fetch from 'node-fetch';
import LogService from '../lib/logService';

const logger = new LogService('chatbot_delivery_service')
const fetchWithTimeoutOnlyJson = (url, options, timeout = 10000) => {
    return Promise.race([
        fetch(url, options)           
            .then((res) => res.json())
            .then((json) => {
                return  json 
            })
            .catch((err) => {
                logger.error('fetchWithTimeout error', err.message)
                return { code: 1001, message: err.message, error: true }
            }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Сервер хариу өгсөнгүй!')), timeout)
        ).catch((err) => {
            return { code: 1001, message: err.message, error: true }
        })
    ]);
}

export default fetchWithTimeoutOnlyJson