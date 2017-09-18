import SimpleSchema  from 'simpl-schema';

Products = new Mongo.Collection("products");
Products.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Product Name",
    max: 200
  },
  suppliers: {
    type: Array,
    label: "Suppliers",
  },
  'suppliers.$' : {type: String},

  category: {
    type: String,
    label: "Category"
  },
  // Unit: unit , 50kg bag, 25kg bag, 22.5kg barrel etc...
  uomid: {
    type: Object,
    label: "Unit of Measurement",
    blackbox: true
  },

  // uom weight: 50 , 25 , 22.5
  totalQuantity: { //In Unit
    type: Number,
    label: "Total Quantity",
    defaultValue: 0,
    optional: true,
  },
  // totalWeight: { //Auto Unit x Weight
  //   type: Number,
  //   label: "Total Weight",
  //   autoValue: function() {
  //     if (this.isUpdate) {
  //       return schema.get('products','totalQuantity') * schema.get('products','weight');
  //     }
  //   },
  //   denyInsert: true,
  //   optional: true
  // },
  price: { //Last Price that buy/sell
    type: Number,
    label: "Price",
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
    optional: true,
  },
  'lots.$':{
    type: Object,
    blackbox: true
  },
  //end LOT
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        console.log("logging date")
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
