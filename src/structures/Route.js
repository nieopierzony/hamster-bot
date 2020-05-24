module.exports = class Route {

  constructor(options, client) {
    this.name = options.name;
    this.parentRoute = options.parent || '';

    this.client = client;

    this.subRoutes = null;
    this.requirements = null;
  }

  get path() {
    const fullPath = `${this.parentRoute ? '' : '/api'}${
      this.parentRoute ? this.parentRoute.path : ''
      }/${this.name}`;

    return fullPath;
  }

  _register(app) {
    if (this.subRoutes) {
      this.subRoutes.forEach(route => {
        route._register(app);
      });
    }

    this.register(app);
  }
};

