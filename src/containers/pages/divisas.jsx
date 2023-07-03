import React, {  useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/contenido.jsx";
import {Button,Modal,Form,Row,Col} from "react-bootstrap/";
import Toast from "../../components/toasts/toast.jsx";
import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch,connect} from "react-redux";
const token = localStorage.getItem("tokends");
function Home({data}) {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [dolar, setDolar] = useState(data[0]);
  const [validated, setValidated] = useState("none");
  const [showtoast, setShowToast] = useState(false);
  const dispatch = useDispatch()
  const callback = (msg) =>{
    setShow(false)
    setMsg(msg)
    setShowToast(true)
  }
  const handleSubmit = (event) => {
      if (isNaN(dolar) || dolar.trim().length==0 ) {
        setValidated("block")
        var parametros = {
            dolar: dolar,
          };
          dispatch(actionEditar(parametros,callback))
          return
      }
      setValidated("none")
  };
  useEffect(() => {
    dispatch(actionDivisas())
  }, []);
  return (
    <>
    {token != null && (
    <>
     <Toast msg={msg} setShow={setShowToast} show={showtoast}/>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><i className="fas fa-pencil marginr-1"></i>Editando</Modal.Header>
        <Modal.Body>
          <Form className="mt-3">
            <div className="marginb-10 mt-3">
              <div className="mb-3 d-flex justify-content-end">
              
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleSubmit}
                  className="boton-icon"
                >
                  <i className="fas fa-plus"></i>
                  Guardar
                </Button>
              </div>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label>Dolar</Form.Label>
                  <Form.Control
                    
                    type="text"
                    value={dolar}
                    onChange={(ev) => {
                      if (ev.target.value.trim().length == 0) {
                        setDolar(ev.target.value.trim());
                      } else {
                        setDolar(ev.target.value);
                      }
                    }}
                    placeholder="Ingrese correctamente el digito"
                    maxLength={100}
                  />
               <h6 className="text-errorform text-danger" style={{"display":validated}}>
                    Ingrese correctamente el digito
                  </h6>
                </Form.Group>
              </Row>
            
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Header
            title={"Divisas"}
            titlebutton={"Editar divisa"}
            setShowadd={null}
            iconbutton={"pencil"}
            value={"BUTTON"}
            icon={"fas fa-utensils marginr-1 "}
          />

       

          <div className="Panel_Contenido  marginb-5">
          <Contenido
            title={"Divisas"}
            titlebutton={"Editar divisa"}
            value={"-"}
            setShowadd={false}
            iconbutton={"pencil"}
            icon={"fas fa-utensils marginr-1 "}
            setShow={null}
          />
      <div className="mt-3">

        <div className="card bg-dark shadow-lg" style={{height:"200px","padding":"0px",width:"300px"}}>
          <div className="card-header">
           <div className="d-flex justify-content-between">
           <h5 className="p-2">Dolar</h5>
           <div>
            <button onClick={() => setShow(true)} className="btn btn-outline-primary rounded-circle border-0 text-white btn-lg "><i style={{fontSize:"20px"}} className="fas fa-pencil"></i></button>
           </div>
           </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-center align-items-center h-100 marginb-2">
              <h2>${parseFloat(data[0]).toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
    )}
    
    </>
  );
  
}

const mapStateToProps = (state) => ({
  data: state.divisas.divisas,
});

export default connect(mapStateToProps)(Home);