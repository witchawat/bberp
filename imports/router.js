Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('home');
});

Router.route("/products/new", function() {
  this.render('NewProduct');
});


Router.route("/suppliers/new", function() {
  this.render('NewSupplier');
});

Router.route("/suppliers/", function() {
  this.render('SuppliersIndex');
});
