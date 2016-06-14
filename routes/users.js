var express = require('express');

var router = function (pool) {
    var accountRouter = express.Router();


    /* GET users listing. */
    accountRouter.route('/').get(function(req, res, next) {
        res.send('respond with a resource');
    });
    accountRouter.get('/display', function(req, res, next) {
        console.log('Call the displey');
        var query='select * from usertypes';
        pool.getConnection(function(err,connection){
            connection.query(query,function(err,rows){
                connection.release();
                if(err){
                    console.log(err);
                    res.status(500).send('500 Error : ' + err);
                }
                else
                {
                    res.status(200).json(rows);
                }
            })
        })

    });
    accountRouter.route('/Insert').post(function(req,res,next){
        pool.getConnection(function(err,connection){

            var query="insert into usertypes(userName,password,email) values"+"('" +req.body['userName'] + "','"+ req.body['password'] + "','" +req.body['email'] +"')";

            connection.query(query,function(err,rows){
                if(err){

                    res.status(500).send('500 Error :' + err);
                }
                else
                {

                    res.status(200).json(rows);
                }
            })
        })


    })
    accountRouter.route('/Inserttext').post(function(req,res,next){
        pool.getConnection(function(err,connection){


            var query="insert into user(userName) values"+"('" +req.body['Username'] +"')";

            connection.query(query,function(err,rows){
                if(err){

                    res.status(500).send('500 Error :' + err);
                }
                else
                {

                    res.status(200).json(rows);
                }
            })
        })



    })
    accountRouter.route('/getdetails').get(function(req,res,next){

            if(req.query.userId){
                var query="select * from user where userId= '"+req.query.userId+"'";
            }
        if(query){
            pool.getConnection(function(err,connection){
                connection.query(query,function(err,rows){
                    if(err){

                        res.status(500).send('500 Error :' + err);
                    }
                    else
                    {

                        res.status(200).json(rows);
                    }
                })
            })
        }
        else
        {
            console.log("error in the query");
        }

    })
    accountRouter.route('/displaytext').get(function(req,res,next){
        pool.getConnection(function(err,connection){
            var query="select * from user";
            connection.query(query,function(err,rows){
                if(err){

                    res.status(500).send('500 Error :' + err);
                }
                else
                {

                    res.status(200).json(rows);
                }
            })
        })


    })
    accountRouter.route('/updatetext/:userId').put(function(req,res,next){
        pool.getConnection(function(err,connection){

            if (req.params.userId) {
                var query="UPDATE user SET userName='"+req.body['Username']+"' where userId= '"+req.params.userId+"'";

                connection.query(query,function(err,rows){
                    if(err){

                        res.status(500).send('500 Error :' + err);
                    }
                    else
                    {

                        res.status(200).json(rows);
                    }
                })
            }
            else
            {
                console.log("erro in userid");
            }
        })
    })



    return accountRouter;
}

module.exports = router;

