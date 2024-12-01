FROM node:18-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 3000
EXPOSE 433
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]

