
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components

import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import { getTeams} from "../../../React-Redux/Actions/team-action";
import SingleProduct from "./Product";
import { Container, Row } from "reactstrap";

const Products: React.FC = () => {

  const {Team,Team_is_loading} = useSelect(state=> state.TeamReducer)

  const [selectedProduct , setSelectedProduct] = useState<string>("");
  React.useEffect(() => {
    dispatch(getTeams())
    console.log('Selected Product Is:',selectedProduct);
  } , [selectedProduct])
  const dispatch = useDispatch();

  const selectProduct = (id:string) =>{
    setSelectedProduct(id);
  }
  
    return (
      <>

        {
          Team_is_loading?
            <>
              <SimpleHeader name="Team" parentName="Team" />
              <Container className="mt--6" fluid>
                <div className={styles.default.productWrappers}>
                  <div className="col" onClick={()=>selectProduct('123440')}><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col" onClick={()=>selectProduct('123441')}><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col" onClick={()=>selectProduct('123442')}><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col" onClick={()=>selectProduct('123443')}><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col" onClick={()=>selectProduct('123444')}><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                  <div className="col"><SingleProduct _id={'123445'} product_name={"Balmain"} price_before={1459} price_after={980}   /></div>
                </div>
              </Container>
            
            </>
          :
            <div style={{margin: '25% 40%'}}>
              <Loader
                  type="Puff"
                  color="#B09E80"
                  height={150}
                  width={150}
              />
            </div>
        }
        
      </>
    );
  
}

export default Products;
