import { request } from './helpers';

const API_KEY = '21310703-eb2542faa873a37e647429bbc';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';

export default {
    async searchImages(query, page) {
        return request(`${BASE_URL}&key=${API_KEY}&q=${query}&page=${page}`);
    }
};