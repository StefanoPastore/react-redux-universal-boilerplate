## React Redux Universal Boilerplate

## About
This is a starter boilerplate app I've put together using the following technologies:
* [Doker](https://docs.docker.com/ "Docker") to avoid surprises in production
* ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering
* Both client and server make calls to load data from separate API server
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [ESLint](http://eslint.org) to maintain a consistent code style
* [Webpack](http://webpack.github.io) for bundling
* [Express](http://expressjs.com)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [i18n](http://i18next.com/docs/)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader)

## Requirments
  - [Download Doker](https://docs.docker.com/engine/installation/ "Docker")

### Installation
```
yarn
docker-compose build
```

### run app
```
docker-compose up
```

### Storybook
```
npm run storybook
```

### Usage
Go to http://localhost:3000 for development and go to http://localhost:1818 for storybook.

---

### NB
Files `src/styles/settings/variables` and `src/styles/settings/palette` must exist because they serve to inject global variables on SASS scope.

### DEVELOPMENT
All changes in development mode will applied in real time.

To update or install node modules launch `docker-compose exec web bash` when container is up, now we can launch `yarn [add|upgrade] [package]` and we have new/updated module in container, in package.json and in yarn.lock.

## ATTENTION
Always check the process isn't stopped when server files are changed, in case repeat `run app` actions.
