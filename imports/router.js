Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('home');
});

Router.route("/products/new", function() {
  this.render('NewProduct');
}, {name: 'products.new'
});

Router.route("/products/", function() {
  this.render('listProducts');
}, {name: 'products.index'
});

Router.route("/products/:_id", function(){
  var product = Products.findOne({_id: this.params._id});
  this.render('showProduct', {
    data: function(){
      return Products.findOne({_id: this.params._id});
    }
  });
}, {name: 'products.show'
});

//Transfer Raw Mats OUT
Router.route("/transfer/raw/", function() {
  this.render('transferForm_Raw');
}, {name: 'transfer.new.raw'
});

//Transfer Packaging OUT
Router.route("/transfer/pkg/", function() {
  this.render('transferForm_Pkg');
}, {name: 'transfer.new.pkg'
});

// RECEIVE NEW PRODUCT
Router.route("/receive/", function() {
  this.render('receiveIndex');
}, {name: 'receive.index'
});

Router.route("/receive/new", function() {
  this.render('receiveForm');
}, {name: 'receive.new'
});


//SETTINGS
Router.route("/suppliers/", function() {
  this.render('SuppliersIndex');
}, {name: 'suppliers.index'
});

Router.route("/uoms/", function() {
  this.render('UoMIndex');
}, {name: 'uoms.index'
});

Router.route("/itemcategories/", function() {
  this.render('ItemCategoriesIndex');
}, {name: 'itemcategories.index'
});

Router.route("/docdate/", function() {
  this.render('DocDateIndex');
}, {name: 'docdate.index'
});
