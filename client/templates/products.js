Template.NewProduct.helpers({
  listCategories: function(){
    //Subscribe here first
    //return all Categories
    return ItemCategories.find().map(function(doc){
      return {label: doc.name, value: doc.name};
    });
  },
  listUoMs: function(){
    //Subscribe here first
    //return all UoMs
    return UoM.find().map(function(doc){
      return {label: doc.name + " - " + doc.unit, value: doc.unit};
    });
  },
  getWeight: function(){
    console.log(AutoForm.getFormValues(insertProductForm));
    return $('#selectuom option:selected').text();
  }
});
