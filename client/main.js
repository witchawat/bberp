// Subscription to Server's publication
//Load Last (main.js file name)

import '../imports/accounts-config.js';
import '../imports/router.js';

//AutoForm Hooks Configuration

var hooksObject = {
  // Called when any submit operation succeeds
  before: {},

  onSuccess: function(formType, result) {
    FlashMessages.sendSuccess('Success!');
    Router.go("/");
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log("Submit Error :" + error);
  },

};

AutoForm.addHooks('insertProductForm', hooksObject);

//Flash Messages GLOBAL Config
FlashMessages.configure({
  autoHide: true,
  hideDelay: 5000,
  autoScroll: true
});
