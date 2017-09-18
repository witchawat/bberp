import SimpleSchema  from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

ItemCategories = new Mongo.Collection("itemcategories");
ItemCategories.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  }
}, { tracker: Tracker }));
