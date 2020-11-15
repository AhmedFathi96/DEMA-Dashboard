
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
    arabic_desc:'',
    count:'',
    english_desc:'',
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
    let data = new FormData();

    // arabic_desc:'',
    // count:'',
    // english_desc:'',
    data.append('count', e.target.count.value);
    data.append('arabic_desc', e.target.arabic_desc.value);

    data.append('english_desc', e.target.english_desc.value);
    data.append('statistic_img', e.target.statistic_img.files[0]);

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
                    Do you want to remove {obj.english_desc} from Statistics ? to confirm please press delete otherwise close
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
              {obj?.english_desc === ''? 'Create Statistic': 'Edit Statistic'}
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
            <Alert className="alert-default">
              <strong>Count Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Count</label>
              <Input id="count" name="count" defaultValue={obj.count} placeholder="count ..." type="text" />
            </FormGroup>

            <Alert className="alert-default">
              <strong>Content Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Sub Header</label>
              <Input id="english_desc" rows="3" name="english_desc" defaultValue={obj.english_desc} placeholder="English Content ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Sub Header</label>
              <Input id="arabic_desc" rows="3"  name="arabic_desc" defaultValue={obj.arabic_desc} placeholder="Arabic Content ..." type="text" />
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
                              { 
                                _id:'',
                                count:'',
                                arabic_desc:'',
                                english_desc:'',
                              }
                            )
                          
                          }} className={`btn-icon btn-2`} color="default" type="button">
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
                                src={`http://localhost:6100/api/statistic/get-statistic-image/${item._id}/view`}
                                top 
                              />
                              <CardBody>
                                <CardTitle>
                                <div>                                  
                                  <div style={{display:'flex' , alignItems:'center', justifyContent:'flex-end'}}>
                                          <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{
                                            setObj({
                                                _id: item._id,
                                                count:item.count,
                                                arabic_desc:item.arabic_desc,
                                                english_desc:item.english_desc,

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
                                                count:item.count,
                                                arabic_desc:item.arabic_desc,
                                                english_desc:item.english_desc,
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
                              
                                </CardTitle>
                                <CardText>
                                <div className="accordion">

                                    <div className={styles.default.infoWrapper}>
                                        <span><b>Statistic Number:</b>: {item.count}</span>
                                    </div>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>English Description:</b> {item.english_desc}</span>
                                        <span><b>Arabic Description:</b> {item.arabic_desc}</span>
                                    </div>
                        
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
