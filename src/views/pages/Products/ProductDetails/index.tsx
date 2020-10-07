
import React from "react";
import { IProduct } from "../../../../lib";
import * as styles from './styles.module.css';
// reactstrap components
import { Alert, Badge, UncontrolledCarousel } from "reactstrap";


const items = [
    {
        src: require("../../../../assets/img/theme/img-1-1200x1000.jpg"),
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: require("../../../../assets/img/theme/img-2-1200x1000.jpg"),
        altText: '',
        caption: '',
        header: ''
    }
];
const ProductDetails: React.FC<IProduct> = (props) => {
    const {
        arabic_name,collections,arabic_mini_description,category,color,discount_percentage,
        english_mini_description,english_name,price_after_discount,price_before_discount,size,tag,productAdditionalInfo} = props;

    return (
        <>
            <div className={styles.default.productDetailsWrapper}>
                <div className={styles.default.leftSlider}>
                    <UncontrolledCarousel items={items} />
                </div>
                <div className={styles.default.rightContent}>
                <Alert color="secondary">
                    <strong>English Name</strong> {english_name}
                    <br />
                    <strong>Arabic Name</strong> {arabic_name}
                </Alert>

                <Alert color="secondary">
                    <strong>Price Before Discount</strong> {price_before_discount}
                    <br />
                    <strong>Price After Discount</strong> {price_after_discount}
                    <br />
                    <strong>Discount Percentage</strong> {discount_percentage}
                </Alert>

                <Alert color="secondary">
                    <strong>English Mini Description</strong> {english_mini_description}
                    <br />
                    <strong>Arabic Mini Description</strong> {arabic_mini_description}
                </Alert>

                <h1 className="display-4">Product Info</h1>
                <Alert color="secondary">
                    <strong>Available Colors</strong> 

                    {
                        color.map(item =>
                            <>
                                <Badge
                                    className="badge-default"
                                >
                                    {item.english_name} | {item.arabic_name}
                                </Badge>
                            </>
                        )
                    }
                    <br />

                    <strong>Available Sizes</strong> 

                    {
                        size.map(item =>
                            <>
                                <Badge
                                    className="badge-default"
                                >
                                    {item.name}
                                </Badge>
                            </>
                        )
                    }
                    <br />

                    <strong>Item Tags</strong> 

                    {
                        tag.map(item =>
                            <>
                                <Badge
                                    className="badge-default"
                                >
                                    {item.english_name} | {item.arabic_name}
                                </Badge>
                            </>
                        )
                    }
                    <br />

                </Alert>

                <h1 className="display-4">Item Related Collections</h1>
                <Alert color="secondary">
                    {
                        collections.map(item =>
                            <>
                                <Badge
                                    className="badge-default"
                                >
                                    {item.english_name} | {item.arabic_name}
                                </Badge>
                                <br />
                            </>
                        )
                    }
                    
                </Alert>

                <h1 className="display-4">Item Related Categories</h1>
                <Alert color="secondary">
                    {
                        category.map(item =>
                            <>
                                <Badge
                                    className="badge-default"
                                >
                                    {item.english_name} | {item.arabic_name}
                                </Badge>
                                <br />
                            </>
                        )
                    }
                    
                </Alert>

                <h1 className="display-4">Product Additional Info</h1>
                <Alert color="secondary">
                    {
                        productAdditionalInfo.map(item =>
                            <>
                                <strong>{item.english_name} | {item.arabic_name}</strong> {item.content}
                                <br />
                            </>
                        )
                    }
                    
                </Alert>

                

            
        

                </div>
            </div>
        </>
        );
    
}

export default ProductDetails;
