import React from "react";
import {Modal,Button} from "react-bootstrap/";

function modal({show,setShow,msg}) {
  return (
    <>
  <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Aviso</Modal.Header>
        <Modal.Body>
       {msg}
        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-secondary-osmed"onClick={() => setShow(false)}>
            Cancelar
          </button>
          <button className="btn btn-primary-osmed" onClick={() => setShow(false)}>
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default modal
