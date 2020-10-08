# Note: For starting proxy
# sudo docker run -d -p 3000:3000 --name sdc-proxy sdc-proxy

FROM node:12
WORKDIR /home/ec2-user/sdc-proxy

# Environment variables to pass to node server
ENV PORT=3000
# Install dev dependencies, but run with NODE_ENV=production (package.json script) to get improved performance from templating engine
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD npm start
