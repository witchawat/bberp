import SimpleSchema  from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Products = new Mongo.Collection("products");
Products.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Product Name",
    max: 200
  },
  category: {
    type: String,
    label: "Category"
  },
  // Unit: unit , 50kg bag, 25kg bag, 22.5kg barrel etc...
  unit: {
    type: String,
    label: "Unit of Measurement",

  },
  // uom weight: 50 , 25 , 22.5
  weight: {
    type: Number,
    label: "Weight of 1 unit of product",
  },
  totalQuantity: { //In Unit
    type: Number,
    label: "Total Quantity",
    optional: true,
  },
  totalWeight: { //Auto Unit x Weight
    type: Number,
    label: "Total Weight",
    autoValue: function() {
      if (this.isUpdate) {
        return schema.get('products','totalQuantity') * schema.get('products','weight');
      }
    },
    denyInsert: true,
    optional: true
  },
  // lots: [
  //   {
  //     no: "34/2017",
  //     uom
  //     quantity: "421",
  //     receiveDate: 30/08/2017,
  //     expDate: 1/09/2018
  // ]
  lots:{
    type: Array,
    optional: true
  },
  'lots.$': Object,
  'lots.$.no': String,
  'lots.$.quantity': String,
  'lots.$.receiveDate': Date,
  'lots.$.expireDate': Date,
  //end LOT
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
}, { tracker: Tracker }));
