Template.NewProduct.helpers({
  listCategories: function(){
    //Subscribe here first
    //return all values
    return ItemCategories.find().map(function(doc){
      return {label: doc.name, value: doc.name};
    });
  }
});
