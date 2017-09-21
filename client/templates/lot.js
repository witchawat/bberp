Template.lotIndex.helpers({
  settings: function(){
    return {
      rowsPerPage: 20,
      showFilter: true,
      class: 'table table-condensed table-hover',
      fields: [
        {key: 'docdate', label: 'Recieve Date', fn: function(value, object, key){
          return moment(value).format("dddd DD MMMM YYYY");
        }},
        {key: 'supplier', label: 'Supplier'},
        {key: 'name', label: 'Product Name'},
        {key: 'lotno', label: 'Lot No.'},
        {key: 'quantity', label: 'Lot Quantity'},
        {key: 'expdate', label: 'Expire Date'}


        // {key: 'menu', label: 'Menu', fn: function() {
        //   return new Spacebars.SafeString('<a href="/products/+{_id.value}">View</a>  ')
        //   }
        // },
        // {key: 'menu', label: 'Menu', tmpl: Template.menuTemplate},
      ]
    };
  },
  lots: function(){
    return Lots.find();
  },
});
