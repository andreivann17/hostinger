import { Dropdown, Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import Pdf from "../../utils/pdf"
import ModalPriv from "../../modals/modalPrivilegios";
import { useRef } from "react";
function card({ data, onStatedata, switches,dataexpo }) {
  const [show, setShow] = useState(false);
  const ref = useRef()
  function editar() {
    setShow(true);
  }
  const exportar = () =>{
    let newdata1 = []
     data[1].map(function(elemento) {
      newdata1.push(data[2][elemento])
    });
    console.log(newdata1)
    const datacontent = [data[0],newdata1]
    datacontent.push(dataexpo)
    console.log(datacontent)
    ref.current.exportar("Privilegios de usuarios","TABLE_VERTICALx2",datacontent)
   }

  return (
    <div className="p-3">
        <Pdf ref={ref}/>
      <ModalPriv show={show} setShow={setShow} ini={ini} data={data} />
      <div className="d-flex justify-content-between mb-3">
        <h5>Privilegios</h5>
        <div>
          <Dropdown>
          <Dropdown.Toggle variant=""  className="btn-outline-secondary text-white border-0 rounded-circle custom-toggle"><i  style={{fontSize:"18px"}} className=" fas fa-ellipsis"></i></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => editar()}>Editar</Dropdown.Item>
              <Dropdown.Item onClick={() => exportar()}>Exportar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="  " style={{ borderRadius: "6px" }}>
        <table className="table">
          {typeof data != "undefined" && (
            <tbody>
              {typeof data != "undefined" &&
                data[0].map((item, index) => (
                  <div className="inlineblock p-2">
                    {
                    switches &&
                     
                        <div className="inlineblock m-2  p-2">
                         
                            <Form.Group as={Col}>
                              <Form.Label>{data[0][index]}</Form.Label>
                              <Form.Select
                                className=" "
                                onChange={(ev) =>
                                  onStatedata(ev.target.value, index)
                                }
                              >
                                {data[2].map(
                                  (item2, index2) =>
                                    (item2 ==
                                      data[2][parseInt(data[1][index])] && (
                                      <option value={index2} selected>
                                        {item2}
                                      </option>
                                    )) || (
                                      <option value={index2}>{item2}</option>
                                    )
                                )}
                              </Form.Select>
                            </Form.Group>
                         
                        </div>
                        }

                    {switches == false && (
                      <div className="inlineblock m-2  p-2">
                        <small
                          style={{ fontSize: "16px", paddingBottom: "0px" }}
                          className="text-white d-block "
                        >
                          <h6 className="text-white">
                            {data[2][parseInt(data[1][index])]}
                          </h6>
                        </small>
                        <small
                          style={{ fontSize: "12px" }}
                          className="text-muted d-block"
                        >
                          {data[0][index]}
                        </small>
                      </div>
                    )}
                  </div>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default card;
