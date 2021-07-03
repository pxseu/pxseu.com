FROM node:16.3.0

COPY ./packages/web/package.json .
COPY ./yarn.lock .
COPY tsconfig.base.json .

RUN yarn install --frozen-lockfile --non-interactive

COPY ./packages/web .

ARG API_ROUTE=http://localhost:3000

ENV NEXT_PUBLIC_API_ROUTE=${API_ROUTE}
ENV PORT=80
RUN yarn build
RUN yarn install --production --frozen-lockfile --non-interactive --prefer-offline

EXPOSE 80

CMD [ "yarn", "start" ]
