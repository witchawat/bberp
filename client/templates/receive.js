import {$} from 'meteor/jquery';

Template.receiveForm.onCreated(function(){
  this.supplierSelected = new ReactiveVar();
});

Template.receiveForm.helpers({
  sup: function(){
    return Template.instance().supplierSelected.get();
  },

  suppliers: function(){
    return Suppliers.find({});
  },
  items: function(){
    var supplierSelected = Template.instance().supplierSelected;
    return Products.find({suppliers: supplierSelected.get()});
  }
});

// -----------------------------------
// Main Form onRendered
// -----------------------------------
Template.receiveForm.onRendered(function(){
  //Initialize Select2, DateTimePicker, Disable Product Selection
  $('.sel2js').select2({
    placeholder: {
      id: '-1',
      text: 'Select an option'
    }
  });
  $('.sel2js').select2("val",null);
  var supplierSelected = Template.instance().supplierSelected;
  $('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY'
  });
  $(".prod-sel").prop("disabled", true);
  //Filter Product by Supplier
  //SELECT2 Click Event
  $('#supplier_sel').on('select2:select', function(e){
    //reset Product Selection
    $(".prod-sel").select2('data', null);
    supplierSelected.set(e.params.data.id);
    $(".prod-sel").prop("disabled", false);
  });

});

// -----------------------------------
// Main Submit EVENT
// -----------------------------------

Template.receiveForm.events({
  'submit form': function(event, template){
    event.preventDefault();
    var rcitems = [];

    //Building receiveItems Array
    var buildReceiveItems = new Promise(function(resolve, reject){
      console.log("inside promise");
      let docdate = event.target.docdate.value;
      docdate = moment(docdate, "DD-MM-YYYY").toISOString();
      let supplier = event.target.supplier_sel.value;
      var trs = $('tbody tr');
      //Build receiveLot Array
      trs.each(function(tr){
        let prodid = $(this).closest('tr').attr('id');
        let prodname = $(this).find(".prodname").html();
        let quantity = Number($(this).find("#quantity").val());
        // let uomid = $(this).find(".uom").attr('id');
        // console.log("UOM>> ", uomid);
        let lot = $(this).find("#lotno").val() || "none";
        let expdate = $(this).find("#expdate").val() || "none";
        if (expdate !== "none"){
          expdate = moment(expdate, "DD-MM-YYYY").toISOString();
        }
        if (quantity !== NaN && quantity !== 0){
          rcitems.push({
            'txtype': "in",
            'docdate': docdate ,
            'productid': prodid,
            'supplier': supplier ,
            'name': prodname,
            'quantity': quantity,
            'lotno': lot,
            'expdate': expdate });
        }
      });
      console.log(rcitems);
      var recvdoc = {'docdate' : docdate, 'supplier': supplier, 'receiveItems': rcitems};
      resolve(recvdoc);
    });

    var submitReceive = function(){
      buildReceiveItems.then(function(doc){
        console.log("fullfill");
        if (doc.receiveItems.length > 0){
          Meteor.call("submitReceive", doc, function(error, result){
            if(!error){
              // console.log(result);
              FlashMessages.sendSuccess("Receive has been added successfully!");
              Router.go('/receive');
            } else {
              console.log("error", error);
            }
          });
        } else {
          console.log("Quantity cannot be empty");
        }
      })
      .catch(function(error){
        console.log(error.message);
      });
    };

    submitReceive();

  }
});

// -----------------------------------
// Sub Row
// -----------------------------------

Template.receiveRow2.onRendered(function(){
  $('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY'
  });
});


Template.receiveIndex.helpers({
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
        {key: 'receiveItems', label: 'Receive Items', tmpl: Template.receiveTableItem},

        // {key: 'menu', label: 'Menu', fn: function() {
        //   return new Spacebars.SafeString('<a href="/products/+{_id.value}">View</a>  ')
        //   }
        // },
        // {key: 'menu', label: 'Menu', tmpl: Template.menuTemplate},
      ]
    };
  },
  receives: function(){
    return Receive.find();
  },
});
