
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components

import { useDispatch } from "react-redux";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";

interface IProps{
    _id:string;
    product_name:string;
    price_before:number;
    price_after?:number;
}

const SingleProduct: React.FC<IProps> = (props) => {
    const {_id,price_before,product_name,price_after} = props;

    return (
        <div className={styles.default.productWrapper}>
            <Card>

            <CardImg
                alt="..."
                className={styles.default.img}
                src={require("../../../../assets/img/1.jpg")}
                top
            />

            <CardBody>
                
                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                    <div>
                        <CardTitle className="h2 mb-0">{product_name}</CardTitle>
                        <small className="text-muted">
                            €{price_after?price_after:''} | <del>{price_before}</del>
                        </small>
                    </div>
                
            
                    <div style={{display:'flex'}}>
                            <Button className="btn-icon btn-2" color="success" type="button">
                                <span className="btn-inner--icon">
                                    <i className="ni ni-ungroup" />
                                </span>
                            </Button>
                            <Button className="btn-icon btn-2" color="danger" type="button">
                                <span className="btn-inner--icon">
                                    <i className="ni ni-fat-remove"></i>
                                </span>
                            </Button>
                        </div>
                </div>
                
            </CardBody>
            </Card>
        </div>
        );
    
}

export default SingleProduct;
