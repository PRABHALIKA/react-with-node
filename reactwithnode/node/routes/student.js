var express=require('express');
var router=express.Router();
var mongodb=require('mongodb');

router.get('/getStudents',function(req,res){
  //take data
 var user= req.query.un;
 var pwd=req.query.pwd;

 res.send('my use name is: '+user + ' and pwd is ' +pwd);

});


router.post('/loginCheck',function(req,res){
        var un=req.body.un;
        var pwd=req.body.pwd;
        if(un == 'u1' && pwd=='p1'){
            res.send('success');
        }else{
            res.send('fail');
        }
})

router.post('/register',function(req,res){
    //take data
    var data=req.body.data;
    const MongoClient = mongodb.MongoClient;
    var url="mongodb+srv://react:react@cluster0-qx0ua.mongodb.net/reactdb?retryWrites=true"
    MongoClient.connect(url,{ useNewUrlParser: true },(e,client)=>{
       
       var dbObj=client.db('reactdb')
       if(!dbObj){
        res.send('db conneciton error');
    }
    var collection=dbObj.collection('student');
    collection.insertOne(data,function(e,r){
        if(e){
            res.send(e);
        }else{
            res.send(r);
        }
    })
    })
   

});


module.exports=router;