
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
  Alert, Badge, Col
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import {  IColor, ISize, ITag, IBadge } from "../../../lib";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { getTags, editTag, createTag, deleteTag, getSizes, editSize, createSize, deleteSize, getColors, editColor, createColor, deleteColor, getBadges, createBadge, editBadge, deleteBadge } from "../../../React-Redux/Actions/itemInfo-action";

const ItemInfo: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false);
  const [sizeModal , setSizeModel] = useState(false)

  const [size_notification_modal , setSizeNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false);


  const [colorModal , setColorModel] = useState(false)
  const [color_notification_modal , setColorNotificationModel] = useState(false)

  const [badgeModal , setBadgeModel] = useState(false)
  const [badge_notification_modal , setBadgeNotificationModel] = useState(false)

  const [obj , setObj] = useState<ITag>({
    _id:'',
    arabic_name:'',
    english_name:''
  })

  const [sizeObj , setSizeObj] = useState<ISize>({
    _id:'',
    name:''
  })

  const [colorObj , setColorObj] = useState<IColor>({
    _id:'',
    arabic_name:'',
    english_name:'',
    value:''
  })

  const [badgeObj , setBadgeObj] = useState<IBadge>({
    _id:'',
    arabic_name:'',
    english_name:''
  })
  const {tags,tags_is_loading, sizes , sizes_is_loading ,badges,badges_is_loading, colors , colors_is_loading} = useSelect(state=> state.itemInfoReducer)

  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(getTags());
    dispatch(getSizes());
    dispatch(getColors());
    dispatch(getBadges())
  }, []);

  

  const toggleModal = () => {
    setModel(pt => !pt);
  };
  const toggleNotificationModal = () => {
    setNotificationModel(pt => !pt);
  };
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log('Event' , e.target.value);
    let TagsData: ITag= {
      arabic_name: e.target.arabic_name.value,
      english_name:  e.target.english_name.value,
    }

    if(is_editing){
      dispatch(editTag({data:TagsData , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createTag(TagsData));
      toggleModal();
    }
  }
  



  const toggleSizeModal = () => {
    setSizeModel(pt => !pt);
  };
  const toggleSizeNotificationModal = () => {
    setSizeNotificationModel(pt => !pt);
  };
  const handleSizeSubmit = (e:any) =>{
    e.preventDefault();
    console.log('Event' , e.target.value);
    let sizeData: ISize= {
      name:  e.target.name.value,
    }
    if(is_editing){
      dispatch(editSize({data:sizeData , id:sizeObj._id === undefined? '':sizeObj._id}));
      toggleSizeModal();
    }else{
      dispatch(createSize(sizeData));
      toggleSizeModal();
    }
  }


  const toggleColorModal = () => {
    setColorModel(pt => !pt);
  };
  const toggleColorNotificationModal = () => {
    setColorNotificationModel(pt => !pt);
  };
  const handleColorSubmit = (e:any) =>{
    e.preventDefault();
    console.log('Event' , e.target.value);
    let ColorData: IColor= {
      arabic_name: e.target.arabic_name.value,
      english_name:  e.target.english_name.value,
      value: e.target.value.value,
    }

    if(is_editing){
      dispatch(editColor({data:ColorData , id:colorObj._id === undefined? '':colorObj._id}));
      toggleColorModal();
    }else{
      dispatch(createColor(ColorData));
      toggleColorModal();
    }
  }



  
  const toggleBadgeModal = () => {
    setBadgeModel(pt => !pt);
  };
  const toggleBadgeNotificationModal = () => {
    setBadgeNotificationModel(pt => !pt);
  };
  const handleBadgeSubmit = (e:any) =>{
    e.preventDefault();
    console.log('Event' , e.target.value);
    let BadgeData: IBadge= {
      arabic_name: e.target.arabic_name.value,
      english_name:  e.target.english_name.value,
    }

    if(is_editing){
      dispatch(editBadge({data:BadgeData , id:badgeObj._id === undefined? '':badgeObj._id}));
      toggleColorModal();
    }else{
      dispatch(createBadge(BadgeData));
      toggleColorModal();
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
                    Do you want to remove {obj.english_name} from Tag ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteTag(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj?.arabic_name === ''? 'Create Tag': 'Edit Tag'}
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
              <strong>Tag Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Name</label>
              <Input id="english_name" name="english_name" defaultValue={obj.english_name} placeholder="English Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Name</label>
              <Input id="arabic_name" name="arabic_name" defaultValue={obj.arabic_name} placeholder="Arabic Name ..." type="text" />
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
      


        <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={color_notification_modal}
              toggle={toggleColorNotificationModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="colorModal"
                  type="button"
                  onClick={toggleColorNotificationModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    Do you want to remove {obj.english_name} from Colors ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteColor(colorObj._id !== undefined? colorObj._id: '')); toggleColorNotificationModal()}}>
                  Delete
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="colorModal"
                  type="button"
                  onClick={toggleColorNotificationModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={colorModal}
          toggle={() =>toggleColorModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {obj?.arabic_name === ''? 'Create Color': 'Edit Color'}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="colorModal"
              type="button"
              onClick={toggleColorModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
          <Form role="form" onSubmit={(event) => handleColorSubmit(event)}>
            <Alert className="alert-default">
              <strong>Color Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Name</label>
              <Input id="english_name" name="english_name" defaultValue={colorObj.english_name} placeholder="English Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Name</label>
              <Input id="arabic_name" name="arabic_name" defaultValue={colorObj.arabic_name} placeholder="Arabic Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Color Value</label>
              <Input id="value" name="value" defaultValue={colorObj.value} placeholder="Color Value ..." type="color" />
            </FormGroup>
    
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleColorModal}
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
      



        <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={badge_notification_modal}
              toggle={toggleBadgeNotificationModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="badgeModal"
                  type="button"
                  onClick={toggleBadgeNotificationModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    Do you want to remove {obj.english_name} from Badges ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteBadge(badgeObj._id !== undefined? badgeObj._id: '')); toggleBadgeNotificationModal()}}>
                  Delete
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="badgeModal"
                  type="button"
                  onClick={toggleBadgeNotificationModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={badgeModal}
          toggle={() =>toggleBadgeModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {obj?.arabic_name === ''? 'Create Badge': 'Edit Badge'}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="badgeModal"
              type="button"
              onClick={toggleBadgeModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
          <Form role="form"onSubmit={(event) => handleBadgeSubmit(event)}>
            <Alert className="alert-default">
              <strong>Badge Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">English Name</label>
              <Input id="english_name" name="english_name" defaultValue={badgeObj.english_name} placeholder="English Name ..." type="text" />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Arabic Name</label>
              <Input id="arabic_name" name="arabic_name" defaultValue={badgeObj.arabic_name} placeholder="Arabic Name ..." type="text" />
            </FormGroup>
    
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleBadgeModal}
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
      

        <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={size_notification_modal}
              toggle={toggleSizeNotificationModal}
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
                  onClick={toggleSizeNotificationModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    Do you want to remove {sizeObj.name} from Sizes ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteSize(sizeObj._id !== undefined? sizeObj._id: '')); toggleSizeNotificationModal()}}>
                  Delete
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleSizeNotificationModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={sizeModal}
          toggle={() =>toggleSizeModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {obj?.arabic_name === ''? 'Create Color': 'Edit Color'}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="sizeModal"
              type="button"
              onClick={toggleSizeModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
          <Form role="form"onSubmit={(event) => handleSizeSubmit(event)}>
            <Alert className="alert-default">
              <strong>Color Main Info</strong>
            </Alert>
            <FormGroup>
              <label className="form-control-label" htmlFor="example-text-input">Name</label>
              <Input id="name" name="name" defaultValue={sizeObj.name} placeholder="Name ..." type="text" />
            </FormGroup>
          
    
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="sizeModal"
                type="button"
                onClick={toggleSizeModal}
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
          (tags_is_loading && sizes_is_loading && colors_is_loading)?
            <>
              <SimpleHeader name="Tag" parentName="Tag" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card className={styles.default.cardContainer}>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Item Info table</h3>
                        </div>
                        
                      </CardHeader>

                        <Row>
                          <Col lg="6">
                            <Card className={styles.default.cardContainer}>
                              <CardHeader className="border-0">
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Tag table</h3>
                                  
                                  <Button onClick={()=>{
                                    toggleModal();
                                    setEditing(false);
                                    setObj(
                                      { _id:'',
                                      arabic_name:'',
                                      english_name:''
                                    }
                                    )
                                  
                                  }} className="btn-icon btn-2" color="default" type="button">
                                      <span className="btn-inner--text">Create new Tag</span>
                                      <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add"></i>
                                      </span>
                                      
                                  </Button>
                                </div>
                                
                              </CardHeader>

                                <div className={styles.default.cardsWrapper}>
                                  {
                                    tags.length > 0?
                                    tags.map(item =>
                                      
                                      <Badge className={`badge-lg ${styles.default.badge}`} color="primary" pill>
                                        <span className={styles.default.span}>{item.english_name}- {item.arabic_name}</span>
                                        <div  style={{display:'flex'}}>
                                              <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" onClick={()=>{
                                                    setObj({
                                                        _id: item._id,
                                                        arabic_name:item.arabic_name,
                                                        english_name:item.english_name,
                                                    })
                                                    setEditing(true);
                                                    toggleModal()
                                                  
                                                  }}>
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
                                                      })
                                                    }}
                                                  >
                                                    <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-remove"></i>
                                                    </span>
                                                  </Button>
                                                </div>
                                      </Badge>
                                    )
                                    :
                                    <Alert className={`alert-default ${styles.default.alert}`}>
                                      <strong>Attention!</strong> There are no Tag to show, please Create new one from the button in the top right corner
                                    </Alert>
                                  }

                                </div>
                            </Card>
                    
                          </Col>
                          <Col lg="6">
                            <Card className={styles.default.cardContainer}>
                              <CardHeader className="border-0">
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Size table</h3>
                                  
                                  <Button onClick={()=>{
                                    toggleSizeModal();
                                    setEditing(false);
                                    setSizeObj(
                                      { _id:'',
                                      name:'',
                                  
                                    }
                                    )
                                  
                                  }} className="btn-icon btn-2" color="default" type="button">
                                      <span className="btn-inner--text">Create new Size</span>
                                      <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add"></i>
                                      </span>
                                      
                                  </Button>
                                </div>
                                
                              </CardHeader>

                                <div className={styles.default.cardsWrapper}>
                                  {
                                    sizes.length > 0?
                                    sizes.map(item =>
                                      
                                      <Badge className={`badge-lg ${styles.default.badge}`} color="primary" pill>
                                        <span className={styles.default.span}>{item.name}</span>
                                        <div  style={{display:'flex'}}>
                                              <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" onClick={()=>{
                                                    setSizeObj({
                                                        _id: item._id,
                                                        name:item.name,
                                                    })
                                                    setEditing(true);
                                                    toggleSizeModal()
                                                  
                                                  }}>
                                                    <span className="btn-inner--icon">
                                                      <i className="ni ni-ungroup" />
                                                    </span>
                                                  </Button>
                                                  <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button"
                                                    onClick={()=>{
                                                      toggleSizeNotificationModal()
                                                      setSizeObj({
                                                          _id: item._id,
                                                          name:item.name,
                                                      })
                                                    }}
                                                  >
                                                    <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-remove"></i>
                                                    </span>
                                                  </Button>
                                                </div>
                                      </Badge>
                                    )
                                    :
                                    <Alert className={`alert-default ${styles.default.alert}`}>
                                      <strong>Attention!</strong> There are no Size to show, please Create new one from the button in the top right corner
                                    </Alert>
                                  }

                                </div>
                            </Card>
                    
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <Card className={styles.default.cardContainer}>
                              <CardHeader className="border-0">
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Color table</h3>
                                  
                                  <Button onClick={()=>{
                                    toggleColorModal();
                                    setEditing(false);
                                    setColorObj(
                                      { _id:'',
                                      arabic_name:'',
                                      english_name:'',
                                      value:''
                                    }
                                    )
                                  
                                  }} className="btn-icon btn-2" color="default" type="button">
                                      <span className="btn-inner--text">Create new Color</span>
                                      <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add"></i>
                                      </span>
                                      
                                  </Button>
                                </div>
                                
                              </CardHeader>

                                <div className={styles.default.cardsWrapper}>
                                  {
                                    colors.length > 0?
                                    colors.map(item =>
                                      
                                      <Badge className={`badge-lg ${styles.default.badge}`} color="primary" pill>
                                        <span className={styles.default.span}>{item.english_name}- {item.arabic_name}</span>
                                        <div  style={{display:'flex'}}>
                                              <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" onClick={()=>{
                                                    setColorObj({
                                                        _id: item._id,
                                                        arabic_name:item.arabic_name,
                                                        english_name:item.english_name,
                                                        value:item.value
                                                    })
                                                    setEditing(true);
                                                    toggleColorModal()
                                                  
                                                  }}>
                                                    <span className="btn-inner--icon">
                                                      <i className="ni ni-ungroup" />
                                                    </span>
                                                  </Button>
                                                  <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button"
                                                    onClick={()=>{
                                                      toggleColorNotificationModal()
                                                      setColorObj({
                                                          _id: item._id,
                                                          arabic_name:item.arabic_name,
                                                          english_name:item.english_name,
                                                          value:item.value
                                                      })
                                                    }}
                                                  >
                                                    <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-remove"></i>
                                                    </span>
                                                  </Button>
                                                </div>
                                      </Badge>
                                    )
                                    :
                                    <Alert className={`alert-default ${styles.default.alert}`}>
                                      <strong>Attention!</strong> There are no Color to show, please Create new one from the button in the top right corner
                                    </Alert>
                                  }

                                </div>
                            </Card>
                    
                          </Col>
                          <Col lg="6">
                            <Card className={styles.default.cardContainer}>
                              <CardHeader className="border-0">
                                <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                                  <h3 className="mb-0">Badge table</h3>
                                  
                                  <Button onClick={()=>{
                                    toggleBadgeModal();
                                    setEditing(false);
                                    setBadgeObj(
                                      { _id:'',
                                      arabic_name:'',
                                      english_name:''
                                    }
                                    )
                                  
                                  }} className="btn-icon btn-2" color="default" type="button">
                                      <span className="btn-inner--text">Create new Badge</span>
                                      <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add"></i>
                                      </span>
                                      
                                  </Button>
                                </div>
                                
                              </CardHeader>

                                <div className={styles.default.cardsWrapper}>
                                  {
                                    badges.length > 0?
                                    colors.map(item =>
                                      
                                      <Badge className={`badge-lg ${styles.default.badge}`} color="primary" pill>
                                        <span className={styles.default.span}>{item.english_name}- {item.arabic_name}</span>
                                        <div  style={{display:'flex'}}>
                                              <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" onClick={()=>{
                                                    setColorObj({
                                                        _id: item._id,
                                                        arabic_name:item.arabic_name,
                                                        english_name:item.english_name,
                                                        value:item.english_name,
                                                    })
                                                    setEditing(true);
                                                    toggleColorModal()
                                                  
                                                  }}>
                                                    <span className="btn-inner--icon">
                                                      <i className="ni ni-ungroup" />
                                                    </span>
                                                  </Button>
                                                  <Button className={`btn-icon btn-2 ${styles.default.deleteBtn}`} color="danger" type="button"
                                                    onClick={()=>{
                                                      toggleColorNotificationModal()
                                                      setColorObj({
                                                          _id: item._id,
                                                          arabic_name:item.arabic_name,
                                                          english_name:item.english_name,
                                                          value:item.english_name,
                                                      })
                                                    }}
                                                  >
                                                    <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-remove"></i>
                                                    </span>
                                                  </Button>
                                                </div>
                                      </Badge>
                                    )
                                    :
                                    <Alert className={`alert-default ${styles.default.alert}`}>
                                      <strong>Attention!</strong> There are no Color to show, please Create new one from the button in the top right corner
                                    </Alert>
                                  }

                                </div>
                            </Card>
                    
                          </Col>
                    
                        </Row>
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

export default ItemInfo;
