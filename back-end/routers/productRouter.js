var express = require('express');
var app = express();
var router = express.Router();
var productModel = require('../models/productModel')



var productList = async (req,res)=>
{
    var myPageNo = Number(req.params.pageNo);
    var myPerPage = Number(req.params.perPage);
    var mySearchKey = req.params.searchKey;
    var skipData = (myPageNo-1)*myPerPage;

    try{

        if(mySearchKey==="0")
        {
            var data = await productModel.aggregate([
                {
                    $facet : {
                                "totalData":[{$count:'total'}],
                                "allData":[{$skip:skipData},{$limit:myPerPage}]
                            }
                 }
            ])
        }
        else
        {
            var data = await productModel.aggregate([
                {
                    $facet : {
                        "totalData":[
                                    {
                                        $match:{$or:
                                                    [
                                                    {title:{$regex:mySearchKey,$options:"i"}},
                                                    {price:{$regex:mySearchKey,$options:"i"}},
                                                    {category:{$regex:mySearchKey,$options:"i"}},
                                                    {subcategory:{$regex:mySearchKey,$options:"i"}},
                                                    {remark:{$regex:mySearchKey,$options:"i"}},
                                                    {brand:{$regex:mySearchKey,$options:"i"}},
                                                    {shop_name:{$regex:mySearchKey,$options:"i"}}
                                                    ]
                                                }
                                    },
                                    {$count:'total'}
                                   ],
                        "allData":[
                                    {
                                        $match:{$or:
                                                    [
                                                    {title:{$regex:mySearchKey,$options:"i"}},
                                                    {price:{$regex:mySearchKey,$options:"i"}},
                                                    {category:{$regex:mySearchKey,$options:"i"}},
                                                    {subcategory:{$regex:mySearchKey,$options:"i"}},
                                                    {remark:{$regex:mySearchKey,$options:"i"}},
                                                    {brand:{$regex:mySearchKey,$options:"i"}},
                                                    {shop_name:{$regex:mySearchKey,$options:"i"}}
                                                    ]
                                                }
                                    },
                                    {$skip:skipData},
                                    {$limit:myPerPage}
                                    
                                   ]
                         
                    }
                 }
            ])
          
            
        }

        res.status(200);
        res.send(data)

    }
    catch(ob)
    {
        res.status(206);
        res.send(ob.message);
    }
}









router.route('/productList/:pageNo/:perPage/:searchKey')
    .get(productList)

module.exports= router;