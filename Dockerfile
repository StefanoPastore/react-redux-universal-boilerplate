FROM node:6.4

# Create app user
RUN useradd --user-group --create-home --shell /bin/false app

# Set HOME ENV
ENV HOME=/home/app

# Install app dependencies
COPY package.json npm-shrinkwrap.json $HOME/app/
RUN chown -R app:app $HOME/*

# Set user and Workdir to /home/app/app
USER app
WORKDIR /home/app/app

# Install modules
RUN npm install

# Copy app sources
USER root
COPY . $HOME/app
RUN chown -R app:app $HOME/*
USER app

EXPOSE 3000

CMD [ "npm", "start" ]
