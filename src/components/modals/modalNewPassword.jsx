import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {Modal,Button,Row,Form} from "react-bootstrap/";
import Modalmensaje from "./modalMensaje"
import {actionNewPassword} from "../../redux/actions/login/login"
import Toast from "../toasts/toast"
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo.jpg";
function modal({show,setShow,clave}) {
    const handleClose = () => setShow(false);
    const [pass1,setPass1] = useState("")
    const [pass2,setPass2] = useState("")
    const [msg,setMsg] = useState("")
    const [showmsg,setShowmsg] = useState(false)
    const [showtoast, setShowToast] = useState(false);
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Evita el comportamiento predeterminado del "Enter" en el campo de entrada
          inputRef2.current.focus() // Llama al manejador del evento de clic en el botón
        }
    }
    const handleKeyDown2 = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado del "Enter" en el campo de entrada
        btn_aceptar(); // Llama al manejador del evento de clic en el botón
      }
  }
    const comprobar = () =>{
        if(pass1.trim().length==0 || pass2.trim().length==0){
            setMsg("No puedes dejar campos vacio")
            setShowmsg(true)
            return false
          }
          if(pass1.trim()!= pass2.trim()){
            setMsg("Contraseña invalida, tienen que coincidir")
            setShowmsg(true)
            return false
          }
        return true
    }
    const callback = () =>{
      setShow(false)
      setMsg("Se ha actualizado su contraseña!")
      setShowToast(true)
    }
   
    const btn_aceptar = () =>{
      if(comprobar() == false){
        return
      }
      var parametros = {
        clave:clave,
        pass:pass1
      };
      dispatch(actionNewPassword(parametros,callback,() => true))
    }
   
  return (
    <>
    
    <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg}/>
<Toast show={showtoast} msg={msg} setShow={setShowToast} />
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <img
              src={logo}
              className="rounded me-2"
              style={{width:"25px"}}
              alt=""
            />
          Recuperando Contraseña</Modal.Header>
        <Modal.Body>
            <div className="marginb-3">
                <h6>
                Ingrese su nuevo Contraseña
                </h6>
            </div>
            <div className="mt-3">
            <Row className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold">Nueva Contraseña</Form.Label>
              <Form.Control
                required
                type="text"
                value={pass1}
                onChange={(ev) => setPass1(ev.target.value)}
                placeholder="Ingrese el correo electronico"
                ref={inputRef} 
                autoFocus 
                onKeyDown={handleKeyDown}
                maxLength={15}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese correctamente la Contraseña
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold">Confimacion Contraseña</Form.Label>
              <Form.Control
                required
                type="text"
                value={pass2}
                onChange={(ev) => setPass2(ev.target.value)}
                ref={inputRef2}
                onKeyDown={handleKeyDown2}
                placeholder="Ingrese el correo electronico"
                maxLength={15}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese correctamente la Contraseña
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-secondary-osmed" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-primary-osmed" onClick={() => btn_aceptar()}>
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default modal
