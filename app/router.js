import EmberRouter from '@embroider/router';
import config from 'router-params-repro/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('parent', { path: '/parent/:id' }, function () {
    this.route('child');
    this.route('child-by-id');
    this.route('other');
  });
});
