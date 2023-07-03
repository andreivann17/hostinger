import { Modal,Form,Col,Row,Nav,Button,Tab } from "react-bootstrap/";
import { actionAgregar } from "../../../redux/actions/form/form";
import { useDispatch,connect } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import FormInfo from "../../forms/empleados/formInfo"
import { useEffect } from "react";
import Toast from "../../toasts/toast"
import logo from "../../../assets/img/logo.png"
function modal({ show, setShow,dataInfo,callback,title }) {
  console.log(dataInfo)
  const [dataForm, setDataForm] = useState(dataInfo);
  const [msg,setMsg] = useState("")
  const [showToast,setShowToast] = useState(false)
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgForm,setImgForm] = useState(null)
  let { id } = useParams();
  const [validated, setValidated] = useState({
    numEmpleado:"none",
    nombre:"none",
    apellido:"none",
    rfc:"none",
    curp:"none",
    salario:"none",
    fechaIngreso:"none",
    fechaNacimiento:"none"
    
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
    const formData = new FormData();
    formData.append('img', imgForm);
    formData.append('data', JSON.stringify(dataForm));
    formData.append('clave', "");
    
    dispatch(
      actionAgregar(formData, callbackAgregando, callbackAgregandoError)
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
        if ((isNaN(dataForm[key]) && key === "salario") || dataForm[key].toString().trim().length === 0) {
          newdata[key] = "block";
          check = false;
        }else{
          newdata[key]  = "none"
        }
      }
      setValidated(newdata);
      return true;
   
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgForm(file)
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
 
  useEffect(() => {
    if(typeof dataInfo !="undefined"){
      setDataForm(dataInfo);

    }


  }, [dataInfo]);
 
  return (
    <>
    <Toast msg={msg} setShow={setShowToast} show={showToast}/>

    <Modal show={show} onHide={() => setShow(false)} size="xl"  >
      <Modal.Header closeButton>
        <div className="d-flex text-primary align-items-center div_title">
          <img className=" marginr-1" src={logo} style={{width:"30px"}}/>
          <h5>Agregando {title}</h5>
        </div>
      </Modal.Header>
      <Modal.Body  >
        <div>
         
      
            
            <Tab.Container id="left-tabs-example"  defaultActiveKey="info" >
              <Row className="h-100" >
                <Col sm={3} className="bg-light ">
                  <Nav variant="pills" className="flex-column margint-2">
                    <Nav.Item>
                      <Nav.Link eventKey={"info"}>
                        <i className={"fas fa-info-circle marginr-icon"}></i>
                        Informacion
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey={"ilustracion"}>
                        <i className={"fas fa-image marginr-icon"}></i>
                        Ilustracion
                      </Nav.Link>
                    </Nav.Item>
                  
               
                  </Nav>
                </Col>
                <Col sm={9}>
  <div  style={{ overflowX: "auto", width: "calc(100%)" }}>
    <Tab.Content>
      <Tab.Pane eventKey="info">
        <div style={{ height: "400px", overflowY: "auto" }}>
          <div className="w-100" style={{ paddingTop: "20px" }}>
            <FormInfo
              validated={validated}
              data={dataForm}
              setData={setDataForm}
            />
          </div>
        </div>
      </Tab.Pane>
      <Tab.Pane eventKey="ilustracion">
        <div style={{ height: "400px", overflowY: "auto", paddingTop: "20px" }}>
          <div className="d-flex marginb-4">
            <i
              style={{ fontSize: "32px" }}
              className={"fas fa-image text-primary marginr-2"}
            ></i>
            <h3 className="text-primary">Ilustracion</h3>
          </div>
          <div className="d-block ">
            <div className="col-md-4 btn-tableinput ">
              <input
                type="file"
                name="img"
                className="file cajafiles"
                accept=".gif,.jfif,.jpeg,.jpg,.png"
                onChange={handleImageChange}
              />
            </div>
            {selectedImage && (
  <img
    className="p-3"
    style={{ height: "280px" }}
    src={selectedImage}
    alt="selected"
  />
)}
          </div>
        </div>
      </Tab.Pane>
    </Tab.Content>
  </div>
</Col>

              </Row>
            </Tab.Container>
           
        
        </div>
      </Modal.Body>
      <Modal.Footer>
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
                  <i className="fas fa-save"></i>
                  Guardar
                </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  img: state.catalogos.details.img,
  dataInfo: state.catalogos.details.info??{},
});

export default connect(mapStateToProps)(modal);
