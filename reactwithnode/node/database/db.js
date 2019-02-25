var mdb=require('mongodb');



var sharedObj={};

sharedObj.getDBObj=function(cb){
    var mongoClient=mdb.MongoClient;
    var url="mongodb+srv://react:react@cluster0-qx0ua.mongodb.net/reactdb?retryWrites=true"
    mongoClient.connect(url,{ useNewUrlParser: true },(e,c)=>{
      if(e){
          res.send('conneciton error');
      }
      var dbObj=c.db('reactdb');

      cb(dbObj)
})
}
module.exports=sharedObj;