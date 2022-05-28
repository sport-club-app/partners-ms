FROM node:14-slim


SHELL [ "/bin/bash", "-c" ]

USER node

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

RUN npm run build


ENV HOST=localhost
ENV APP_HOST=http://localhost
ENV APP_PORT=3001
ENV DB_HOST=partners-db
ENV DB_ENGINE=mysql
ENV DB_PORT=3306
ENV DB_USER=partners
ENV DB_DATABASE=partners
ENV DB_PASSWORD=partners
ENV NODE_ENV=production

# RUN chmod +x ./.docker/entrypoint.sh
# RUN /bin/bash ./.docker/entrypoint.sh

EXPOSE 3001

CMD npm start