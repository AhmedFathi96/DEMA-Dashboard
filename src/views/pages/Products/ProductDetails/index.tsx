
import React, { useEffect, useMemo, useState } from "react";
import { IProduct } from "../../../../lib";
import * as styles from './styles.module.css';
// reactstrap components
import { Alert, Badge, Col, Row, UncontrolledCarousel } from "reactstrap";
import { RouteComponentProps } from "react-router-dom";
import { useSelect } from "../../../../helper";
import { useDispatch } from "react-redux";
import { getProductAdditionalInfo, getProductImage } from "../../../../React-Redux/Actions/product-action";



const ProductDetails: React.FC<RouteComponentProps> = (props) => {
    const d = (props.location.state) as any;
    const pro = d.pro;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProductAdditionalInfo(pro._id));
        dispatch(getProductImage(pro._id))
    },[])
    const { productAdditionalInfo,productImages} = useSelect( (state)=>state.productReducer)
    const items = useMemo( ()=>{
        return productImages.map( (it)=>{
            return{
                src: `http://localhost:6100/api/itemImages/item/${pro._id}/image/${it}/view`,
                altText: '',
                caption: '',
                header: ''
            }
        })
    } , [productImages,pro._id])

    return (
        <div className={styles.default.wrapper}>
            <div className={styles.default.productDetailsWrapper}>
                <div className={styles.default.leftSlider}>
                    <UncontrolledCarousel items={items} />
                </div>
                <div className={styles.default.rightContent}>
                    
                <Alert className="alert-default">
                    <strong>Item {pro._id} Main Info</strong>
                </Alert>
                <Alert color="secondary">
                    <div className={styles.default.infoWrapper}>
                        <span><b>English Name:</b>: {pro.english_name}</span>
                        <span><b>Arabic Name:</b>: {pro.arabic_name}</span>
                    </div>
                </Alert>

                <Alert color="secondary">
                    <div className={styles.default.infoWrapper}>
                        <span><b>Price Before Discount:</b>: {pro.price_before_discount}EGP</span>
                        <span><b>Price After Discount:</b>: {pro.price_after_discount}  EGP</span>
                        <span><b>Discount Percentage:</b>: {pro.discount_percentage}EGP</span>
                    </div>
                </Alert>

                <Alert color="secondary">
                    <div className={styles.default.infoWrapper}>
                        <span><b>English Mini Description:</b>: {pro.english_mini_description}</span>
                        <span><b>Arabic Mini Description:</b>: {pro.arabic_mini_description}</span>
                    </div>
                    
                </Alert>

                
                

 
                

                
                
                </div>
            </div>
            <br />
            <Row>
                <Col>
                    <Alert color="secondary">
                        <h1 className="display-4">Product Info</h1>
                        <strong>Available Colors</strong> 

                        {
                            pro.color.map((item:any) =>
                                <>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>Name</b>: {item.english_name} {item.arabic_name}</span>
                                    </div>
                                </>
                            )
                        }
                        <br />

                    </Alert>
                    <Alert color="secondary" >
                            <h1 className="display-4">Item  Available Tags</h1>
                            {
                                pro.tag.map((item:any) =>
                                    <>
                                        <div className={styles.default.infoWrapper}>
                                            <span><b>Name</b>: {item.english_name} {item.arabic_name}</span>
                                        </div>
                                
                                    </>
                                )
                            }
                    </Alert>
                    <Alert color="secondary" >
                        <h1 className="display-4">Item  Available Sizes</h1>
                        {
                            pro.size.map((item:any) =>
                                <>
                                        <div className={styles.default.infoWrapper}>
                                            <span><b>Name</b>: {item.name}</span>
                                        </div>

                                </>
                            )
                        }
                    </Alert>
                    
                    <br />
                    <Alert color="secondary" >
                        <h1 className="display-4">Item  Related Categories</h1>
                        {
                            pro.category.map((item:any) =>
                                <>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>Name</b>: {item.english_name} {item.arabic_name}</span>
                                    </div>
                                    <br />
                                </>
                            )
                        }
                        
                    </Alert>
                    <Alert color="secondary" >
                        <h1 className="display-4">Item Related Collections</h1>
                        {
                            pro.collections.map((item:any) =>
                                <>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>Name</b>: {item.english_name} {item.arabic_name}</span>
                                    </div>
                            
                                    <br />
                                </>
                            )
                        }
                        
                    </Alert>

    
            
                </Col>
                <Col>
                    <Alert color="secondary" >
                        <h1 className="display-4">Product Additional Info</h1>
                        {
                            
                            productAdditionalInfo.map((item:any) =>
                                <>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>Name</b>: {item.english_name} {item.arabic_name}</span>
                                        <span><b>Content</b>: {item.content}</span>
                                    </div>
                        
                                    <br />
                                </>
                            )
                            
                        }
                        
                    </Alert>
            
                </Col>
            </Row>
         
          
                            
       
        </div>
        );
    
}

export default ProductDetails;
