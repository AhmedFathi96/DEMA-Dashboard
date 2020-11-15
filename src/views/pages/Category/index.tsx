
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Container,
  Row,
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  Alert
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import {  ICategory } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getCategories,createCategory,editCategory,deleteCategory } from "../../../React-Redux/Actions/itemInfo-action";

const Category: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<ICategory>({
    _id:'',
    arabic_name:"",
    english_name:'',
    starting_price:"",

  })

  const {categories,categories_is_loading} = useSelect(state=> state.itemInfoReducer)



  React.useEffect(() => {
    dispatch(getCategories())
  },[])
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModel(pt => !pt);
  };

  const toggleNotificationModal = () => {
    setNotificationModel(pt => !pt);
  };

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    
    let data = new FormData();
    data.append('english_name', e.target.english_name.value);
    data.append('arabic_name', e.target.arabic_name.value);
  
    data.append('starting_price', e.target.starting_price.value);
    data.append('category_img', e.target.category_img.files[0]);


    if(is_editing){
      dispatch(editCategory({data:data , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createCategory(data));
      toggleModal();
    }
  }
  
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
                    Do you want to remove {obj.english_name} from Categories ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteCategory(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
          className="modal-dialog-centered"
          isOpen={modal}
          toggle={() =>toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {obj?.english_name === ''? 'Create Category': 'Edit Category'}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={toggleModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
          <Form role="form"onSubmit={(event) => handleSubmit(event)}>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Name</label>
              <Input id="english_name" name="english_name" defaultValue={obj.english_name} placeholder="English Name< ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Name</label>
              <Input id="arabic_name" name="arabic_name" defaultValue={obj.arabic_name} placeholder="Arabic Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Starting Price</label>
              <Input id="starting_price" name="starting_price" defaultValue={obj.starting_price} placeholder="Content ..." type="text" />
            </FormGroup>
            <div className="custom-file">
              <input
                className="custom-file-input"
                id="category_img"
                name="category_img"
                lang="en"
                type="file"
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                Select Category image
              </label>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Save changes
              </Button>
            </div>        
          </Form>
              

          </div>
  
        </Modal>
      
        {
          categories_is_loading?
            <>
              <SimpleHeader name="Categories" parentName="Categories" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Categories table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj(
                              { 
                                _id:'',
                                arabic_name:'',
                                english_name:'',
                                starting_price:'',
                              }
                            )
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new Category</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                        <div className={styles.default.cardsWrapper}>
                          {
                            categories.length > 0?
                            categories.map(item =>
                              
                              <Card className={`${styles.default.card}`}>
                              <CardImg
                                alt="..."
                                className={styles.default.img}
                                src={`http://localhost:6100/api/category/get-category-image/${item._id}/view`}
                                top 
                              />
                              <CardBody style={{padding: '0' , paddingTop:'0'}}>
                                <CardTitle style={{padding: '0 !important'}}>
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                      <Alert className="alert-default" style={{padding: '0 !important', borderRadius:'0',width:'100%'}}>
                                          <div style={{display:'flex',alignContent:'center', justifyContent:'space-between'}}>
                                                <strong style={{paddingTop:'0.7rem'}}>Main Info</strong>
                                                <div>
                                                  <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{
                                                    setObj({
                                                        _id: item._id,
                                                        arabic_name:item.arabic_name,
                                                        english_name:item.english_name,
                                                        starting_price:item.starting_price,
                                                    })
                                                    setEditing(true);
                                                    toggleModal()
                                                  
                                                  }}>
                                                    Edit
                                                    <span className="btn-inner--icon">
                                                      <i className="ni ni-ungroup" />
                                                    </span>
                                                  </Button>
                                                  <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button"
                                                    onClick={()=>{
                                                      toggleNotificationModal()
                                                      setObj({
                                                        _id: item._id,
                                                        arabic_name:item.arabic_name,
                                                        english_name:item.english_name,
                                                        starting_price:item.starting_price,

                                                    })
                                                    }}
                                                  >
                                                    Delete
                                                    <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-remove"></i>
                                                    </span>
                                                  </Button>
                                                </div>
                                            </div>
                                      </Alert>
                                </div>
                              
                                </CardTitle >

                                  <div className={styles.default.infoWrapper}>
                                      <span><b>English Name</b>: {item.english_name}</span>
                                      <span><b>Arabic Name</b>: {item.arabic_name}</span>
                                      <span><b>Starting Price</b>: {item.starting_price}</span>
                                  </div>
                              
                                
                              </CardBody>
                            
                            </Card>
                            
                            )
                            :
                            <Alert className={`alert-default ${styles.default.alert}`}>
                              <strong>Attention!</strong> There are no Categories to show, please Create new one from the button in the top right corner
                            </Alert>
                          }

                        </div>
                    </Card>
                  </div>
                </Row>
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

export default Category;
