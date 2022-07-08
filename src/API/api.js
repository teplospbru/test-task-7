import * as axios from 'axios';

const KEY = 'a0610a93-7fab-46ea-88e9-3be815e1fc5a';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images',
  headers: {
    'x-api-key': KEY
  }
});

// Получаем всех котиков
export const  getCats = (currentPage) => {
  return instance.get('/search', {
    params: {
      limit: 20,
      page: currentPage,
      category_ids: [1,2],
      mime_types: ['png'],
      size: 'thumb'
      }
  });
}

// Получаем конкретного котика
export const  getParticularCat = (id) => {
  return instance.get(`/${id}`, {
    params: {
      size: 'full'
      }
  });
}