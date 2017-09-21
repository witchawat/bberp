Template.NewProduct.helpers({
  itemcategories: function(){
    //Subscribe here first
    //return all Categories
    return ItemCategories.find();
  },
  uoms: function(){
    return UoM.find();
  },
  suppliers: function(){
    return Suppliers.find();
  },
  products: function(){
    return Products.find();
  },
});

Template.NewProduct.events({
  //Submit and Add to Database
  'submit form': function(event, template){
    event.preventDefault();
    selectedSup =  $(".multiselect").select2("val");
    selectedUoM = UoM.findOne({_id: event.target.uomid.value });
    console.log(selectedUoM)
    //put in doc Object {name: xxx , category: xxx , ...}
    var doc = { name: event.target.name.value,
                category: event.target.category.value,
                suppliers: selectedSup,
                uomid: selectedUoM,
              };
    console.log(doc);
    Products.insert(doc, function( error, result ){
      if (error) {
        console.log(error);
      } else {
        console.log("Insert Success");
        console.log(result);
        FlashMessages.sendSuccess("Product >>> " + event.target.name.value + " <<< has been added successfully!");
        Router.go('/products');
      }
    });

    },
});

Template.listProducts.helpers({
  settings: function(){
    return {
      rowsPerPage: 20,
      showFilter: true,
      class: 'table table-condensed table-hover',
      fields: [
        {key: 'name', label: 'Product Name'},
        {key: 'category', label: 'Item Category'},
        {key: 'suppliers', label: 'Suppliers'},
        {key: 'totalQuantity', label: 'Total Quantity'},
        {key: 'uomid.name', label: 'Unit of Measurement'},
        {key: 'createdAt', label: 'Created At'},
        // {key: 'menu', label: 'Menu', fn: function() {
        //   return new Spacebars.SafeString('<a href="/products/+{_id.value}">View</a>  ')
        //   }
        // },
        {key: 'menu', label: 'Menu', tmpl: Template.menuTemplate},
      ]
    };
  },
  products: function(){
    return Products.find();
  },
});

Template.listProducts.events({
  "click .delete": function(){
    console.log(this._id);
    Products.remove(this._id);
  },
});

Template.showProduct.helpers({
  productlot: function(){
    return Lots.find({"productid": this._id});
  },
  // settings: function(){
  //   return {
  //     rowsPerPage: 20,
  //     showFilter: true,
  //     class: 'table table-condensed table-hover',
  //     fields: [
  //       {key: 'name', label: 'Product Name'},
  //       {key: 'category', label: 'Item Category'},
  //       {key: 'suppliers', label: 'Suppliers'},
  //       {key: 'totalQuantity', label: 'Total Quantity'},
  //       {key: 'uomid.name', label: 'Unit of Measurement'},
  //       {key: 'createdAt', label: 'Created At'},
  //       // {key: 'menu', label: 'Menu', fn: function() {
  //       //   return new Spacebars.SafeString('<a href="/products/+{_id.value}">View</a>  ')
  //       //   }
  //       // },
  //       {key: 'menu', label: 'Menu', tmpl: Template.menuTemplate},
  //     ]
  //   };
  // },
})
