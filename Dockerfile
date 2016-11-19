FROM node:6.9

# Create app user and install yarn
RUN mkdir /app && \
    useradd -m --user-group --shell /bin/false app && \
    npm install -g --progress=false yarn

# Install app dependencies
COPY package.json yarn.lock .npmrc /app/
RUN chown -R app:app /app

# Set user and Workdir to /app
USER app
WORKDIR /app

#Set ENV
ARG NODE=production
ENV NODE_ENV ${NODE}

# Install modules
RUN yarn

# Copy app sources
USER root
COPY . /app/
RUN chown -R app:app /app
USER app

EXPOSE 3000

CMD [ "npm", "start" ]
