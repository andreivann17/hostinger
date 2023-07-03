import { Dropdown } from "react-bootstrap";
import Tabledashinfo from "../tables/dashboard/tableRegistros";
import Offcanvasventas from "../offcanvas/offcanvasFiltrarDashboard";
import ModalNomina from "../modals/utils/modalNomina"
import { useRef, useState } from "react";
import Pdf from "../utils/pdf"
import { useEffect } from "react";
import { connect } from "react-redux";
function card({title,dataTable,dataExpo,altura,numPag}) {
  const [show,setShow] = useState(false)
  const [dataContExpo,setDataContExpo] = useState([])
  const refPdf = useRef()
  const refVentas = useRef()
  const exportar = () =>{
    const rowHead = [dataTable[0],dataTable[1],dataTable[2],dataTable[3],dataTable[4]]
    refPdf.current.exportar(title,"TABLE_HORIZONTAL",[rowHead,dataContExpo,dataExpo])
  }

  useEffect(() => {
    let newData = []
   if(typeof data != "undefined" && data.length>0){
    data.map((item) => (
      
      newData.push(item)     
   ))
   }
    setDataContExpo(newData)
  }, [dataExpo]);

  return (
    <div className="p-3 shadow-lg bg-light h-100 " style={{borderRadius:"6px"}}> 
   {
    typeof ini !="undefined" &&
       <Offcanvasventas
        ref={refVentas}
        show={show}
        setShow={setShow}
        numPag={numPag}   
        />
   }
   <ModalNomina />
    <Pdf ref={refPdf}/>
      <div className="d-flex justify-content-between mb-3 p-2">
        <h5>{title}</h5>
        
        <div>
          <Dropdown>
          <Dropdown.Toggle variant=""  className="btn-outline-primary border-0 rounded-circle custom-toggle"><i  style={{fontSize:"18px"}} className=" fas fa-ellipsis"></i></Dropdown.Toggle>

            <Dropdown.Menu>
            {
   (  title =="Empleados")&&
              <Dropdown.Item onClick={() => setShowAddNomina(true)}>Nomina Empleado</Dropdown.Item>
            }
              
               {
   ( typeof dataExpo !="undefined")&&
   <Dropdown.Item onClick={() => exportar()}>Exportar</Dropdown.Item>
            }
   
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {
          typeof refVentas.current !="undefined" &&
          <Tabledashinfo  altura={altura}/>
      }
   
    </div>
  );
}

const mapStateToProps = (state) => ({
  title: state.dashboard.registros.title ?? "",
  numPag:state.daashboard?.registros?.numPag  ?? 1,
  dataExpo:state.dashboard.registros.dataExpo?? [],
  dataTable:state.dashboard.registros.dataTable ?? [],
});

export default connect(mapStateToProps)(card);
 