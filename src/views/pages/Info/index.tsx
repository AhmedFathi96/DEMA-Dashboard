
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import {
  Card,
  CardHeader,

  Table,
  Container,
  Row,
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  Col,
  CardBody,
  CardTitle,
  Alert
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import { IInfo } from "../../../lib";
import { getInfo, editInfo } from "../../../React-Redux/Actions/info-action";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';

const Info: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [massage_modal , setMessageModel] = useState(false)

  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<IInfo>({
    _id: '',
    arabic_address:'',
    arabic_submitting_message:'',
    email:'',
    english_address:'',
    english_submitting_message:'',
    facebook_url:'',
    instagram_url:'',
    latitude:'',
    longitude:'',
    phone:'',
    twitter_url:'',
    whatsapp_number:'',
    
  })

  const {Info,info_is_loading} = useSelect(state=> state.infoReducer)

  React.useEffect(() => {
    dispatch(getInfo())
  } , [])
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModel(pt => !pt);
  };

  const handleSubmit = (e:any) =>{

    e.preventDefault();
    const data = {
     
      arabic_submitting_message:e.target.arabic_submitting_message.value,
      email:e.target.email.value,
      english_address:e.target.english_address.value,
      english_submitting_message:e.target.english_submitting_message.value,
      facebook_url:e.target.facebook_url.value,
      instagram_url:e.target.instagram_url.value,
      latitude:e.target.latitude.value,
      longitude:e.target.longitude.value,
      phone:e.target.phone.value,
      twitter_url:e.target.twitter_url.value,
      whatsapp_number:e.target.whatsapp_number.value,
      arabic_address: e.target.arabic_address.value,

  }
    dispatch(editInfo({data:data , id:obj._id === undefined?'':obj._id}));
    toggleModal();
    
  }
  
    return (
      <>
        <div>
            <ReactNotification className={styles.default.notification}  />
        </div>

        <Modal
          className="modal-dialog-centered"
          isOpen={modal}
          toggle={() =>toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {obj.arabic_address === ''? 'Create Contact': 'Edit Contact'}
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
            <Row className="mb-4">
              <Col lg="6">
                <Alert className="alert-default">
                SOCIAL MEDIA LINKS
                </Alert>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Facebook url</label>
                  <Input id="facebook_url" name="facebook_url" defaultValue={obj.facebook_url} placeholder="URL is  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Twitter url</label>
                  <Input id="twitter_url" name="twitter_url" defaultValue={obj.twitter_url} placeholder="URL is  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Instagram url</label>
                  <Input id="instagram_url" name="instagram_url" defaultValue={obj.instagram_url} placeholder="URL is  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Whatsapp Number</label>
                  <Input id="whatsapp_number" name="whatsapp_number" defaultValue={obj.whatsapp_number} placeholder="Whatsapp Number is  ..." type="text" />
                </FormGroup>
              
              </Col>

              <Col lg="6">
                <Alert className="alert-default">
                  CONTACTS INFO
                </Alert>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >English Address</label>
                  <Input id="english_address" name="english_address" defaultValue={obj.english_address} placeholder="Address  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Arabic Address</label>
                  <Input id="arabic_address" name="arabic_address" defaultValue={obj.arabic_address} placeholder="Address  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Phone</label>
                  <Input id="phone" name="phone" defaultValue={obj.phone} placeholder="phone  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Email</label>
                  <Input id="email" name="email" defaultValue={obj.email} placeholder="Email is  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Latitude</label>
                  <Input id="latitude" name="latitude" defaultValue={obj.latitude} placeholder="Latitude  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Longitude</label>
                  <Input id="longitude" name="longitude" defaultValue={obj.longitude} placeholder="Longitude  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Contacts english submitting message</label>
                  <Input id="english_submitting_message" name="english_submitting_message" defaultValue={obj.english_submitting_message} placeholder="Whatsapp Number is  ..." type="text" />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label"htmlFor="example-text-input" >Contacts arabic submitting message</label>
                  <Input id="arabic_submitting_message" name="arabic_submitting_message" defaultValue={obj.arabic_submitting_message} placeholder="Whatsapp Number is  ..." type="text" />
                </FormGroup>
              </Col>
            
            </Row>
          
            
  
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
          info_is_loading?
            <>
              <SimpleHeader name="Info" parentName="Contact" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Info table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(true);
                            setObj({
                              _id: Info._id,
                              english_address:Info.english_address,
                              arabic_address:Info.arabic_address,
                              email:Info.email,
                              phone:Info.phone,
                              arabic_submitting_message:Info.arabic_submitting_message,
                              english_submitting_message:Info.english_submitting_message,
                              facebook_url:Info.facebook_url,
                              twitter_url:Info.twitter_url,
                              instagram_url:Info.instagram_url,
                              whatsapp_number:Info.whatsapp_number,
                              latitude:Info.latitude,
                              longitude:Info.longitude,
                          })  
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Edit Website Info</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                      <Table className="align-items-center table-flush" responsive>
                      
                        {
                          info_is_loading?
                          <Row className="mb-12">
                          <Col lg="4">
                            <Card className="card-stats">
                
                              <CardBody>
                                <Row>
                                  <div className="col">
                                    <CardTitle className="text-uppercase text-muted mb-0">
                                      Social Media Links
                                    </CardTitle>
                                  </div>
                                  <Col className="col-auto">
                                    <div className="icon icon-shape bg-red text-white rounded-circle shadow">
                                      <i className="ni ni-active-40" />
                                    
                                    </div>
                                  </Col>
                                </Row>
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    <i className="fab fa-facebook-f" style={{padding:'0.2rem'}}></i>
                                    FaceBook
                                  </span>
                                  <span className="text-nowrap">URL : {Info.facebook_url}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                  <i className="fab fa-twitter" style={{padding:'0.2rem'}}></i>
                                    Twitter
                                  </span>
                                  <span className="text-nowrap">URL : {Info.twitter_url}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                  <i className="fab fa-instagram" style={{padding:'0.2rem'}}></i>
                                    Instagram
                                  </span>
                                  <span className="text-nowrap">URL : {Info.instagram_url}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    <i className="fab fa-whatsapp" style={{padding:'0.2rem'}}></i>
                                    Whatsapp
                                  </span>
                                  <span className="text-nowrap">URL : {Info.whatsapp_number}</span>
                                </p>
                                <br />

                                
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="8">
                            <Card className="card-stats">
                
                              <CardBody>
                                <Row>
                                  <div className="col">
                                    <CardTitle className="text-uppercase text-muted mb-0">
                                      Contacts Info
                                    </CardTitle>
                                  </div>
                                  <Col className="col-auto">
                                    <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                                      <i className="ni ni-chart-pie-35" />
                                    </div>
                                  </Col>
                                </Row>
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    English Address
                                  </span>
                                  <span className="text-nowrap">{Info.english_address}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Arabic Address
                                  </span>
                                  <span className="text-nowrap">{Info.arabic_address}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Phone
                                  </span>
                                  <span className="text-nowrap">{Info.phone}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Email
                                  </span>
                                  <span className="text-nowrap">{Info.email}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Latitude
                                  </span>
                                  <span className="text-nowrap">{Info.latitude}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Longitude
                                  </span>
                                  <span className="text-nowrap">{Info.longitude}</span>
                                </p>
                                <br />
                          
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    English Submitting Message
                                  </span>
                                  <span className="text-nowrap">{Info.english_submitting_message}</span>
                                </p>
                                <br />
                                <p className="mt-3 mb-0 ">
                                  <span className="text-danger mr-2">
                                    Arabic Submitting Message
                                  </span>
                                  <span className="text-nowrap">{Info.arabic_submitting_message}</span>
                                </p>
                              </CardBody>
                            </Card>
                          </Col>
              
                        </Row>
                        :
                        ''

                        }
                    
                      </Table>

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

export default Info;
