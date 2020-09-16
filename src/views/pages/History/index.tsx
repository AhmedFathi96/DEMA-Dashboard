
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Button,
  Modal,
  Collapse,
  Form,
  FormGroup,
  Input,
  Alert
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import {  IHistory } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getHistory, editHistory, createHistory, deleteHistory } from "../../../React-Redux/Actions/history-action";

const History: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<IHistory>({
    _id:'',
    arabic_content:'',
    arabic_date:'',
    english_content:'',
    english_date: '',
    order: '',
  })

  const {History,History_is_loading} = useSelect(state=> state.historyReducer)


  const [openedCollapsesArr , setOpenedCollapses] = useState([`collapse`])

  const collapsesToggle = (collapse:any) => {
    let openedCollapses:any = openedCollapsesArr;
    if (openedCollapses.includes(collapse)) {
      setOpenedCollapses([])
    } else {
      setOpenedCollapses([collapse])
    }
  };

  React.useEffect(() => {
    dispatch(getHistory())
  } , [])
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModel(pt => !pt);
  };

  const toggleNotificationModal = () => {
    setNotificationModel(pt => !pt);
  };

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log('Event' , e.target.History);
  
    const data = {
      arabic_content:e.target.arabic_content.value,
      arabic_date:e.target.arabic_date.value,
      english_content:e.target.english_content.value,
      english_date: e.target.english_date.value,
      order: e.target.order.value
    }
    if(is_editing){
      dispatch(editHistory({data:data , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createHistory(data));
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
                    Do you want to remove {obj.english_date} from History ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteHistory(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj?.english_date === ''? 'Create History': 'Edit History'}
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
              <label className="form-control-label" htmlFor="example-text-input">History Order</label>
              <Input id="order" name="order" defaultValue={obj.order} placeholder="Ex: 1 ..." type="text" />

            </FormGroup>
            <Alert className="alert-default">
              <strong>Header Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Date</label>
              <Input id="english_date" name="english_date" defaultValue={obj.english_date} placeholder="English Date ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Date</label>
              <Input id="arabic_date" name="arabic_date" defaultValue={obj.arabic_date} placeholder="Arabic Date ..." type="text" />
            </FormGroup>

            <Alert className="alert-default">
              <strong>Content Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English content</label>
              <Input id="english_content" rows="3" name="english_content" defaultValue={obj.english_content} placeholder="English content ..." type="textarea" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic content</label>
              <Input id="arabic_content" rows="3"  name="arabic_content" defaultValue={obj.arabic_content} placeholder="Arabic content ..." type="textarea" />
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
          History_is_loading?
            <>
              <SimpleHeader name="History" parentName="History" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">History table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj(
                              { _id:'',
                              arabic_date:'',
                              english_date:'',
                              arabic_content:'',
                        
                              english_content:'',
                            
                              order: ''}
                            )
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new History</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                        <div className={styles.default.cardsWrapper}>
                          {
                            History.length > 0?
                            History.map(item =>
                              
                              <Card className={styles.default.card}>
                          
                              <CardBody>
                                <CardTitle>
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Card Order : {item.order}</h3>
                                  
                                  <div style={{display:'flex'}}>
                                          <Button className="btn-icon btn-2" color="success" type="button" onClick={()=>{
                                            setObj({
                                                _id: item._id,
                                                arabic_date:item.arabic_date,
                                                english_date:item.english_date,
                                                arabic_content:item.arabic_content,
                                                english_content:item.english_content,
                                                order: item.order,

                                            })
                                            setEditing(true);
                                            toggleModal()
                                          
                                          }}>
                                            <span className="btn-inner--icon">
                                              <i className="ni ni-ungroup" />
                                            </span>
                                          </Button>
                                          <Button className="btn-icon btn-2" color="danger" type="button"
                                            onClick={()=>{
                                              toggleNotificationModal()
                                              setObj({
                                                _id: item._id,
                                                arabic_date:item.arabic_date,
                                                english_date:item.english_date,
                                                arabic_content:item.arabic_content,
                                                english_content:item.english_content,
                                                order: item.order,

                                            })
                                            }}
                                          >
                                            <span className="btn-inner--icon">
                                            <i className="ni ni-fat-remove"></i>
                                            </span>
                                          </Button>
                                        </div>
                                </div>
                              
                                </CardTitle>
                                <CardText>
                                <div className="accordion">
                                <Card className="card-plain">
                                    <CardHeader
                                      role="tab"
                                      onClick={() => collapsesToggle(`collapse${item._id}`)}
                                      aria-expanded={openedCollapsesArr.includes(
                                        `collapse${item._id}`
                                      )}
                                    >
                                      <h5 className="mb-0"> {item.english_date} Date</h5>
                                    </CardHeader>
                                    <Collapse
                                      role="tabpanel"
                                      isOpen={openedCollapsesArr.includes(`collapse${item._id}`)}
                                    >
                                      <CardBody>
                                          <div className={styles.default.infoWrapper}>
                                            <span>History English Date: {item.english_date}</span>
                                            <span>History Arabic Date: {item.arabic_date}</span>
                                
                                          </div>
                                          
                                      </CardBody>
                                    </Collapse>
                                  </Card>
                                <Card className="card-plain">
                                  <CardHeader
                                    role="tab"
                                    onClick={() => collapsesToggle(`collapse${item._id}2`)}
                                    aria-expanded={openedCollapsesArr.includes(
                                      `collapse${item._id}2`
                                    )}
                                  >
                                    <h5 className="mb-0">{item.english_date} Content</h5>
                                  </CardHeader>
                                  <Collapse
                                    role="tabpanel"
                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}2`)}
                                  >
                                    <CardBody>
                                        <div className={styles.default.infoWrapper}>
                                            <span>History English Content: {item.english_content}</span>
                                            <span>History Arabic Content: {item.arabic_content}</span>
                                      
                                        </div>  
                                    </CardBody>
                                  </Collapse>
                                </Card>
  
                                </div>
  
                                
                                </CardText>
                                
                              </CardBody>
                            
                            </Card>
                            
                            )
                            :
                            <Alert className={`alert-default ${styles.default.alert}`}>
                              <strong>Attention!</strong> There are no Historys to show, please Create new one from the button in the top right corner
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

export default History;
