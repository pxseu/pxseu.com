FROM oven/bun:1.3.2

WORKDIR /app

# Install from the workspace root so Bun can resolve workspace:* deps.
COPY package.json bun.lock* ./
COPY patches ./patches
COPY client/package.json ./client/package.json
COPY shared/package.json ./shared/package.json
COPY server/package.json ./server/package.json
RUN bun install --frozen-lockfile --production

COPY shared ./shared
COPY server ./server

WORKDIR /app/server

EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]
