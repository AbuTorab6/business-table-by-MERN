import React,{Fragment,useEffect,useState } from 'react';
import Table from 'react-bootstrap/Table';

import '../asset/css/custom.css'

import { productList } from '../APIServices/CRUDServices';
import { setTotalFunc,setAllProductFunc } from '../redux/stateSlice/productState';
import {useDispatch,useSelector} from 'react-redux'

import ReactPaginate from 'react-paginate';

const ProductList = () => 
{

    var dispatch = useDispatch();

    const[searchKey,setSearchKey]=useState(0)
    const[perPage,setPerPage]=useState(5);

    useEffect(()=>{

        productList(1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllProductFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )

    },[])

    
    //for pagination
    const handlePageClick = (p1) => // here the parameter "p1" will receive 2.so p1=2
    {
        productList(p1.selected+1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllProductFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    };


    //for dropdown 
    var productPerPage = (p1)=>
    {
        var value = p1.target.value;
        var intValue = parseInt(value)

        setPerPage(intValue)
        productList(1,intValue,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllProductFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    }




    //for search
    var searchOnChange = (p1)=>
    {
        var value = p1.target.value;
        setSearchKey(value);


        if(value.length===0)
        {
            setSearchKey(0);
            productList(1,perPage,0).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllProductFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
        else
        {
            productList(1,perPage,value).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllProductFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
    }






    let total = useSelector((state)=>state.productState.total);

    var allProduct = useSelector((state)=>state.productState.allProduct);
    var allProductArr = allProduct.map(
        function(p1,p2)
        {
            return(
                <tr>
                    <td> <img src={p1.image} /> </td>
                    <td>{p1.title}</td>
                    <td>{p1.price}</td>
                    <td>{p1.stock}</td>
                    <td>{p1.product_code}</td>
                </tr>
            )
        }
    )



    return (
        <Fragment>
            <div className='product-list-section'>
                <div className='table-content'>
                    <h2>Product List</h2>
                    <div className='top-grid'>
                        <div>
                            <select onChange={productPerPage} >
                                <option value="5">5 per page</option>
                                <option value="10">10 Per page</option>
                                <option value="15">15 per page</option>
                                <option value="20">20 per page</option>
                            </select>
                        </div>
                        <div className='search'>
                            <input onChange={searchOnChange} type="text" placeholder='search here' />
                        </div>
                    </div>
                    <div className='my-table'>
                        <Table striped bordered hover  >
                            <thead>
                                <tr>
                                <th>image</th>
                                <th>title</th>
                                <th>price</th>
                                <th>stoke</th>
                                <th>code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProductArr}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className='my-pagination'>
                    <nav>
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={total/perPage} 
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick} // if i click "3rd" page from pagination. it will pass 2(3rd-1) to "handlePageClick" function.
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;