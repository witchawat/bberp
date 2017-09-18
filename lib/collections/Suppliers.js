import SimpleSchema  from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Suppliers = new Mongo.Collection("suppliers");
Suppliers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Supplier Name",
    max: 200
  },
  email: {
    type: String,
    label: "E-mail",
    regEx: SimpleSchema.RegEx.EmailWithTLD
  },
  phone: {
    type: String,
    label: "Phone Number",

  },
  contactName: {
    type: String,
    label: "Contact Name",
  },
  address: {
    type: String,
    label: "Address",
    optional: true,
    max: 1000
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
