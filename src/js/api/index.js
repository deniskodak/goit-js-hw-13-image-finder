import { createErrorNotification } from 'Js/notification';
const API_KEY = '21310703-eb2542faa873a37e647429bbc';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';

const getRequest = async (searchQuery, page) => {
  const rawResult = await fetch(
    `${BASE_URL}&key=${API_KEY}&q=${searchQuery}&page=${page}`,
  );

  if (!rawResult.ok) {
    throw rawResult;
  }

  return await rawResult.json();
};

class Api {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async fetch() {
    try {
      const { hits } = await getRequest(this.query, this.page);
      return [...hits];
    } catch (error) {
      return createErrorNotification(`Api error \n ${String(error)}`);
    }
  }
}

export default Api;
