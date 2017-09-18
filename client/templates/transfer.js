
Template.transferForm_Raw.helpers({
  products: function(){
    return Products.find({});
  }
});

Template.transferForm_Raw.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY'
    });
});
