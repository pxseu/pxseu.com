FROM node:16.3.0

COPY ./packages/api/package.json .
COPY ./yarn.lock .
COPY tsconfig.base.json .

RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive

COPY ./packages/api .

RUN yarn build

EXPOSE 80

CMD [ "yarn", "start" ]
