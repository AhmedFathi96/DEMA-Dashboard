
import React, { useState } from "react";
import * as styles from './styles.module.css';
// reactstrap components
import {
Card,
CardHeader,
Container,
Row,
Button,
Modal,
Form,
FormGroup,
Input,
CardBody,
CardTitle,
Alert,
Collapse,
Col,
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import { IAboutSection } from "../../../lib";
import { getAbout , editAbout, createAbout } from "../../../React-Redux/Actions/about-action";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';

const About: React.FC = () => {

    const [modal , setModel] = useState(false)
    
    const {About,about_is_loading} = useSelect(state=> state.aboutReducer)


    const [is_editing , setEditing] = useState(false)
    const [obj , setObj] = useState<IAboutSection>({
        _id:'',
        header: About[0]?.header,
        sub_header: About[0]?.sub_header,
        content: About[0]?.content,
        mission: About[0]?.mission,
        mission_content: About[0]?.mission_content,
        vision: About[0]?.vision,
        vision_content: About[0]?.vision_content,
        goal: About[0]?.goal,
        goal_content: About[0]?.goal_content

    })

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
        dispatch(getAbout())
    } , [])
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModel(pt => !pt);
    };

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        console.log('Event' , e.target.value);
        let data = {
            header: e.target.header.value,
            sub_header:  e.target.sub_header.value,
            content:  e.target.content.value,
            mission: e.target.mission.value,
            mission_content: e.target.mission_content.value,
            vision: e.target.vision.value,
            vision_content: e.target.vision_content.value,
            goal: e.target.goal.value,
            goal_content:e.target.goal_content.value,
        }

        if(is_editing){
            dispatch(editAbout({data:data , id:obj._id === undefined? '':obj._id}))
            toggleModal();
        }
        else{
            dispatch(createAbout(data))
            toggleModal();
        }
        
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
                {obj?.header === ''? 'Create About': 'Edit About'}
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
                <strong>Header Main Info</strong>
                </Alert>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Header</label>
                    <Input id="header" name="header" defaultValue={obj.header} placeholder="English Header ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Sub Header</label>
                    <Input id="sub_header" name="sub_header" defaultValue={obj.sub_header} placeholder="Sub Header ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Content</label>
                    <Input id="content" rows="5" name="content" defaultValue={obj.content} placeholder="content ..." type="textarea" />
                </FormGroup>

                <Alert className="alert-default">
                <strong>Mission Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Mission</label>
                    <Input id="mission" rows="5" name="mission" defaultValue={obj.mission} placeholder="Mission ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Mission Content</label>
                    <Input id="mission_content" rows="5" name="mission_content" defaultValue={obj.mission_content} placeholder="Mission content ..." type="textarea" />
                </FormGroup>

                <Alert className="alert-default">
                <strong>Vision Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Vision</label>
                    <Input id="vision" rows="5" name="vision" defaultValue={obj.vision} placeholder="Vision ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Vision Content</label>
                    <Input id="vision_content" rows="5" name="vision_content" defaultValue={obj.vision_content} placeholder="Vision content ..." type="textarea" />
                </FormGroup>

                <Alert className="alert-default">
                <strong>Goal Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Goal</label>
                    <Input id="goal" rows="5" name="goal" defaultValue={obj.goal} placeholder="Goal ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Goal Content</label>
                    <Input id="goal_content" rows="5" name="goal_content" defaultValue={obj.goal_content} placeholder="Goal content ..." type="textarea" />
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
            about_is_loading?
                <>
                <SimpleHeader name="About" parentName="About" />
                <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                        <CardHeader className="border-0">
                            <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                            <h3 className="mb-0">About Table</h3>
                            
                                <Button onClick={()=>{
                                toggleModal();
                                setEditing(false);
                                setObj(
                                    { 
                                    _id:About[0]._id,
                                    header: About[0]?.header,
                                    sub_header: About[0]?.sub_header,
                                    content: About[0]?.content,
                                    mission: About[0]?.mission,
                                    mission_content: About[0]?.mission_content,
                                    vision: About[0]?.vision,
                                    vision_content: About[0]?.vision_content,
                                    goal: About[0]?.goal,
                                    goal_content: About[0]?.goal_content
                                    
                                    }
                                )
                                
                                }} className="btn-icon btn-2" color="default" type="button">
                                    <span className="btn-inner--text">Edit About section</span>
                                    <span className="btn-inner--icon">
                                    <i className="ni ni-fat-add"></i>
                                    </span>
                                    
                                </Button>
                            
                        
                            </div>
                            
                        </CardHeader>

                            <div className={styles.default.cardsWrapper}>
                            {
                                About.length > 0?
                                About.map((item:IAboutSection) =>
                                
                                <Card className={styles.default.card}>

                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                            <CardTitle className="text-uppercase text-muted mb-0">
                                                {item.header}
                                            </CardTitle>
                                            </div>
                                            <Col className="col-auto">
                                            <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                                                <i className="ni ni-active-40" />
                                            </div>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col lg="5">
                                                <span className="h2 font-weight-bold mb-0">
                                                    <p className="text-uppercase text-muted">About Sub header:</p>{item.sub_header}
                                                </span>
                                                <br />
                                                <span className="h2 font-weight-bold mb-0">
                                                    <p className="text-uppercase text-muted">About Content:</p>{item.content}
                                                </span>
                                                <br />
                                                <span className="h2 font-weight-bold mb-0">
                                                    <p className="text-uppercase text-muted">Vision header:</p>{item.vision}
                                                </span>
                                                <br />
                                                <span className="h2 font-weight-bold mb-0">
                                                    <p className="text-uppercase text-muted">Vision Content:</p>{item.vision_content}
                                                </span>
                                            </Col>
                                        </Row>
                                         */}
                                            <div className="accordion">
                                                <Card className="card-plain">
                                                    <CardHeader
                                                    role="tab"
                                                    onClick={() => collapsesToggle(`collapse${item._id}`)}
                                                    aria-expanded={openedCollapsesArr.includes(
                                                        `collapse${item._id}`
                                                    )}
                                                    >
                                                    <h5 className="mb-0"> About header</h5>
                                                    </CardHeader>
                                                    <Collapse
                                                    role="tabpanel"
                                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}`)}
                                                    >
                                                    <CardBody>
                                                        <div className={styles.default.infoWrapper}>
                                                            <span><b>About Header</b>: {item.sub_header}</span>
                                                            <span><b>About Content</b>: {item.content   }</span>
                                                        
                                            
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
                                                    <h5 className="mb-0">Vision header</h5>
                                                </CardHeader>
                                                <Collapse
                                                    role="tabpanel"
                                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}2`)}
                                                >
                                                    <CardBody>
                                                        <div className={styles.default.infoWrapper}>
                                                            <span><b>Vision Header</b>: {item.vision_content}</span>
                                                            <span><b>Vision Content</b>: {item.vision_content}</span>
                                                        
                                                        </div>  
                                                    </CardBody>
                                                </Collapse>
                                                </Card>
                                                <Card className="card-plain">
                                                <CardHeader
                                                    role="tab"
                                                    onClick={() => collapsesToggle(`collapse${item._id}3`)}
                                                    aria-expanded={openedCollapsesArr.includes(
                                                    `collapse${item._id}2`
                                                    )}
                                                >
                                                    <h5 className="mb-0">Mission header</h5>
                                                </CardHeader>
                                                <Collapse
                                                    role="tabpanel"
                                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}3`)}
                                                >
                                                    <CardBody>
                                                        <div className={styles.default.infoWrapper}>
                                                            <span><b>Mission Header</b>: {item.mission}</span>
                                                            <span><b>Mission Content</b>: {item.mission_content}</span>
                                                        
                                                        </div>  
                                                    </CardBody>
                                                </Collapse>
                                                </Card>
                                                <Card className="card-plain">
                                                <CardHeader
                                                    role="tab"
                                                    onClick={() => collapsesToggle(`collapse${item._id}4`)}
                                                    aria-expanded={openedCollapsesArr.includes(
                                                    `collapse${item._id}2`
                                                    )}
                                                >
                                                    <h5 className="mb-0">Goal header</h5>
                                                </CardHeader>
                                                <Collapse
                                                    role="tabpanel"
                                                    isOpen={openedCollapsesArr.includes(`collapse${item._id}4`)}
                                                >
                                                    <CardBody>
                                                        <div className={styles.default.infoWrapper}>
                                                            <span><b>Goal Header</b>: {item.goal}</span>
                                                            <span><b>Goal Content</b>: {item.goal_content}</span>
                                                        
                                                        </div>  
                                                    </CardBody>
                                                </Collapse>
                                                </Card>
                
                                                </div>
  
                                
                                    </CardBody>
                                </Card>
        
                                )
                                :
                                <Alert className={`alert-default ${styles.default.alert}`}>
                                <strong>Attention!</strong> There are no About to show, please Create new one from the button in the top right corner
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
export default About;
