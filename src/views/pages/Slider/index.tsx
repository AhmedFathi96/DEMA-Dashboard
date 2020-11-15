
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
import {  ISliderItem } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getSliderItems,createSliderItem,editSliderItem,deleteSliderItem } from "../../../React-Redux/Actions/slider-action";

const Slider: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<ISliderItem>({
    _id:'',
    arabic_header:'',
    arabic_sub_header:'',
    english_header:'',
    english_sub_header:'',
    arabic_content:'',
    english_content:'',
    sale:'',
    order: '',
  })

  const {SliderItems,slider_is_loading} = useSelect(state=> state.sliderItemsReducer)



  React.useEffect(() => {
    dispatch(getSliderItems())
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
    console.log('Obj =====>' , e.target.sale.value );

    data.append('english_header', e.target.english_header.value);
    data.append('english_sub_header', e.target.english_sub_header.value);
    data.append('english_content', e.target.english_content.value || "none");

    data.append('arabic_header', e.target.arabic_header.value);
    data.append('arabic_sub_header', e.target.arabic_sub_header.value);
    data.append('arabic_content', e.target.arabic_content.value || "none");

    data.append('order', e.target.order.value);
    data.append('sale', e.target.sale.value || "none");

    data.append('slider_img', e.target.slider_img.files[0]);



    if(is_editing){
      dispatch(editSliderItem({data:data , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createSliderItem(data));
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
                    Do you want to remove {obj.english_header} | {obj.arabic_header} from Sliders ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteSliderItem(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj?.english_header === ''? 'Create Slider': 'Edit Slider'}
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
              <label className="form-control-label" htmlFor="example-text-input">Slider Order</label>
              <Input id="order" name="order" defaultValue={obj.order} placeholder="Ex: 1 ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Sale if it exists</label>
              <Input id="sale" name="sale" defaultValue={obj.sale} placeholder="Sale ..." type="text" />
            </FormGroup>

            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Header</label>
              <Input id="english_header" name="english_header" defaultValue={obj.english_header} placeholder="English Header ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Header</label>
              <Input id="arabic_header" name="arabic_header" defaultValue={obj.arabic_header} placeholder="Arabic Header ..." type="text" />
            </FormGroup>

        
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Sub Header</label>
              <Input id="english_sub_header" rows="3" name="english_sub_header" defaultValue={obj.english_sub_header} placeholder="English Sub Header ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Sub Header</label>
              <Input id="arabic_sub_header" rows="3" name="arabic_sub_header" defaultValue={obj.arabic_sub_header} placeholder="Arabic Sub Header ..." type="text" />
            </FormGroup>


            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Content</label>
              <Input id="english_content"  name="english_content" defaultValue={obj.english_content} placeholder="English Content ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Content</label>
              <Input id="arabic_content"   name="arabic_content" defaultValue={obj.arabic_content} placeholder="Arabic Content ..." type="text" />
            </FormGroup>

            <FormGroup>

              <div className="custom-file">
                
                <input
                  className="custom-file-input"
                  id="slider_img"
                  name="slider_img"
                  lang="en"
                  type="file"
                />
              <label className="custom-file-label" htmlFor="customFileLang">
                  
              </label>
              </div>
            </FormGroup>
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
          slider_is_loading?
            <>
              <SimpleHeader name="Sliders" parentName="Sliders" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Sliders table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj(
                              { 
                                _id:'',
                                arabic_header:'',
                                arabic_sub_header:'',
                                english_header:'',
                                english_sub_header:'',
                                arabic_content:'',
                                english_content:'',
                                sale:'',
                                order: '',
                              }
                            )
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new Slider</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                        <div className={styles.default.cardsWrapper}>
                          {
                            SliderItems.length > 0?
                            SliderItems.map(item =>
                              
                              <Card className={`${styles.default.card}`}>
                              <CardImg
                                alt="..."
                                className={styles.default.img}
                                src={`http://localhost:6100/api/slider/get-slider-image/${item._id}/view`}
                                top 
                              />
                              <CardBody className={styles.default.cardBody}>
                                <CardTitle>
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  
                                  <div style={{display:'flex'}}>
                                          <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{
                                            setObj({
                                                _id: item._id,
                                                arabic_header:item.arabic_header,
                                                arabic_sub_header:item.arabic_sub_header,
                                                english_header:item.english_header,
                                                english_sub_header:item.english_sub_header,
                                                arabic_content:item.arabic_content,
                                                english_content:item.english_content,
                                                sale:item.sale,
                                                order: item.order,
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
                                                arabic_header:item.arabic_header,
                                                arabic_sub_header:item.arabic_sub_header,
                                                english_header:item.english_header,
                                                english_sub_header:item.english_sub_header,
                                                arabic_content:item.arabic_content,
                                                english_content:item.english_content,
                                                sale:item.sale,
                                                order: item.order,

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
                              
                                </CardTitle >
                                    <h3 className="mb-0">Card Order : {item.order}</h3>
                                    <br/>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>English Header</b>: {item.english_header}</span>
                                        <span><b>Arabic Header</b>: {item.arabic_header}</span>
                                    </div>  
                              
                                    <br/>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>English Sub Header</b>: {item.english_sub_header}</span>
                                        <span><b>Arabic Sub Header</b>: {item.arabic_sub_header}</span>
                                    </div>
                              
                                    <br/>

                                    {
                                      item.english_content === ""? '':
                                      <div className={styles.default.infoWrapper}>
                                        <span><b>English Content</b>: {item.english_content}</span>
                                        <span><b>Arabic Content</b>: {item.arabic_content}</span>
                                      </div>
                                    }
                                    
                              
                                    <br/>
                                    {
                                      item.sale === ""? '':
                                      <div className={styles.default.infoWrapper}>
                                        <span><b>Sale</b>: {item.sale}</span>
                                      </div>
                                    }
                                    
                              </CardBody>
                            
                            </Card>
                            
                            )
                            :
                            <Alert className={`alert-default ${styles.default.alert}`}>
                              <strong>Attention!</strong> There are no Sliders to show, please Create new one from the button in the top right corner
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

export default Slider;
