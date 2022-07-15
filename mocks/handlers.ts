import { rest } from "msw";

const BASE_URL = "http://localhost:3000/api";

export const handlers = [
  rest.get(`${BASE_URL}/ping`, (req, res, ctx) => {
    return res(ctx.json("pong!"));
  }),
];
