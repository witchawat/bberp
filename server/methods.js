// Meteor Methods File
Meteor.methods({
  submitReceive:function(doc){

    var lotid = [];
    var buildLotArray = new Promise(function(resolve, reject){
      //INSERT doc.receiveItems[0..n] to Lots
      let counter = 0;
      doc.receiveItems.forEach(function(receiveLot){
        counter++;
        Lots.insert(receiveLot, function(error, result){
          if(error){
            console.log(error);
          }
          if(result){
            //update Products.totalQuantity $inc +
            Products.update({"_id": receiveLot.productid}, {$inc: {"totalQuantity": receiveLot.quantity}});
            //Get Lots._id results
            console.log("adding lotid to array > ", result);
            lotid.push(result);
            if(counter === lotid.length){
              resolve(lotid);
            }
          }
        });
      });

    });

    var submitReceiveToServer = function(){
      buildLotArray.then(function(lotid){
        console.log("then lotid >>", lotid);
        //Insert to Receive Doc
        Receive.insert({
          'docdate': doc.docdate,
          'supplier': doc.supplier,
          'receiveItems' : doc.receiveItems,
          'receiveLotId' : lotid,
        }, function(error, result){
          if(error){
            console.log(error);
          }
          if(result){
            console.log("Receive with ID >> ", result);
            return result;
          }
        });
      })
    };

    submitReceiveToServer();
  }
});
