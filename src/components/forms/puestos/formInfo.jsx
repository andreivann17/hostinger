import React, { useEffect } from "react";
import "../../../assets/css/utils.css";
import { Row, Col, Form } from "react-bootstrap/";
import "../../../assets/css/Switch.css";
import { connect } from "react-redux";
function formMenu({
  data,
  setData,
  validated,
}) {
  const onStateData = (value, key) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <>
      <Row className="mb-3">
     
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.nombre}
            onChange={(ev) => onStateData(ev.target.value, "nombre")}
            placeholder="Ingrese el nombre del puesto"
            maxLength={50}
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.nombre }}
          >
            Ingrese correctamente su nombre
          </h6>
        </Form.Group>
     
      </Row>
 
    </>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps)(formMenu);
