Template.ItemCategoriesIndex.helpers({
  itemcategories: function(){
    return ItemCategories.find({});
  }
});

Template.ItemCategoriesIndex.events({
  "click .delete": function(){
    console.log(this._id);
    ItemCategories.remove(this._id);
  }
});
