import SimpleSchema  from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

DocDate = new Mongo.Collection("docdate");
DocDate.attachSchema(new SimpleSchema({
  docName: {
    type: String,
    label: "Document Name",
    max: 200
  },
  docId: {
    type: Number,
    label: "Current Document Number"
  },
  nextId: {
    type: String,
    autoValue: function() {
      if (this.isUpdate) {
        let id = this.docId + 1;
        let year = new Date().getFullYear();
        return id + "/" + year;
      }
    },
    denyInsert: true,
    optional: true
  }
}, { tracker: Tracker }));
