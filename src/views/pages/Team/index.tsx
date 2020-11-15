
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
import {  ITeam } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getTeams, editTeam, createTeam, deleteTeam } from "../../../React-Redux/Actions/team-action";

const Team: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)

  const [obj , setObj] = useState<ITeam>({
    _id:'',
    arabic_job:'',
    arabic_name:'',
    english_job:'',
    english_name:''
  })

  const {Team,Team_is_loading} = useSelect(state=> state.TeamReducer)


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
    dispatch(getTeams())
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

    data.append('arabic_job', e.target.arabic_job.value);
    data.append('arabic_name', e.target.arabic_name.value);

    data.append('english_job', e.target.english_job.value);
    data.append('english_name', e.target.english_name.value);

    data.append('team_img', e.target.team_img.files[0]);


    if(is_editing){
      dispatch(editTeam({data:data , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createTeam(data));
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
                    Do you want to remove {obj.english_name} from Team ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteTeam(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj?.english_name === ''? 'Create Team': 'Edit Team'}
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
              <strong>Team Member Name</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Name</label>
              <Input id="english_name"  name="english_name" defaultValue={obj.english_name} placeholder="English Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Name</label>
              <Input id="arabic_name"   name="arabic_name" defaultValue={obj.arabic_name} placeholder="Arabic Name ..." type="text" />
            </FormGroup>

            <Alert className="alert-default">
              <strong>Team Member Job</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Job</label>
              <Input id="english_job"  name="english_job" defaultValue={obj.english_job} placeholder="English Job ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Job</label>
              <Input id="arabic_job"   name="arabic_job" defaultValue={obj.arabic_job} placeholder="Arabic Job ..." type="text" />
            </FormGroup>

            <div className="custom-file">
              <input
                className="custom-file-input"
                id="team_img"
                name="team_img"
                lang="en"
                type="file"
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                Select Team Member image
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
          Team_is_loading?
            <>
              <SimpleHeader name="Team" parentName="Team" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Team table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj(
                              { 
                                _id:'',
                                arabic_job:'',
                                arabic_name:'',
                                english_job:'',
                                english_name:''
                              }
                            )
                          
                          }} className={`btn-icon btn-2`} color="default" type="button">
                              <span className="btn-inner--text">Create new Team</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                        <div className={styles.default.cardsWrapper}>
                          {
                            Team.length > 0?
                            Team.map(item =>
                              
                              <Card className={styles.default.card}>
                              <CardImg
                                alt="..."
                                className={styles.default.img}
                                src={`http://localhost:6100/api/Team/get-Team-image/${item._id}/view`}
                                top 
                              />
                              <CardBody>
                                <CardTitle>
                                <div>                                  
                                  <div style={{display:'flex' , alignItems:'center', justifyContent:'flex-end'}}>
                                          <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{
                                            setObj({
                                                _id: item._id,
                                                arabic_job:item.arabic_job,
                                                arabic_name:item.arabic_name,
                                                english_job:item.english_job,
                                                english_name:item.english_name
                                              

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
                                                arabic_job:item.arabic_job,
                                                arabic_name:item.arabic_name,
                                                english_job:item.english_job,
                                                english_name:item.english_name
                                              
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
                                        <span><b>English Name:</b>: {item.english_name}</span>
                                        <span><b>Arabic Name:</b>: {item.arabic_name}</span>
                                    </div>
                                    <div className={styles.default.infoWrapper}>
                                        <span><b>English Job:</b> {item.english_job}</span>
                                        <span><b>Arabic Job:</b> {item.arabic_job}</span>
                                    </div>
                        
                                </div>
  
                                
                                </CardText>
                                
                              </CardBody>
                            
                            </Card>
                            
                            )
                            :
                            <Alert className={`alert-default ${styles.default.alert}`}>
                              <strong>Attention!</strong> There are no Team to show, please Create new one from the button in the top right corner
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

export default Team;
