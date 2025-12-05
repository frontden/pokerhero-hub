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

WORKDIR /app/packages/ph-hub-front

EXPOSE 4200

CMD ["pnpm", "start", "--host", "0.0.0.0"]