
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
  Input
} from "reactstrap";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { useDispatch } from "react-redux";
import { IContactMessage } from "../../../lib";
import { createContact, getContacts, deleteContact } from "../../../React-Redux/Actions/contact-action";
import { useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';

const Contacts: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [massage_modal , setMessageModel] = useState(false)

  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<IContactMessage>({
    _id: '',
    email:'',
    createdAt:'',
    name:'',
    message:'',
    phone:''
  })

  const {Contacts,contacts_is_loading} = useSelect(state=> state.contactsReducer)

  React.useEffect(() => {
    dispatch(getContacts())
  } , [])
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModel(pt => !pt);
  };

  const toggleNotificationModal = () => {
    setNotificationModel(pt => !pt);
  };

  const toggleMessageModal = () => {
    setMessageModel(pt => !pt);
  };
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    
    const data = {
      email:e.target.email.value ,
      name:e.target.name.value,
      message:e.target.message.value,
      phone:e.target.phone.value
  }
    
    dispatch(createContact(data));
    toggleModal();
    
  }
  
    return (
      <>
        <div>
            <ReactNotification className={styles.default.notification}  />
        </div>
        <Modal
              className="modal-dialog-centered"
              isOpen={massage_modal}
              toggle={toggleNotificationModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  {obj.name}'s Message
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() =>toggleMessageModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {obj.message}
                </p>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Save changes
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => toggleMessageModal()}
                >
                  Close
                </Button>
              </div>
            </Modal>
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
                    Do you want to remove {obj.name} from Contacts ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteContact(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj.name === ''? 'Create Contact': 'Edit Contact'}
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
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                
                defaultValue={obj.name}
                placeholder="Name is  ..."
                type="text"
              />
            </FormGroup>
            
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                defaultValue={obj.email}
                placeholder="Email ..."
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                
                defaultValue={obj.phone}
                placeholder="Phone ..."
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Message
              </label>
              <Input
                id="message"
                name="message"
                
                defaultValue={obj.message}
                placeholder="Password ..."
                type="textarea"
                rows="5"
              />
            
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
          contacts_is_loading?
            <>
              <SimpleHeader name="Contacts" parentName="Contact" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Contacts table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj({
                              _id: '',
                              email:'' ,
                              name:'',
                              message:'',
                              phone:'',
                          })  
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new Contact</span>
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add"></i>
                              </span>
                              
                          </Button>
                        </div>
                        
                      </CardHeader>

                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th className="sort" scope="col">
                              Name
                            </th>
                            <th className="sort" scope="col">
                              Email
                            </th>
                            <th  scope="col">
                              Phone
                            </th>
                            <th  scope="col">
                              Message
                            </th>

                            <th  scope="col">
                              Action
                            </th>
                            
                            <th scope="col" />
                          </tr>
                        </thead>
                        {
                          contacts_is_loading?
                          <tbody className="list">
                          {
                            Contacts.map(item=>
                              
                              <tr>
                                <th scope="row">
                                  <span className="name mb-0 text-sm">
                                        {item.name}
                                  </span>
                                </th>
                                <td className="budget">{item.email}</td>
                                <td>
                                  <span className="status">{item.phone}</span>
                                </td>
                                <td>
                                  <span className="status">{
                                  item.message.substr(1, 50)
                                  }...</span>
                                </td>
                                
                                <td style={{width:'15%'}}>
                                  <div style={{display:'flex'}}>
                                    <Button className="btn-icon btn-2" color="success" type="button" onClick={()=>{
                                      setObj({
                                          email:item.email,
                                          name:item.name,
                                          phone:item.phone,
                                          message: item.message,
                                          _id: item._id
                                      })  
                                      toggleMessageModal()
                                    
                                    }}>
                                      <span className="btn-inner--icon">
                                        <i className="ni ni-ungroup" />
                                      </span>
                                    </Button>
                                    <Button className="btn-icon btn-2" color="danger" type="button"
                                      onClick={()=>{
                                        toggleNotificationModal()
                                        setObj({
                                            email:item.email,
                                            name:item.name,
                                            phone:item.phone,
                                            message: item.message,
                                            _id: item._id
                                        })
                                      }}
                                    >
                                      <span className="btn-inner--icon">
                                      <i className="ni ni-fat-remove"></i>
                                      </span>
                                    </Button>
                                  </div>
                                </td>
                             
                              </tr>
          
                            )
                          }
                      
                        </tbody>
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

export default Contacts;
