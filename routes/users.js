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
            console.log(req.body);
            var query="insert into usertypes(userName,password,email) values"+"('" +req.body['userName'] + "','"+ req.body['password'] + "','" +req.body['email'] +"')";
            console.log('queryt'+query);
            connection.query(query,function(err,rows){
                if(err){
                    console.log(err);
                    res.status(500).send('500 Error :' + err);
                }
                else
                {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            })
        })


    })
    accountRouter.route('/Inserttext').post(function(req,res,next){
        pool.getConnection(function(err,connection){
            console.log(req.body);
            var query="insert into user(userName) values"+"('" +req.body['userName'] +"')";
            console.log('queryt'+query);
            connection.query(query,function(err,rows){
                if(err){
                    console.log(err);
                    res.status(500).send('500 Error :' + err);
                }
                else
                {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            })
        })


    })
    accountRouter.route('/displaytext').get(function(req,res,next){
        pool.getConnection(function(err,connection){
            console.log(req.body);
            var query="select * from user";
            console.log('queryt'+query);
            connection.query(query,function(err,rows){
                if(err){
                    console.log(err);
                    res.status(500).send('500 Error :' + err);
                }
                else
                {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            })
        })


    })

/*    accountRouter.route('/Insert').post(function(req,res,next){
        pool.getConnection(function(err,connection){
            console.log(req.body);
            var query="insert into usertypes(usertypeID,userName,password,email) values"+"('"+req.body['usertypeID']+"','" +req.body['userName'] + "','"+ req.body['password'] + "','" +req.body['email'] +"')";
            console.log('queryt'+query);
            connection.query(query,function(err,rows){
                if(err){
                    console.log(err);
                    res.status(500).send('500 Error :' + err);
                }
                else
                {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            })
        })


    })*/

    return accountRouter;
}

module.exports = router;

