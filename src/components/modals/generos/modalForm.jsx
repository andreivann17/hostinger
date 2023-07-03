import { Modal,Form,Col,Row,Nav,Button,Tab } from "react-bootstrap/";
import { actionAgregar } from "../../../redux/actions/form/form";
import { useDispatch,connect } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import FormInfo from "../../forms/generos/formInfo"
import { useEffect } from "react";
import Toast from "../../toasts/toast"
function modal({ show, setShow,dataInfo,callback }) {
  const [dataForm, setDataForm] = useState(dataInfo);
  const [msg,setMsg] = useState("")
  const [showToast,setShowToast] = useState(false)
  const dispatch = useDispatch();
  let { id } = useParams();
  const [validated, setValidated] = useState({
    nombre:"none"
  });
  const callbackAgregando = (msg) => {
    callback()
    setShow(false);
    setMsg(msg);
    setShowToast(true);
  };
  const callbackAgregandoError = (msg) => {
    setMsg(msg);
    setShowToast(true);
  };
  const callbackEditando = () => {
    setMsg(res.data.msg);
    setShow(false);
    setShowToast(true);
  };
  const callbackEditandoError = () => {
    setMsg(res.data.msg);
    setShow(true);
  };
  function agregando() {
    var parametros = {
      data: dataForm,
      clave:"",
    };
    dispatch(
      actionAgregar(parametros, callbackAgregando, callbackAgregandoError)
    );
  }
  function editando() {
    var parametros = {
      data: dataForm,
    };
    dispatch(
      actionAgregar(parametros, callbackEditando, callbackEditandoError)
    );
  }
  const validacion = () => {
      let check = true;
      let newdata = { ...validated };
      for (const key in validated) {
        if ( dataForm[key].trim().length === 0) {
          newdata[key] = "block";
          check = false;
        }
      } 
      setValidated(newdata);
      return check;
  };
  
  const handleSubmit = (event) => {
    if (validacion()) {
      if (typeof id != "undefined") {
        editando();
      } else {
        agregando();
      }
    } else {
      setMsg("Ingrese correctamente los campos");
      setShowToast(true);
    }
  };

  function restablecer() {
    setDataForm(dataInfo);
  }
  
  useEffect(() => {
    if(typeof dataInfo !="undefined"){
      setDataForm(dataInfo);
    }
  }, [dataInfo]);
  
  return (
    <>
    <Toast msg={msg} setShow={setShowToast} show={showToast}/>

    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Modal.Header closeButton>
        <div className="d-flex mt-2 div_title">
          <i className="fas fa-info-circle  marginr-1"></i>
          <h5>Informacion</h5>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
         
          
          <div className="marginb-5">
            <div className="d-flex  justify-content-end">
              <div className="mb-3 d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={restablecer}
                  className="marginr-2 boton-icon"
                >
                  <i className="fas fa-undo"></i>
                  Restablecer
                </Button>
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
            </div>
            <FormInfo
                        validated={validated}
                        data={dataForm}
                        setData={setDataForm}
                      />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({ 
  dataInfo: state.catalogos.details.info,
});

export default connect(mapStateToProps)(modal);
