import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Books } from './collections/Books';

new Tabular.Table({
  name: "Suppliers",
  collection: Suppliers,
  columns: [
    {data: "name", title: "Supplier Name"},
    {data: "email", title: "E-mail"},
    {data: "contactName", title: "Contact Name"},
    {data: "phone", title: "Phone No"},
    {data: "address", title: "Address"},
    // {
    //   tmpl: Meteor.isClient && Template.bookCheckOutCell
    // }
  ]
});

new Tabular.Table({
  name: "ItemCategories",
  collection: ItemCategories,
  columns: [
    {data: "name", title: "Item Category"},
    // {
    //   tmpl: Meteor.isClient && Template.bookCheckOutCell
    // }
  ]
});

new Tabular.Table({
  name: "UnitofMeasurement",
  collection: UoM,
  columns: [
    {data: "name", title: "UoM Name"},
    {data: "unit", title: "Unit"},
    {data: "unitname", title: "Unit Name"},
    {data: "displayuom", title: "Display Name"},
    {
      title: "Menu",
      tmpl: Meteor.isClient && Template.UoM_deleteButton
    }
  ]
});

new Tabular.Table({
  name: "Products",
  collection: Products,
  columns: [
    {data: "name", title: "Product Name"},
    {data: "category", title: "Item Category"},
    {data: "suppliers", title: "Suppliers"},
    {data: "totalQuantity", title: "Quantity"},
    {data: "uomid.displayuom", title: "UoM"},
    {data: "createdAt", title: "Created At"},

  ]
});
