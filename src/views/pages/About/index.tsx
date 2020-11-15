
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
        english_header: About[0]?.english_header,
        english_sub_header: About[0]?.english_sub_header,
        english_content: About[0]?.english_content,
        english_mission: About[0]?.english_mission,
        english_mission_content: About[0]?.english_mission_content,
        english_vision: About[0]?.english_vision,
        english_vision_content: About[0]?.english_vision_content,
        english_goal: About[0]?.english_goal,
        english_goal_content: About[0]?.english_goal_content,
        arabic_content:About[0]?.arabic_content,
        arabic_goal:About[0]?.arabic_goal,
        arabic_goal_content:About[0]?.arabic_goal_content,
        arabic_header:About[0]?.arabic_header,
        arabic_mission:About[0]?.arabic_mission,
        arabic_mission_content:About[0]?.arabic_mission_content,
        arabic_sub_header:About[0]?.arabic_sub_header,
        arabic_vision:About[0]?.arabic_vision,
        arabic_vision_content:About[0]?.arabic_vision_content

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
      
        let data = {
            english_header: e.target.english_header.value,
            english_sub_header:  e.target.english_sub_header.value,
            english_content:  e.target.english_content.value,
            english_mission: e.target.english_mission.value,
            english_mission_content: e.target.english_mission_content.value,
            english_vision: e.target.english_vision.value,
            english_vision_content: e.target.english_vision_content.value,
            english_goal: e.target.english_goal.value,
            english_goal_content:e.target.english_goal_content.value,

            arabic_header: e.target.arabic_header.value,
            arabic_sub_header:  e.target.arabic_sub_header.value,
            arabic_content:  e.target.arabic_content.value,
            arabic_mission: e.target.arabic_mission.value,
            arabic_mission_content: e.target.arabic_mission_content.value,
            arabic_vision: e.target.arabic_vision.value,
            arabic_vision_content: e.target.arabic_vision_content.value,
            arabic_goal: e.target.arabic_goal.value,
            arabic_goal_content:e.target.arabic_goal_content.value,
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
                {obj?.english_header === ''? 'Create About': 'Edit About'}
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
                    <label className="form-control-label" htmlFor="example-text-input">English Header</label>
                    <Input id="english_header" name="english_header" defaultValue={obj.english_header} placeholder="English Header ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Header</label>
                    <Input id="arabic_header" name="arabic_header" defaultValue={obj.arabic_header} placeholder="Arabic Header ..." type="text" />
                </FormGroup>


                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Sub Header</label>
                    <Input id="english_sub_header" name="english_sub_header" defaultValue={obj.english_sub_header} placeholder="English Sub Header ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Sub Header</label>
                    <Input id="arabic_sub_header" name="arabic_sub_header" defaultValue={obj.arabic_sub_header} placeholder="Arabic Sub Header ..." type="text" />
                </FormGroup>


                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Content</label>
                    <Input id="english_content" rows="5" name="english_content" defaultValue={obj.english_content} placeholder="English content ..." type="textarea" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Content</label>
                    <Input id="arabic_content" rows="5" name="arabic_content" defaultValue={obj.arabic_content} placeholder="Arabic content ..." type="textarea" />
                </FormGroup>

                <Alert className="alert-default">
                <strong>Mission Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Mission</label>
                    <Input id="english_mission" rows="5" name="english_mission" defaultValue={obj.english_mission} placeholder="English Mission ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Mission</label>
                    <Input id="arabic_mission" rows="5" name="arabic_mission" defaultValue={obj.arabic_mission} placeholder="Arabic Mission ..." type="text" />
                </FormGroup>


                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Mission Content</label>
                    <Input id="english_mission_content" rows="5" name="english_mission_content" defaultValue={obj.english_mission_content} placeholder="English Mission content ..." type="textarea" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Mission Content</label>
                    <Input id="arabic_mission_content" rows="5" name="arabic_mission_content" defaultValue={obj.arabic_mission_content} placeholder="Arabic Mission content ..." type="textarea" />
                </FormGroup>


                <Alert className="alert-default">
                <strong>Vision Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Vision</label>
                    <Input id="english_vision" rows="5" name="english_vision" defaultValue={obj.english_vision} placeholder="English Vision ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Vision</label>
                    <Input id="arabic_vision" rows="5" name="arabic_vision" defaultValue={obj.arabic_vision} placeholder="Arabic Vision ..." type="text" />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Vision Content</label>
                    <Input id="english_vision_content" rows="5" name="english_vision_content" defaultValue={obj.english_vision_content} placeholder="English Vision content ..." type="textarea" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Vision Content</label>
                    <Input id="vision_content" rows="5" name="arabic_vision_content" defaultValue={obj.arabic_vision_content} placeholder="Arabic Vision content ..." type="textarea" />
                </FormGroup>

                <Alert className="alert-default">
                <strong>Goal Main Info</strong>
                </Alert>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">English Goal</label>
                    <Input id="english_goal" rows="5" name="english_goal" defaultValue={obj.english_goal} placeholder="English Goal ..." type="text" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Arabic Goal</label>
                    <Input id="arabic_goal" rows="5" name="arabic_goal" defaultValue={obj.arabic_goal} placeholder="Arabic Goal ..." type="text" />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Goal Content</label>
                    <Input id="english_goal_content" rows="5" name="english_goal_content" defaultValue={obj.english_goal_content} placeholder="English Goal content ..." type="textarea" />
                </FormGroup>
                <FormGroup>
                    <label className="form-control-label" htmlFor="example-text-input">Goal Content</label>
                    <Input id="arabic_goal_content" rows="5" name="arabic_goal_content" defaultValue={obj.arabic_goal_content} placeholder="Arabic Goal content ..." type="textarea" />
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
                                    english_header: About[0]?.english_header,
                                    english_sub_header: About[0]?.english_sub_header,
                                    english_content: About[0]?.english_content,
                                    english_mission: About[0]?.english_mission,
                                    english_mission_content: About[0]?.english_mission_content,
                                    english_vision: About[0]?.english_vision,
                                    english_vision_content: About[0]?.english_vision_content,
                                    english_goal: About[0]?.english_goal,
                                    english_goal_content: About[0]?.english_goal_content,
                                    arabic_content:About[0]?.arabic_content,
                                    arabic_goal:About[0]?.arabic_goal,
                                    arabic_goal_content:About[0]?.arabic_goal_content,
                                    arabic_header:About[0]?.arabic_header,
                                    arabic_mission:About[0]?.arabic_mission,
                                    arabic_mission_content:About[0]?.arabic_mission_content,
                                    arabic_sub_header:About[0]?.arabic_sub_header,
                                    arabic_vision:About[0]?.arabic_vision,
                                    arabic_vision_content:About[0]?.arabic_vision_content
                                    
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
                                        
                                            <div className="accordion">
                                                <Alert className="alert-default">
                                                    <strong>{item.english_header} | {item.arabic_header} Main Info</strong>
                                                </Alert>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Header</b>: {item.english_sub_header}</span>
                                                    <span><b>Arabic Content</b>: {item.arabic_sub_header}</span>
                                                </div>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Header</b>: {item.english_content}</span>
                                                    <span><b>Arabic Content</b>: {item.arabic_content}</span>
                                                </div>
                                                <Alert className="alert-default">
                                                    <strong>Vision Info</strong>
                                                </Alert>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Header</b>: {item.english_vision}</span>
                                                    <span><b>Arabic Header</b>: {item.arabic_vision}</span>
                                                </div>  
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Content</b>: {item.english_vision_content}</span>
                                                    <span><b>Arabic Content</b>: {item.arabic_vision_content}</span>
                                                </div>  
                                                <Alert className="alert-default">
                                                    <strong>Mission Info</strong>
                                                </Alert>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Header</b>: {item.english_mission}</span>
                                                    <span><b>Arabic Header</b>: {item.arabic_mission}</span>
                                                </div>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Content</b>: {item.english_mission_content}</span>
                                                    <span><b>Arabic Content</b>: {item.arabic_mission_content}</span>
                                                </div>  
                                                <Alert className="alert-default">
                                                    <strong>Goal Info</strong>
                                                </Alert>
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Header</b>: {item.english_goal}</span>
                                                    <span><b>Arabic Header</b>: {item.arabic_goal}</span>
                                                
                                                </div>  
                                                <div className={styles.default.infoWrapper}>
                                                    <span><b>English Content</b>: {item.english_goal_content}</span>
                                                    <span><b>Arabic Content</b>: {item.arabic_goal_content}</span>                                                
                                                </div>  
                                
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
