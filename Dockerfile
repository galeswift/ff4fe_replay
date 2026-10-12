# Production image for the replay site, deployed by Coolify on every push to main.
# Builds with Node 12 (what the old droplet used), then serves the static build with nginx.
# The site is public at www.ff4fedraft.com/replay, so its asset URLs start with /replay.
FROM node:12.22.12-bullseye AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV PUBLIC_URL=/replay
RUN npm run build

FROM nginx:1.27.5-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
