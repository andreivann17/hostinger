import React, { useEffect, useRef } from "react";
import "../../../assets/css/utils.css";
import { Row, Col, Form } from "react-bootstrap/";
import "../../../assets/css/Switch.css";
import { connect } from "react-redux";


function formMenu({
  data,
  setData,
  dataGenero,
  dataPuesto,
  dataDepartamento,
  dataTipoContrato,
  validated,
}) {
  console.log(data)
  const inputRefs = useRef([]); // Matriz de referencias
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRefs.current[index + 1].focus(); // Enfoca el siguiente input
    }
  };
  const onStateData = (value, key) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const setInputRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };
  
  return (
    <div style={{paddingLeft:"15px",paddingRight:"15px"}}>
    
      <Row>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Numero de Empleado</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.numEmpleado}
            onKeyDown={(event) => handleKeyDown(event, 0)}
            onChange={(ev) => onStateData(ev.target.value, "numEmpleado")}
            placeholder="Ingrese el numero del empleado"
            maxLength={30}
            ref={(ref) => setInputRef(ref, 0)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.numEmpleado }}
          >
            Ingrese correctamente el numero del empleado
          </h6>
        </Form.Group>
        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            onKeyDown={(event) => handleKeyDown(event, 1)}
            value={data.nombre}
            onChange={(ev) => onStateData(ev.target.value, "nombre")}
            placeholder="Ingrese el nombre del empleado"
            maxLength={50}
            ref={(ref) => setInputRef(ref, 1)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.nombre }}
          >
            Ingrese correctamente su nombre
          </h6>
        </Form.Group>
        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.apellido}
            onKeyDown={(event) => handleKeyDown(event, 2)}
            onChange={(ev) => onStateData(ev.target.value, "apellido")}
            placeholder="Ingrese el apellido del empleado"
            maxLength={50}
            ref={(ref) => setInputRef(ref, 2)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.apellido }}
          >
            Ingrese correctamente el apellido
          </h6>
        </Form.Group>

      </Row>
      <Row>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Salario diario</Form.Label>
          <Form.Control
            type="text"
            required
            value={data.salario}
            onKeyDown={(event) => handleKeyDown(event, 3)}
            onChange={(ev) => onStateData(ev.target.value, "salario")}
            placeholder="Ingrese el salario del empleado"
            maxLength={15}
            ref={(ref) => setInputRef(ref, 3)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.salario }}
          >
            Ingrese correctamente el salario
          </h6>
        </Form.Group>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>RFC</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.rfc}
            onKeyDown={(event) => handleKeyDown(event, 4)}
            onChange={(ev) => onStateData(ev.target.value, "rfc")}
            placeholder="Ingrese el rfc del empleado"
            maxLength={100}
            ref={(ref) => setInputRef(ref, 4)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.rfc }}
          >
            Ingrese correctamente el rfc del empleado
          </h6>
        </Form.Group>
        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>CURP</Form.Label>
          <Form.Control
            required
            type="text"
            value={data.curp}
            onKeyDown={(event) => handleKeyDown(event, 5)}
            onChange={(ev) => onStateData(ev.target.value, "curp")}
            placeholder="Ingrese la curp del empleado"
            maxLength={100}
            ref={(ref) => setInputRef(ref, 5)} 
          />
          <h6
            className="text-errorform text-danger"
            style={{ display: validated.curp }}
          >
            Ingrese correctamente la curp
          </h6>
        </Form.Group>
        

      </Row>
      <Row>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Genero</Form.Label>
          <Form.Select
   
            onChange={(ev) => onStateData(ev.target.value, "genero")}
          >
            {dataGenero != null &&
              dataGenero.map(
                (item) =>
                  (item[0] == data.genero && (
                    <option value={item[0]} selected>
                      {item[1]}
                    </option>
                  )) || <option value={item[0]}>{item[1]}</option>
              )}
          </Form.Select>
        </Form.Group>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Fecha de ingreso</Form.Label>
          <Form.Control
            type="date"
            required
            value={data.fechaIngreso}
            onChange={(ev) => onStateData(ev.target.value, "fechaIngreso")}
          />
         
        </Form.Group>
      <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            required
            
            type="date"
            value={data.fechaNacimiento}
            onChange={(ev) => onStateData(ev.target.value, "fechaNacimiento")}
          />
         
        </Form.Group>
    
        

      </Row>
      <Row>
        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Puesto</Form.Label>
          <Form.Select
            className="mb-3 "
            onChange={(ev) => onStateData(ev.target.value, "puesto")}
          >
            {dataPuesto != null &&
              dataPuesto.map(
                (item) =>
                  (item[0] == data.puesto && (
                    <option value={item[0]} selected>
                      {item[1]}
                    </option>
                  )) || <option value={item[0]}>{item[1]}</option>
              )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Departamento</Form.Label>
          <Form.Select
            onChange={(ev) => onStateData(ev.target.value, "Departamento")}
            className="mb-3 "
          >
            {dataDepartamento != null &&
              dataDepartamento.map(
                (item) =>
                  (item[0] == data.departamento && (
                    <option value={item[0]} selected>
                      {item[1]}
                    </option>
                  )) || <option value={item[0]}>{item[1]}</option>
              )}
          </Form.Select>
        </Form.Group>
        

        <Form.Group className="marginb-2" as={Col} md="4">
          <Form.Label>Tipo de Contrato</Form.Label>
          <Form.Select
            className="mb-3 "
            onChange={(ev) => onStateData(ev.target.value, "tipoContrato")}
          >
            {dataTipoContrato != null &&
              dataTipoContrato.map(
                (item) =>
                  (item == data.tipoContrato && (
                    <option value={item[0]} selected>
                      {item[1]}
                    </option>
                  )) || <option value={item[0]}>{item[1]}</option>
              )}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="marginb-2" as={Col} md="8">
  
        <Form.Label>Descripcion</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.descripcion}
          onChange={(ev) => onStateData(ev.target.value, "descripcion")}
          maxLength={100}
        />
      </Form.Group>
      <Form.Group className="marginb-2" as={Col} md="4">
  
  <Form.Label>Jefe de area</Form.Label>
  <small
                        style={{ fontSize: "16px",paddingBottom:"0px" }}
                        className="text-light d-block "
                      >
                        {
                        <label className="switchm ">
                        {(() => {
                          if (data.jefeArea == "1") {
                            return (
                              <input
                                checked
                                type="checkbox"
                                className="checkm switchdetallescajero"
                                onChange={(ev) => onStateData("0","jefeArea")}
                              />
                            );
                          } else {
                            return (
                              <input
                                type="checkbox"
                                className="checkm "
                                onChange={(ev) => onStateData("1","jefeArea")}
                              />
                            );
                          }
                        })()}
                        <span className="sliderm"></span>
                      </label>
                        }
                       
                      </small>
  </Form.Group>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataDepartamento: state.catalogos.details.departamentos,
  dataPuesto: state.catalogos.details.puestos,
  dataTipoContrato: state.catalogos.details.tipoContratos,
  dataGenero: state.catalogos.details.generos,
});

export default connect(mapStateToProps)(formMenu);
