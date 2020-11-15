
import React, { useEffect, useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components

import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import SingleProduct from "./Product";
import { Button, Card, CardHeader, Container, Row } from "reactstrap";
import ProductDetails from "./ProductDetails";
import { IProduct } from "../../../lib";
import { getProducts } from "../../../React-Redux/Actions/product-action";
import { Link } from "react-router-dom";
import ReactNotification from 'react-notifications-component';

const Products: React.FC = () => {

  const {products} = useSelect(state=> state.productReducer)

  const [selectedProductID , setSelectedProductID] = useState<string>("");
  const [selectedProduct , setSelectedProduct] = useState<IProduct>();

  const dispatch = useDispatch();

  const selectProduct = (id:string) =>{
    setSelectedProductID(id);
    const pro = products.filter(item => item._id === selectedProductID);
    setSelectedProduct(pro[0]);
  }

  useEffect(()=>{
      dispatch(getProducts())
  } ,[])

  
    return (
      <>
            <div>
                <ReactNotification className={styles.default.notification}  />
            </div>
        {
          
            <>
              <SimpleHeader name="Products" parentName="Products" />
              {
                selectedProductID === ""?
                <Container className="mt--6" fluid>
                  <Row>
                    <div className="col">
                      <Card>
                        <CardHeader className="border-0">
                          <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                            <h3 className="mb-0">All Products</h3>
                            <Link to={{pathname: "/Product/create-product"}} >
                              <Button className="btn-icon btn-2" color="default" type="button">
                                  <span className="btn-inner--text">Create Product</span>
                                  <span className="btn-inner--icon">
                                    <i className="ni ni-fat-add"></i>
                                  </span>
                                  
                              </Button>
                            </Link>
                            
                          </div>
                          
                        </CardHeader>
                      
                        <div className={styles.default.productWrappers}>
                          {
                            products.map(item =>
                              <div className="col-4"><SingleProduct  product={item} /></div>
                            )
                          }
                      
                    </div>
                      </Card>
                    </div>
                  </Row>
                </Container>
                
                :
                ''
              }
            
            </>
          // :
          //   <div style={{margin: '25% 40%'}}>
          //     <Loader
          //         type="Puff"
          //         color="#B09E80"
          //         height={150}
          //         width={150}
          //     />
          //   </div>
        }
        
      </>
    );
  
}

export default Products;
