
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
import { IAdminUser } from "../../../lib";
import { createAdmin, editAdmin, getAdmins, deleteAdmin } from "../../../React-Redux/Actions/admin-action";
import { selectRole, useSelect } from "../../../helper";
import Loader  from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import { select } from "redux-saga/effects";

const Admins: React.FC = () => {

  const [modal , setModel] = useState(false)
  const [notification_modal , setNotificationModel] = useState(false)
  const [is_editing , setEditing] = useState(false)
  const [obj , setObj] = useState<IAdminUser>({
    _id: '',
    email:'' ,
    name:'',
    password:'',
    phone:'',
    role:''
  })

  const {admins,is_loading} = useSelect(state=> state.adminsReducer)
  const {role} = useSelect(state=> state.authReducer)
  React.useEffect(() => {
    dispatch(getAdmins())
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
    
    const data = {
      email:e.target.email.value ,
      name:e.target.name.value,
      password:e.target.password.value,
      phone:e.target.phone.value,
      role:e.target.role.value
  }
    c

    if(is_editing){
      dispatch(editAdmin({data:{...data , _id:obj._id === undefined? '':obj._id} , id:obj._id === undefined? '':obj._id}));
      toggleModal();
    }else{
      dispatch(createAdmin(data));
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
                    Do you want to remove {obj.name} from admins ? to confirm please press delete otherwise close
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"  onClick={()=>{dispatch(deleteAdmin(obj._id !== undefined? obj._id: '')); toggleNotificationModal()}}>
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
              {obj.name === ''? 'Create Admin': 'Edit Admin'}
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
                placeholder="Name ..."
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
                Password
              </label>
              <Input
                id="password"
                name="password"
                
                defaultValue={obj.password}
                placeholder="Password ..."
                type="password"
              />
              <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Role</label>
                <Input id="role" type="select"  defaultValue={obj.role}>
                  <option value="">Select an admin</option>
                  <option value="admin">Admin</option>
                  <option value="supervisor">Supervisor</option>
                </Input>
              </FormGroup>
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
          is_loading && (role === 'admin')?
            <>
              <SimpleHeader name="Admins" parentName="Admin" />
              <Container className="mt--6" fluid>
              <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <div style={{display:'flex' , alignItems:'center', justifyContent:'space-between'}}>
                          <h3 className="mb-0">Admins table</h3>
                          
                          <Button onClick={()=>{
                            toggleModal();
                            setEditing(false);
                            setObj({
                              _id: '',
                              email:'' ,
                              name:'',
                              password:'',
                              phone:'',
                              role:''
                          })  
                          
                          }} className="btn-icon btn-2" color="default" type="button">
                              <span className="btn-inner--text">Create new admin</span>
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
                              Password
                            </th>

                            <th  scope="col">
                              Role
                            </th>

                            <th  scope="col">
                              Action
                            </th>
                            
                            <th scope="col" />
                          </tr>
                        </thead>
                        {
                          is_loading?
                          <tbody className="list">
                          {
                            admins.map(item=>
                              
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
                                  <span className="status">{item.password}</span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="completion mr-2">{item.role}</span>
                                  </div>
                                </td>
                                <td style={{width:'15%'}}>
                                  <div style={{display:'flex'}}>
                                    <Button className={`btn-icon btn-2 ${styles.default.editBtn}`} color="success" type="button" onClick={()=>{
                                      setObj({
                                        email:item.email,
                                        name:item.name,
                                        password:item.password,
                                        phone:item.phone,
                                        role:item.role,
                                        _id: item._id
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
                                          email:item.email,
                                          name:item.name,
                                          password:item.password,
                                          phone:item.phone,
                                          role:item.role,
                                          _id: item._id
                                        })
                                      }}
                                    >
                                      Delete
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

export default Admins;
