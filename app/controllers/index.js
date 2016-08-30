import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  studyId: null,
  participantId: null,
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  showLanguageSelector: true,
  selectedLanguage: null,
  locale: null,
  actions: {
    authenticate(attrs) {
      var _this = this;
      this.get('session')
        .authenticate('authenticator:jam-jwt', attrs)
        .then(() => this.transitionToRoute('participate'))
        .catch(function(e) {
          if (e.status === 404) {
            _this.send('toggleInvalidAuth');
          } else if (e.name === 'TransitionAborted') {
            _this.send('toggleInvalidLocale');
          }
        });
    },
    toggleInvalidAuth() {
      this.toggleProperty('invalidAuth');
    },
    toggleInvalidLocale() {
      this.toggleProperty('invalidLocale');
    },
    toggleLanguageSelector() {
      this.toggleProperty('showLanguageSelector');
    },
    selectLanguage(language, code) {
      this.setProperties({
        showLanguageSelector: false,
        selectedLanguage: language,
        locale: code
      });
    }
  }
});
