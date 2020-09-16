
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
  Collapse,
  Form,
  FormGroup,
  Input,
  Alert
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import {  IStatistic } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getStatistics, editStatistic, createStatistic, deleteStatistic } from "../../../React-Redux/Actions/statistic-action";

const Statistics: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<IStatistic>({
    _id:'',
    header:'',
    arabic_sub_header:'',
    english_sub_header:'',
    order: '',
  })

  const {Statistic,Statistic_is_loading} = useSelect(state=> state.statisticReducer)


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
    dispatch(getStatistics())
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
    console.log('Event' , e.target.value);
    let data = new FormData();
    data.append('header', e.target.header.value);
    data.append('arabic_sub_header', e.target.arabic_sub_header.value);

    data.append('english_sub_header', e.target.english_sub_header.value);
    data.append('order', e.target.order.value);
    data.append('statistic_img', e.target.statistic_img.files[0]);

    console.log('Obj =====>' , obj);

    if(is_editing){
      dispatch(editStatistic({data:data , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createStatistic(data));
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
                    Do you want to remove {obj.header} from Statistics ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteStatistic(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj?.header === ''? 'Create Statistic': 'Edit Statistic'}
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
              <label className="form-control-label" htmlFor="example-text-input">Statistic Order</label>
              <Input id="order" name="order" defaultValue={obj.order} placeholder="Ex: 1 ..." type="text" />
            </FormGroup>
            <Alert className="alert-default">
              <strong>Header Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Header</label>
              <Input id="header" name="header" defaultValue={obj.header} placeholder="English Header ..." type="text" />
            </FormGroup>

            <Alert className="alert-default">
              <strong>Sub Header Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Sub Header</label>
              <Input id="english_sub_header" rows="3" name="english_sub_header" defaultValue={obj.english_sub_header} placeholder="English Header ..." type="textarea" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Sub Header</label>
              <Input id="arabic_sub_header" rows="3"  name="arabic_sub_header" defaultValue={obj.arabic_sub_header} placeholder="Arabic Header ..." type="textarea" />
            </FormGroup>

            <div className="custom-file">
              <input
                className="custom-file-input"
                id="statistic_img"
                name="statistic_img"
                lang="en"
                type="file"
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                Select Statistic image
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
          Statistic_is_loading?
            <>
              <SimpleHeader name="Statistics" parentName="Statistics" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Statistics table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj(
                              { _id:'',
                              header:'',
                              arabic_sub_header:'',
                              english_sub_header:'',
                              order: ''}
                            )
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new Statistic</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                        <div className={styles.default.cardsWrapper}>
                          {
                            Statistic.length > 0?
                            Statistic.map(item =>
                              
                              <Card className={styles.default.card}>
                              <CardImg
                                alt="..."
                                className={styles.default.img}
                                src={`http://localhost:6100/api/statistics/get-statistic-image/${item._id}/view`}
                                top 
                              />
                              <CardBody>
                                <CardTitle>
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Card Order : {item.order}</h3>
                                  
                                  <div style={{display:'flex'}}>
                                          <Button className="btn-icon btn-2" color="success" type="button" onClick={()=>{
                                            setObj({
                                                _id: item._id,
                                                header:item.header,
                                                arabic_sub_header:item.arabic_sub_header,
                                                english_sub_header:item.english_sub_header,
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
                                                header:item.header,
                                                arabic_sub_header:item.arabic_sub_header,
                                                english_sub_header:item.english_sub_header,
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
                                      <h5 className="mb-0"> {item.english_sub_header} Statistic Number</h5>
                                    </CardHeader>
                                    <Collapse
                                      role="tabpanel"
                                      isOpen={openedCollapsesArr.includes(`collapse${item._id}`)}
                                    >
                                      <CardBody>
                                          <div className={styles.default.infoWrapper}>
                                            <span>Statistic Number: {item.header}</span>
                                          
                                      
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
                                    <h5 className="mb-0">Sub Header</h5>
                                  </CardHeader>
                                  <Collapse
                                    role="tabpanel"
                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}2`)}
                                  >
                                    <CardBody>
                                        <div className={styles.default.infoWrapper}>
                                            <span>sub Header: {item.english_sub_header}</span>
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
                              <strong>Attention!</strong> There are no Statistics to show, please Create new one from the button in the top right corner
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

export default Statistics;
