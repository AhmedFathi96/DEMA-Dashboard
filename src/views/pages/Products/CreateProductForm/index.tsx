
import React, {useEffect, useMemo, useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import { ICreateProduct, IProduct, IProductAdditionalInfo } from "../../../../lib";
import SimpleHeader from "../../../../components/Headers/SimpleHeader";

import { useDispatch } from "react-redux";
import { Card,  CardBody,  Form, FormGroup, Input, Row, Col, Button , Alert, CardImg, Badge, Container } from "reactstrap";
import { useSelect } from "../../../../helper";
import { getTags, getSizes, getColors, getCategories, getCollections, getBadges } from "../../../../React-Redux/Actions/itemInfo-action";
import Select from 'react-select';
import { createProduct, createProductImage, createProductItemAdditionalInfo, getProductAdditionalInfo, getProductImage } from "../../../../React-Redux/Actions/product-action";
import { RouteComponentProps } from "react-router-dom";

interface IProps{
    state?: IProduct;
}
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

const CreateProductForm: React.FC = (props) => {

    
    const [colorCurrentValue, setColorValue] = useState<any>([]);
    const [sizeCurrentValue, setSizeValue] = useState<any>([]);
    const [tagCurrentValue, setTagValue] = useState<any>([]);
    const [collectionCurrentValue, setCollectionValue] = useState<any>([]);
    const [badgesCurrentValue, setBadgesValue] = useState<any>([]);

    const [categoryCurrentValue, setCategoryValue] = useState<any>([]);

    const {tags, sizes  , colors , badges } = useSelect(state=> state.itemInfoReducer)
    const dispatch = useDispatch();

    const {categories} = useSelect(state=> state.itemInfoReducer)
    const {collections} = useSelect(state=> state.itemInfoReducer)
    const {createdProduct , createdProductImages,createdProductAdditionalInfo} = useSelect(state=> state.productReducer);

    React.useEffect(() => {
        dispatch(getTags());
        dispatch(getSizes());
        dispatch(getColors());
        dispatch(getCategories());
        dispatch(getCollections());
        dispatch(getBadges())
    }, []);
    


    const colorsOptions = useMemo( ()=> {
        return(
            colors.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [colors])

    const badgesOptions = useMemo( ()=> {
        return(
            badges.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [badges])
    
    const sizesOptions = useMemo( ()=> {
        return(
            sizes.map(item=> {
                return {value: item._id, label: item.name}
            })
        )
    } , [sizes])
    
    const categoriesOptions = useMemo( ()=> {
        return(
            categories.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [categories])


    const collectionsOptions = useMemo( ()=> {
        return(
            collections.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [collections])

    
    const tagsOptions = useMemo( ()=> {
        return(
            tags.map(item=> {
                return {value: item._id, label: `${item.english_name}|${item.arabic_name}`}
            })
        )
    } , [tags])

    const handleProductInfoSubmit = (e:any) =>{
        e.preventDefault();

        const reqColors         = colorCurrentValue.map((it:any)=> it.value);
        const reqBadges         = badgesCurrentValue.map((it:any)=> it.value);
        const reqSizes          = sizeCurrentValue.map((it:any)=> it.value);
        const reqTags           = tagCurrentValue.map((it:any)=> it.value);
        const reqCategories     = categoryCurrentValue.map((it:any)=> it.value);
        const reqCollections    = collectionCurrentValue.map((it:any)=> it.value);
        
        let data:ICreateProduct = {
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
            badge:reqBadges,
            status:e.target.status.value
        };

        dispatch(createProduct(data));  
    }
    const handleProductAdditionalInfoSubmit = (e:any) =>{
        e.preventDefault();
        console.log('Event' , e.target.value);
        
        let data = {
            english_name: e.target.english_name.value,
            arabic_name: e.target.arabic_name.value,
            content: e.target.content.value,
            item: createdProduct
        };

        dispatch(createProductItemAdditionalInfo(data));  
    }
    const handleProductImagesSubmit = (e:any) =>{
        e.preventDefault();
        console.log('Event' , e.target.value);
        let data = new FormData();
        data.append('item', createdProduct);
        data.append('img', e.target.img.files[0]);

        dispatch(createProductImage(data));
    }

    return (
        <>
            <SimpleHeader name={`Create Product`} parentName="Products" />
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
                                <Input id="english_name" name="english_name"  placeholder="Product English Name" type="text" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Product Arabic Name</label>
                                <Input id="arabic_name" name="arabic_name"  placeholder="Product Arabic Name" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Discount Percentage</label>
                                <Input id="discount_percentage" name="discount_percentage" placeholder="Discount Percentage" type="text" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Price Before Discount</label>
                                <Input id="price_before_discount" name="price_before_discount" placeholder="Price Before Discount" type="text" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Price After Discount</label>
                                <Input id="price_after_discount" name="price_after_discount" placeholder="Price After Discount" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                    


                    <Row>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">English Description</label>
                                <Input id="english_mini_description" rows="5" name="english_mini_description"  placeholder="English Description ......." type="textarea" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Arabic Description</label>
                                <Input id="arabic_mini_description" rows="5" name="arabic_mini_description"  placeholder="Arabic Description ......." type="textarea" />
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
                                options={badgesOptions}
                            />
                        </Col>
                        <Col>
                            <FormGroup>
                                <label htmlFor="exampleFormControlSelect1">Item Status</label>
                                <Input id="status" rows="5" name="status" type="select">
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
                            />
                        </Col>
                        <Col>
                            <br />
                            <Button color="primary" type="submit">
                                Create
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
                            <Button color="primary" type="submit">
                                Add
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
                                            src={`http://localhost:6100/api/itemImages/item/${createdProduct}/image/${item}/view`}
                                            top
                                        />
                                        <CardBody>
                
                                            <div style={{display:'flex' , alignItems:'center', justifyContent:'flex-end'}}>
                                                <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button">
                                                    <span className="btn-inner--icon">
                                                        Edit 
                                                        <i className="ni ni-ungroup"></i>
                                                    </span>
                                                </Button>
                                                <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button">
                                                    <span className="btn-inner--icon">
                                                        Delete
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
                    <Row>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Additional Info English Name</label>
                                <Input id="english_name" name="english_name" placeholder="Additional Info English Name" type="text" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="example-text-input">Additional Info Arabic Name</label>
                                <Input id="arabic_name" name="arabic_name"  placeholder="Additional Info Arabic Name" type="text" />
                            </FormGroup>
                        </Col>
                    
                    </Row>
                    <Row>
                    
                        <Col>
                                <label className="form-control-label" htmlFor="example-text-input">Additional Info Content</label>
                                <Input id="content" name="content" placeholder="Content" type="text" />
                        </Col>
                        <Col>
                            <br />
                            
                            <Button color="primary" type="submit">
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
                                                <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button">
                                                    <span className="btn-inner--icon">
                                                        <i className="ni ni-ungroup"></i>
                                                    </span>
                                                </Button>
                                                <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button">
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

export default CreateProductForm;
