import SimpleSchema  from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

UoM = new Mongo.Collection("uom");
UoM.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "UoM Name",
    max: 200
  },
  unit: {
    type: Number,
    label: "Value",
  },
  unitname: {
    type: String,
    label: "Unit",
    allowedValues: ['Unit', 'kg' , 'Litre']
  },
  displayuom:{
    type: String,
    label: "UoM",
    autoValue: function(doc){
      console.log(doc);
      return doc.name + " - " + doc.unit + " " + doc.unitname + "/" + doc.name;
    },
    }
  }
));
