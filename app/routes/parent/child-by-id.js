import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ChildByIdRoute extends Route {
  @service router;

  beforeModel(transition) {
    const parent = this.modelFor('parent');
    transition.abort();
    this.router.transitionTo('parent.other', parent.id);
  }
}
