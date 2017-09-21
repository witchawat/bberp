import SimpleSchema  from 'simpl-schema';

Receive = new Mongo.Collection("receive");
Receive.attachSchema(new SimpleSchema({
  docdate: {
    type: Date,
    label: "Document Date",
  },
  supplier: {
    type: String,
    label: "Supplier",
  },
  receiveItems:{
    type: Array,
    label: "Receive Lot",
  },
  'receiveItems.$':{
    type: Object,
    blackbox: true,
  },
  receiveLotId:{
    type: Array,
    label: "Receive Lot IDs",
  },
  'receiveLotId.$':{
    type: String,
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
