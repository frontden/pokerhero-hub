FROM node:20

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY packages/ph-hub-common/package.json ./packages/ph-hub-common/
COPY packages/ph-hub-front/package.json ./packages/ph-hub-front/
COPY packages/ph-hub-back/package.json ./packages/ph-hub-back/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

WORKDIR /app/packages/ph-hub-common
RUN pnpm run build

WORKDIR /app/packages/ph-hub-back

EXPOSE 3000

CMD ["pnpm", "start:dev"]