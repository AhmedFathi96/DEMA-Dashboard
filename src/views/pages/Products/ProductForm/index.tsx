
import React, {useEffect, useMemo, useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import { IProduct, IProductAdditionalInfo } from "../../../../lib";
import SimpleHeader from "../../../../components/Headers/SimpleHeader";

import { useDispatch } from "react-redux";
import { Card,  CardBody,  Form, FormGroup, Input, Row, Col, Button , Alert, CardImg, Badge, Container, Label, Modal } from "reactstrap";
import { useSelect } from "../../../../helper";
import { getTags, getSizes, getColors, getCategories, getCollections, getBadges } from "../../../../React-Redux/Actions/itemInfo-action";
import Select from 'react-select';
import { createProductImage, createProductItemAdditionalInfo, deleteProductAdditionalInfo, deleteProductImage, editProduct, editProductAdditionalInfo, editProductImage, getProductAdditionalInfo, getProductImage } from "../../../../React-Redux/Actions/product-action";
import { RouteComponentProps } from "react-router-dom";
import ReactNotification from 'react-notifications-component';

const CustomClearText = () => <p>'clear all'</p>;
const ClearIndicator = (props:any) => {
    const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
    } = props;
    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={getStyles('clearIndicator', props)}
        >
            <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
    );
};

const ClearIndicatorStyles = (base:any, state:any) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
});

const ProductForm: React.FC<RouteComponentProps> = (props) => {

    const d = (props.location.state) as any;
    const pro = d.pro;


   
    const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState<IProductAdditionalInfo>({
        arabic_name:'',
        content:'',
        english_name:'',
        _id:'',
        item:''
    });


    const {tags, sizes  , colors,badges } = useSelect(state=> state.itemInfoReducer)
    const dispatch = useDispatch();

    const {categories} = useSelect(state=> state.itemInfoReducer)
    const {collections} = useSelect(state=> state.itemInfoReducer)
    const {createdProduct , createdProductImages , createdProductAdditionalInfo , productImages , productAdditionalInfo } = useSelect(state=> state.productReducer);

    React.useEffect(() => {
        dispatch(getTags());
        dispatch(getSizes());
        dispatch(getColors());
        dispatch(getBadges());
        dispatch(getCategories());
        dispatch(getCollections());
        dispatch(getProductImage(pro._id));
        dispatch(getProductAdditionalInfo(pro._id));
    }, []);
    


    const colorsOptions = useMemo( ()=> {
        return(
            colors.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [colors])
    const defaultColorsOptions = useMemo( ()=> {
        return(
            pro.color.map((item:any)=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [pro])
    

    const badgesOptions = useMemo(()=> {
        return(
            badges.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [badges])
    const defaultBadgesOptions = useMemo(()=> {
        return(
            pro.badge.map((item:any)=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [pro])
    

    const sizesOptions = useMemo( ()=> {
        return(
            sizes.map(item=> {
                return {value: item._id, label: item.name}
            })
        )
    } , [sizes])
    const defaultSizesOptions = useMemo( ()=> {
        return(
            pro.size.map((item:any)=> {
                return {value: item._id, label: `${item.name}`}
            })
        )
    } , [pro])


    const categoriesOptions = useMemo( ()=> {
        return(
            categories.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [categories])
    const defaultCategoriesOptions = useMemo( ()=> {
        return(
            pro.category.map((item:any)=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [pro])
    
    const collectionsOptions = useMemo( ()=> {
        return(
            collections.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [collections])
    const defaultCollectionsOptions = useMemo( ()=> {
        return(
            pro.collections.map((item:any)=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [pro])
    
    const tagsOptions = useMemo( ()=> {
        return(
            tags.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [tags])
    const defaultTagsOptions = useMemo( ()=> {
        return(
            pro.tag.map((item:any)=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [pro])
    
    const [colorCurrentValue, setColorValue] = useState<any>([]);
    const [sizeCurrentValue, setSizeValue] = useState<any>([]);
    const [tagCurrentValue, setTagValue] = useState<any>([]);
    const [collectionCurrentValue, setCollectionValue] = useState<any>([]);
    const [categoryCurrentValue, setCategoryValue] = useState<any>([]);
    const [selectedImageId, setSelectedImageId] = useState<string>("");
    const [badgesCurrentValue, setBadgesValue] = useState<any>([]);

    React.useEffect(() => {
        setColorValue(defaultColorsOptions);
        setSizeValue(defaultSizesOptions);
        setTagValue(defaultTagsOptions);
        setCollectionValue(defaultCollectionsOptions);
        setCategoryValue(defaultCategoriesOptions);
        setBadgesValue(defaultBadgesOptions);
    }, []);

    const handleProductInfoSubmit = (e:any) =>{
        e.preventDefault();
        
        const reqColors         = colorCurrentValue.length>0  ?colorCurrentValue.map((it:any)=> it.value): [];
        const reqBadges         = badgesCurrentValue.length>0  ?badgesCurrentValue.map((it:any)=> it.value): [];
        const reqSizes          = sizeCurrentValue.length>0  ?sizeCurrentValue.map((it:any)=> it.value): [];
        const reqTags           = tagCurrentValue.length>0  ?tagCurrentValue.map((it:any)=> it.value): [];
        const reqCategories     = categoryCurrentValue.length>0  ?categoryCurrentValue.map((it:any)=> it.value): [];
        const reqCollections    = collectionCurrentValue.length>0  ?collectionCurrentValue.map((it:any)=> it.value): [];

        const data:IProduct = {
            arabic_mini_description: e.target.arabic_mini_description.value,
            arabic_name: e.target.arabic_name.value,
            discount_percentage: e.target.discount_percentage.value,
            price_after_discount: e.target.price_after_discount.value,
            price_before_discount: e.target.price_before_discount.value,
            english_mini_description: e.target.english_mini_description.value,
            english_name: e.target.english_name.value,
            category: reqCategories,
            collections: reqCollections,
            color: reqColors,
            size: reqSizes,
            tag: reqTags,
            badge: reqBadges,
            productAdditionalInfo: productAdditionalInfo,
            status: e.target.status.value
        };

        dispatch(editProduct({data: data , id: pro._id}));  
    }
    const handleProductAdditionalInfoSubmit = (e:any) =>{
        e.preventDefault();        
        let data = {
            english_name: e.target.english_name.value,
            arabic_name: e.target.arabic_name.value,
            content: e.target.content.value,
            item: pro._id
        };
        
        selectedAdditionalInfo._id?dispatch(editProductAdditionalInfo({id:selectedAdditionalInfo._id , data:data})):dispatch(createProductItemAdditionalInfo(data))

    }
    const handleProductImagesSubmit = (e:any) =>{
        e.preventDefault();
        let data = new FormData();
        data.append('item', createdProduct || pro._id);
        data.append('img', e.target.img.files[0]);
        selectedImageId?dispatch(editProductImage({id:selectedImageId , data:data})):dispatch(createProductImage(data))
        
    }
    const [notification_modal , setNotificationModel] = useState(false)
    const [additionalInfoNotification_modal , setAdditionalInfoNotificationModel] = useState(false)

    const toggleNotificationModal = () => {
        setNotificationModel(pt => !pt);
    };

    const toggleAdditionalInfoNotificationModal = () => {
        setAdditionalInfoNotificationModel(pt => !pt);
    };
    return (
        <>
            <div>
                <ReactNotification className={styles.default.notification}  />
            </div>
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
                        Do you want to remove {selectedImageId} from Product Images ? to confirm please press delete otherwise close
                    </p>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteProductImage(selectedImageId !== undefined? selectedImageId: ''));toggleNotificationModal()}}>
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
            

            <Modal
                className="modal-dialog-centered modal-danger"
                contentClassName="bg-gradient-danger"
                isOpen={additionalInfoNotification_modal}
                toggle={toggleAdditionalInfoNotificationModal}
                >
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-meow-notification">
                    Your attention is required
                    </h6>
                    <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleAdditionalInfoNotificationModal}
                    >
                    <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="py-3 text-center">
                    <i className="ni ni-bell-55 ni-3x" />
                    <h4 className="heading mt-4">You should read this!</h4>
                    <p>
                        Do you want to remove {selectedAdditionalInfo.english_name} | {selectedAdditionalInfo.arabic_name} from Additional Infos ? to confirm please press delete otherwise close
                    </p>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteProductAdditionalInfo(selectedAdditionalInfo._id !== undefined? selectedAdditionalInfo._id: ''));toggleAdditionalInfoNotificationModal()}}>
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
            
            <SimpleHeader name={`${pro === undefined?'Create Product':'Edit Product'}`} parentName="Products" />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <div className={styles.default.productWrapper}>
                            <Card>

                                <CardBody>
                                    <Form role="form" onSubmit={(event) => handleProductInfoSubmit(event)}>
                                        <Alert className="alert-default">
                                            <strong>Product Main Info</strong>
                                        </Alert>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Product English Name</label>
                                                    <Input id="english_name" name="english_name" defaultValue={pro!== undefined?pro?.english_name:''} placeholder="Product English Name" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Product Arabic Name</label>
                                                    <Input id="arabic_name" name="arabic_name" defaultValue={pro!== undefined?pro?.arabic_name:''} placeholder="Product Arabic Name" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Discount Percentage</label>
                                                    <Input id="discount_percentage" name="discount_percentage" defaultValue={pro!== undefined?pro?.discount_percentage:''} placeholder="Discount Percentage" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Price Before Discount</label>
                                                    <Input id="price_before_discount" name="price_before_discount" defaultValue={pro!== undefined?pro?.price_before_discount:''} placeholder="Price Before Discount" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Price After Discount</label>
                                                    <Input id="price_after_discount" name="price_after_discount" defaultValue={pro!== undefined?pro?.price_after_discount:''} placeholder="Price After Discount" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        


                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">English Description</label>
                                                    <Input id="english_mini_description" rows="5" name="english_mini_description" defaultValue={pro!== undefined?pro?.english_mini_description:''} placeholder="English Description ......." type="textarea" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Arabic Description</label>
                                                    <Input id="arabic_mini_description" rows="5" name="arabic_mini_description" defaultValue={pro!== undefined?pro?.arabic_mini_description:''} placeholder="Arabic Description ......." type="textarea" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Item Available Colors</label>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={{ ClearIndicator }}
                                                        styles={{ clearIndicator: ClearIndicatorStyles }}
                                                        onChange={(e:any)=>{setColorValue(e)}}
                                                        isMulti
                                                        options={colorsOptions}
                                                        defaultValue={defaultColorsOptions}
                                                    />    
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                
                                                    <label className="form-control-label" htmlFor="example-text-input">Item Available Sizes</label>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={{ ClearIndicator }}
                                                        onChange={(e:any)=>{setSizeValue(e)}}
                                                        styles={{ clearIndicator: ClearIndicatorStyles }}
                                                        isMulti
                                                        options={sizesOptions}
                                                        defaultValue={defaultSizesOptions}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    
                                        
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Item Available Tags</label>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={{ ClearIndicator }}
                                                        onChange={(e:any)=>{setTagValue(e)}}
                                                        styles={{ clearIndicator: ClearIndicatorStyles }}
                                                        isMulti
                                                        defaultValue={defaultTagsOptions}
                                                        options={tagsOptions}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                
                                                    <label className="form-control-label" htmlFor="example-text-input">Item Related Categories</label>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={{ ClearIndicator }}
                                                        onChange={(e:any)=>{setCategoryValue(e)}}
                                                        styles={{ clearIndicator: ClearIndicatorStyles }}
                                                        isMulti
                                                        defaultValue={defaultCategoriesOptions}
                                                        options={categoriesOptions}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label className="form-control-label" htmlFor="example-text-input">Item Related Badges</label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={{ ClearIndicator }}
                                                    onChange={(e:any)=>{setBadgesValue(e)}}
                                                    styles={{ clearIndicator: ClearIndicatorStyles }}
                                                    isMulti
                                                    defaultValue={defaultBadgesOptions}
                                                    options={badgesOptions}
                                                />
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label htmlFor="exampleFormControlSelect1">Item Status</label>
                                                    <Input id="status" rows="5" name="status" type="select" defaultValue={pro!== undefined?pro.status:''}>
                                                        <option>Default Item</option>
                                                        <option>Sale Item</option>
                                                        <option>Best Seller</option>
                                                        <option>New Arrivals</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>                 
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label className="form-control-label" htmlFor="example-text-input">Item Related Collections</label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={{ ClearIndicator }}
                                                    onChange={(e:any)=>{setCollectionValue(e)}}
                                                    styles={{ clearIndicator: ClearIndicatorStyles }}
                                                    isMulti
                                                    options={collectionsOptions}
                                                    defaultValue={defaultCollectionsOptions}
                                                />
                                            </Col>
                                            <Col>
                                                <Button color="primary" type="submit" className={styles.default.createBtn}>
                                                    Edit
                                                </Button>
                                            </Col>                  
                                        </Row>
                                        
                                        
                                    </Form>
                                    <br /><br />
                                    <Form role="form" onSubmit={(event) => handleProductImagesSubmit(event)}>
                                        <Alert className="alert-default">
                                            <strong>Product Related Images</strong>
                                        </Alert>
                                        <label className="form-control-label" htmlFor="example-text-input">Add Item Images</label>
                                        <Row>
                                            <Col>
                                                <Label>Selected Image ID : <strong>{selectedImageId}</strong></Label>
                                                <div className="custom-file">
                                                    <input
                                                        className="custom-file-input"
                                                        id="img"
                                                        name="img"
                                                        lang="en"
                                                        type="file"
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFileLang">
                                                    </label>
                                                </div>
                                            </Col>
                                            <Col>
                                            
                                                <Button color="primary" type="submit" className={styles.default.addBtn}>
                                                    Add
                                                </Button>
                                                <Button color="primary" type="reset" onClick={()=>{setSelectedImageId("")}} className={styles.default.addBtn}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div className={styles.default.productImageWrapper}>
                                            { 
                                            createdProductImages.length > 0?(
                                                createdProductImages.map((item:string,key:any) =>
                                                    
                                                        <Card className={styles.default.productImageContainer}>
                                                            <CardImg
                                                                className={styles.default.img}
                                                                alt={`ProductImage${key}`}
                                                                src={`http://localhost:6100/api/itemImages/item/${createdProduct || pro._id}/image/${item}/view`}
                                                                top
                                                            />
                                                            <CardBody>
                                    
                                                                <div style={{display:'flex' , alignItems:'center', justifyContent:'flex-end'}}>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{setSelectedImageId(item)}}>
                                                                    Edit
                                                                        <span className="btn-inner--icon">
                                                                        
                                                                            <i className="ni ni-ungroup"></i>
                                                                        </span>
                                                                    </Button>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button" onClick={()=>{setSelectedImageId(item);toggleNotificationModal()}}>
                                                                    Delete
                                                                        <span className="btn-inner--icon">
                                                                            
                                                                            <i className="ni ni-fat-remove"></i>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                                
                                                            </CardBody>
                                                        </Card>
                                                    
                                                )
                                            )
                                            :
                                            ''
                                            }
                                            { 
                                            productImages.length > 0?(
                                                productImages.map((item:string,key:any) =>
                                                    
                                                        <Card className={styles.default.productImageContainer}>
                                                            <CardImg
                                                                className={styles.default.img}
                                                                alt={`ProductImage${key}`}
                                                                src={`http://localhost:6100/api/itemImages/item/${createdProduct || pro._id}/image/${item}/view`}
                                                                top
                                                            />
                                                            <CardBody>
                                    
                                                                <div style={{display:'flex' , alignItems:'center', justifyContent:'flex-end'}}>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{setSelectedImageId(item)}}>
                                                                        
                                                                    Edit<span className="btn-inner--icon">
                                                                    
                                                                            <i className="ni ni-ungroup"></i>
                                                                        </span>
                                                                    </Button>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button" onClick={()=>{setSelectedImageId(item);toggleNotificationModal()}}>
                                                                    Delete
                                                                        <span className="btn-inner--icon">
                                                                            
                                                                            <i className="ni ni-fat-remove"></i>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                                
                                                            </CardBody>
                                                        </Card>
                                                    
                                                )
                                            )
                                            :
                                            ''
                                            }
                                        </div>
                                    </Form>
                                    <br /><br />
                                    <Form role="form" onSubmit={(event) => handleProductAdditionalInfoSubmit(event)}>
                                        <Alert className="alert-default">
                                            <strong>Product Related Additional Info</strong>
                                        </Alert>
                                        <Label>Selected Additional info ID : <strong>{selectedAdditionalInfo._id}</strong></Label>

                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Additional Info English Name</label>
                                                    <Input id="english_name" name="english_name" defaultValue={selectedAdditionalInfo.english_name} placeholder="Additional Info English Name" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="example-text-input">Additional Info Arabic Name</label>
                                                    <Input id="arabic_name" name="arabic_name" defaultValue={selectedAdditionalInfo.arabic_name}  placeholder="Additional Info Arabic Name" type="text" />
                                                </FormGroup>
                                            </Col>
                                        
                                        </Row>
                                        <Row>
                                        
                                            <Col>
                                                    <label className="form-control-label" htmlFor="example-text-input">Additional Info Content</label>
                                                    <Input id="content" name="content" defaultValue={selectedAdditionalInfo.content} placeholder="Content" type="text" />
                                            </Col>
                                            <Col>
                                                <Button color="primary" type="submit" className={styles.default.addBtn}>
                                                    Add
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div className={styles.default.productImageWrapper}>
                                            { 
                                            createdProductAdditionalInfo.length > 0?(
                                                createdProductAdditionalInfo.map((item:IProductAdditionalInfo,key) =>
                                                    
                                                        <Card className={styles.default.productAdditionalImageContainer}>
                                                            
                                                            <CardBody className={styles.default.infoCardBody}>
                                    
                                                                <div style={{display:'flex' , justifyContent:'flex-end'}}>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button"  onClick={()=>{setSelectedAdditionalInfo(item)}}>
                                                                        Edit
                                                                        <span className="btn-inner--icon">
                                                                            <i className="ni ni-ungroup"></i>
                                                                        </span>
                                                                    </Button>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button"  onClick={()=>{setSelectedAdditionalInfo(item);toggleAdditionalInfoNotificationModal()}}>
                                                                        Delete
                                                                        <span className="btn-inner--icon">
                                                                            <i className="ni ni-fat-remove"></i>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                                
                                                                <Alert color="secondary">
                                                                        
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>English Name: </strong> {item.english_name} 
                                                                        </Badge>
                                                                        <br />
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>Arabic Name: </strong> {item.arabic_name}
                                                                        </Badge>
                                                                        <br />
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>Content: </strong> {item.content}
                                                                        </Badge>
                                                                        
                                                                        
                                                                </Alert>


                                                            </CardBody>
                                                        </Card>
                                                    
                                                )
                                            )

                                                :
                                                ''
                                            }
                                            
                                            { 
                                            productAdditionalInfo.length > 0?(
                                                productAdditionalInfo.map((item:IProductAdditionalInfo,key) =>
                                                    
                                                        <Card className={styles.default.productAdditionalImageContainer}>
                                                            
                                                            <CardBody className={styles.default.infoCardBody}>
                                    
                                                                <div style={{display:'flex' , justifyContent:'flex-end'}}>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{setSelectedAdditionalInfo(item)}}>
                                                                        Edit
                                                                        <span className="btn-inner--icon">
                                                                            <i className="ni ni-ungroup"></i>
                                                                        </span>
                                                                    </Button>
                                                                    <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button" onClick={()=>{setSelectedAdditionalInfo(item);toggleAdditionalInfoNotificationModal()}}>
                                                                        Delete
                                                                        <span className="btn-inner--icon">
                                                                            <i className="ni ni-fat-remove"></i>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                                
                                                                <Alert color="secondary">
                                                                        
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>English Name: </strong> {item.english_name} 
                                                                        </Badge>
                                                                        <br />
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>Arabic Name: </strong> {item.arabic_name}
                                                                        </Badge>
                                                                        <br />
                                                                        <Badge className={`badge-default ${styles.default.badge}`} >
                                                                        <strong>Content: </strong> {item.content}
                                                                        </Badge>
                                                                        
                                                                        
                                                                </Alert>


                                                            </CardBody>
                                                        </Card>
                                                    
                                                )
                                            )

                                                :
                                                ''
                                            }
                                        </div>
                                    </Form>
                                    
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
        );
        
    
}

export default ProductForm;
