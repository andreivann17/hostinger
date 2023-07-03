import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {Modal,Button,Row,Form} from "react-bootstrap/";
import Modalmensaje from "./modalMensaje"
import Modalenter from "./modalEnterCode"
import {actionCorreo} from "../../redux/actions/login/login"
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo.jpg";
function modal({show,setShow}) {
    const handleClose = () => setShow(false);
    const [correo,setCorreo] = useState("")
    const [msg,setMsg] = useState("")
    const [showmsg,setShowmsg] = useState(false)
    const [showenter,setShowenter] = useState(false)
    const [clave,setClave] = useState("")
    const dispatch = useDispatch()
    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Evita el comportamiento predeterminado del "Enter" en el campo de entrada
          btn_aceptar(); // Llama al manejador del evento de clic en el botón
        }
    }
    const btn_aceptar = () =>{
      if(correo.trim().length==0){
        setMsg("No puedes dejar campo vacio")
        setShowmsg(true)
        return
      }
      var parametros = {
        correo:correo
      };
      dispatch(actionCorreo(parametros,callback,callbackError));
    }
    const callback = (value) =>{
      console.log(value)
      if(value.status==false){
        callbackError()
        return
      }
      setShow(false)
      setShowenter(true)
      setClave(value.clave)
    }
    const callbackError = () =>{
      setMsg("Correo no existente")
      setShowmsg(true)
    }

  return (
    <>
    <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg}/>
    <Modalenter show={showenter} setShow={setShowenter} clave={clave}/>
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
                Escribe la dirección de correo electrónico
                asociado a tu cuenta.
                </h6>
            </div>
            <div className="mt-3">
            <Row className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold">Correo Electronico</Form.Label>
              <Form.Control
                required
                type="text"
                value={correo}
                onChange={(ev) => setCorreo(ev.target.value)}
                placeholder="Ingrese el correo electronico"
                maxLength={100}
                ref={inputRef} 
                autoFocus 
                onKeyDown={handleKeyDown}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese correctamente el correo electronico
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-primary-osmed" onClick={handleClose}>
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
