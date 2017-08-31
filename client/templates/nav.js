Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      console.log("check active")
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
  }
});
