Template.body.onRendered(function(){
  $('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY'
  });
  $('.sel2js').select2({
    placeholder: {
      id: '-1',
      text: 'Select an option'
    }
  });
});
