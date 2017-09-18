import SimpleSchema  from 'simpl-schema';

Lots = new Mongo.Collection("lots");
Lots.attachSchema(new SimpleSchema({
  txtype: {
    type: String,
    label: "Transaction Type in/out",
  },
  docdate: {
    type: Date,
    label: "Lot Receive Date",
  },
  productid: {
    type: String,
    label: "Product ID",
  },
  supplier: {
    type: String,
    label: "Supplier",
  },
  name: {
    type: String,
    label: "Product Name",
  },
  quantity: {
    type: Number,
    label: "Lot Quantity",
  },
  lotno: {
    type: String,
    label: "Lot No",
  },
  expdate: {
    type: String,
    label: "Expire Date",
  },
  createdAt: {
    type: Date,
    autoform: { type: 'hidden' },
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
}));
