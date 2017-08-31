Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('home');
});

Router.route("/products/new", function() {
  this.render('NewProduct');
});

//SETTINGS
Router.route("/suppliers/", function() {
  this.render('SuppliersIndex');
});

Router.route("/uoms/", function() {
  this.render('UoMIndex');
});

Router.route("/itemcategories/", function() {
  this.render('ItemCategoriesIndex');
});
