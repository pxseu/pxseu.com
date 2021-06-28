FROM node:16.3.0

COPY ./packages/web/package.json .
COPY ./yarn.lock .
COPY tsconfig.base.json .

RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive

COPY ./packages/web .

ENV PORT 80
ENV NEXT_PUBLIC_API_ROUTE https://www.pxseu.com/api

RUN yarn build

RUN yarn install --production --ignore-scripts --frozen-lockfile --non-interactive --prefer-offline

EXPOSE 80

CMD [ "yarn", "start" ]
