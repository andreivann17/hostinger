import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {Modal,Button,Row,Form} from "react-bootstrap/";
import Modalmensaje from "./modalMensaje"
import Modalnewpass from "./modalNewPassword"
import {actionCodigo} from "../../redux/actions/login/login"
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo.jpg";
function modal({show,setShow,clave}) {
    const handleClose = () => setShow(false);
    const [code,setCode] = useState("")
    const [msg,setMsg] = useState("")
    const [showmsg,setShowmsg] = useState(false)
    const [showpass,setShowpass] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Evita el comportamiento predeterminado del "Enter" en el campo de entrada
          btn_aceptar(); // Llama al manejador del evento de clic en el botón
        }
    }
    const btn_aceptar = () =>{
        if(code.trim().length==0){
            setMsg("No puedes dejar campo vacio")
        setShowmsg(true)
        return
        }
      var parametros = {
        clave:clave,
        code:code,
      };
      dispatch(actionCodigo(parametros,callback,callbackError));
    
    }
    const callback = (value) =>{
      console.log(value)
      if(value.status){
        setShowpass(true)
        setShow(false)
        return 
      }
      setMsg("Clave invalida")
      setShowmsg(true)
    }
    const callbackError = (value) =>{
      setMsg(value)
      setShowmsg(true)
    }
    
  return (
    <>
    <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg}/>
    <Modalnewpass show={showpass} setShow={setShowpass} clave={clave}/>
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
          <div className="marginb-2">
          <h6>
            Ingrese la clave que se le envio a su correo.
          </h6>
          </div>
         <Form.Group >
          <Form.Label>Clave</Form.Label>
          <Form.Control
            required
            type="text"
            maxLength={10}
            placeholder="Ingrese la clave"
            value={code}
            ref={inputRef} 
            autoFocus 
            onKeyDown={handleKeyDown}
            onChange={(ev) => setCode(ev.target.value, 0)}
          />
          <Form.Control.Feedback type="invalid">
            Ingrese correctamente su clave
          </Form.Control.Feedback>
        </Form.Group>
      
        </Modal.Body>
        <Modal.Footer>
        <button className="btn-secondary-osmed" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-primary-osmed" onClick={() => btn_aceptar()}>
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default modal
