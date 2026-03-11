# Stage 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# install Python and build tools for native modules
RUN apk add --no-cache python3 make g++
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production stage using Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
