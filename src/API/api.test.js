import "whatwg-fetch";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { getCats, getParticularCat } from './api';

// Настройка фейкового сервера
const server = setupServer(
    rest.get('https://api.thecatapi.com/v1/images/search', (_req, res, ctx) => {
      return res(
        ctx.status(200), 
        ctx.json([{id: 1, url: 'https://image-1.png'}, {ig: 2, url: 'https://image-2.png'}])
      )
    }),
    rest.get('https://api.thecatapi.com/v1/images/1', (req, res, ctx) => {
      const size = req.url.searchParams.get('full')
      return res(
        ctx.status(200), 
        ctx.json({id: 1, url: 'https://image-1.png', size: 'full'})
      )
    }),
    rest.get("*", (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(
          ctx.status(500),
          ctx.json({ error: "You must add request handler." })
        );
      })
  );
  
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());


// Тестируем API
describe('fetches correctly', () => {
    it('fetches all cats', async () => {
      const response = await getCats(0);
      const { data } = await response;

      expect(data.length).toBe(2);
      expect(data[1].url).toEqual('https://image-2.png')
    })
    it('fetches particular cat', async () => {
        const response = await getParticularCat('1');
        const { data } = await response;

        expect(data.id).toEqual(1)
      })
  })

  export { server, rest };