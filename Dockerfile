FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install @angular/cli@14.0.2
RUN npm install
RUN npm run build

FROM nginx
COPY --from=node /app/dist/alpha-task-frontend /usr/share/nginx/html
