
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components

import { Card, CardImg, CardBody, CardTitle, Button, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import { IProduct } from "../../../../lib";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../React-Redux/Actions/product-action";

interface IProps{
    product: IProduct;
}

const SingleProduct: React.FC<IProps> = (props) => {
    const {price_after_discount, price_before_discount,english_name,_id,arabic_name} = props.product;

    const dispatch = useDispatch();

    const toggleNotificationModal = () => {
        setNotificationModel(pt => !pt);
    };
    const [notification_modal , setNotificationModel] = useState(false)

    return (
        <>
            
            <Modal
                className="modal-dialog-centered modal-danger"
                contentClassName="bg-gradient-danger"
                isOpen={notification_modal}
                toggle={toggleNotificationModal}
                >
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-notification">
                    Your attention is required
                    </h6>
                    <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleNotificationModal}
                    >
                    <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="py-3 text-center">
                    <i className="ni ni-bell-55 ni-3x" />
                    <h4 className="heading mt-4">You should read this!</h4>
                    <p>
                        Do you want to remove {english_name} | {arabic_name} from Sliders ? to confirm please press delete otherwise close
                    </p>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteProduct(_id !== undefined? _id: '')); toggleNotificationModal()}}>
                        Delete
                    </Button>
                
                    <Button
                        className="text-white ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleNotificationModal}
                    >
                    Close
                    </Button>
                </div>
                </Modal>
            
            <div className={styles.default.productWrapper}>
                <Card className={styles.default.card}>

                <CardImg
                    alt="..."
                    className={styles.default.img}
                    src={require("../../../../assets/img/1.jpg")}
                    top
                />

                <CardBody>
                    
                    <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                        <div>
                            <CardTitle className="h2 mb-0">{english_name}</CardTitle>
                            <small className="text-muted">
                                €{price_after_discount?price_after_discount:''} | <del>{price_before_discount}</del>
                            </small>
                        </div>
                    
                
                        <div style={{display:'flex'}}>
                                <Link to={{
                                    pathname: "/Product/view-product",
                                    state: { pro: props.product}
                                }} >
                                    <Button className={`btn-icon btn-2 `} color="success" type="button">
                                        <span className="btn-inner--icon">
                                            <i className="ni ni-box-2" />
                                        </span>
                                    </Button>
                                </Link>

                                <Link to={{
                                    pathname: "/Product/edit-product",
                                    state: { pro: props.product}
                                }} >
                                    <Button style={{margin:'0 0.3rem'}} className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button">
                                        <span className="btn-inner--icon">
                                            <i className="ni ni-ungroup" />
                                        </span>
                                    </Button>
                                </Link>
                                
                                <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button" onClick={()=>{toggleNotificationModal()}}>
                                    <span className="btn-inner--icon">
                                        <i className="ni ni-fat-remove"></i>
                                    </span>
                                </Button>
                            </div>
                    </div>
                    
                </CardBody>
                </Card>
            </div>
            
        </>
    );
    
}

export default SingleProduct;
