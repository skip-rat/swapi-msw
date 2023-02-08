import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { rest, setupWorker } from 'msw'

const worker = setupWorker(
  rest.get(
    'http://swapi.dev/api/people/1',    
    (req, res, ctx) => {
      return res(
        ctx.json({
          name: 'Luke Skywalker',
        }),
      )
    },
  ),
)

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

test('renders and displays Luke Skywalker', async () => {
  render(<App />);
  await screen.findByRole('heading', {name: 'Luke Skywalker'});
});

test('handles server error',
  async () => {
    worker.use(
      rest.get('http://swapi.dev/api/people/1', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    render(<App />)

    screen.queryByRole('alert', { name: "Oops... something went wrong, try again 🤕" })
  })

  test('handles teapot error',
  async () => {
    worker.use(
      rest.get('http://swapi.dev/api/people/1', (req, res, ctx) => {
        return res(ctx.status(418))
      }),
    )

    render(<App />)

    screen.queryByRole('alert', { name: "418 I'm a tea pot 🫖, silly" })
  })

