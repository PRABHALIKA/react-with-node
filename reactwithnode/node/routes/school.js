var express=require('express');
var router=express.Router();
var mdb=require('mongodb');
var objectId=mdb.ObjectID;
var shared=require('../database/db');
router.post('/insert',function(req,res){
      var d=  req.body.data;
    shared.getDBObj(function(dbObj){
            var collection=dbObj.collection('student');
            collection.insertOne(d,function(e,r){
                if(e){
                    res.send(e);
                }else{
                    res.send(r);
                }
            })
        });
      
      })


router.post('/update',function(req,res){
    var id=  req.body._id;
    var pwd=req.body.pwd;
    var email=req.body.email;
    var phone=req.body.phone;


    shared.getDBObj(function(dbObj){
        var q={
            _id:objectId(id)
        }
        var newData={
            'pwd':pwd,
            'email':email,
            'phone':phone
        }
        var collection=dbObj.collection('student');
      collection.updateOne(q,{$set:newData},function(e,r){
          if(e){
              res.send(e);
          }else{
              res.send(r);
          }
      })
    })
})

router.get('/delete',function(req,res){
    //take data
    var id=req.query.id;
    shared.getDBObj(function(dbObj){
      var collection=dbObj.collection('student');
      var q={
          _id:objectId(id)
      }
      collection.deleteOne(q,function(e,r){
        if(e){
            res.send(e);
        }else{
            res.send(r);
        }
      })
    });
    

});

router.get('/getUsers',function(req,res){
    shared.getDBObj(function(dbObj){
        var collection=dbObj.collection('student');
        collection.find({}).toArray(function(e,r){
            if(e){
                res.send(e);
            }else{
                res.send(r);
            }
        })
    })
})
module.exports=router;
