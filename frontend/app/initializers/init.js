function initialize(container, app) {
    app.inject('component', 'cableService', 'service:cable');
    app.inject('route', 'cableService', 'service:cable');
}

export default {
  name: 'init',
  initialize: initialize
};
