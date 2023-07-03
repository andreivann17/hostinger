import React, {  useState } from "react";
import {Dropdown}  from "react-bootstrap"
import Toast from "../../toasts/toast"
import Modaldelete from "../../modals/modalEliminar";
import {actionEliminar} from "../../../redux/actions/dashboard/registros"
import {actionDashboardDetailsRegistros} from "../../../redux/actions/dashboard/dashboard"
import { useDispatch,connect } from "react-redux";
function table({data,dataHeader,dataType,altura}) {
  const [datadetalle,setDatadetalle] = useState([])
  const [show,setShow] = useState(false)
  const [tipo,setTipo]  = useState("1")
  const [showtoast,setShowToast] = useState(false)
  const [idMod, setIdMod] = useState("");
  const [showdelete, setShowdelete] = useState(false);
  const [showDeleteEntrada, setShowdeleteentrada] = useState(false);
  const [showDetalles,setShowDetalles] = useState(false)
  const [msg,setMsg] = useState("")
  const dispatch = useDispatch()

  const detallesVentas = (value) =>{
    
    var parametros = {
      token: "abc",
      opcion: "DETALLES",
      folio: value[0],
      tipo:tipo
   
    };
    setIdMod(value[0]);
    console.log(value)
    setTipo(value[2])
    dispatch(actionDashboardDetailsRegistros("ventas",parametros,() =>setShow(true),() => true))
   
  }
  const detallesEntradas = (value) =>{
    console.log(value)
    setDatadetalle(value)
    setShowDetalles(true)
  }
  const detallesMovimientos = (value) =>{
    console.log(value)
    setDatadetalle(value)
    setShowDetalles(true)
  }
  const detallesSalidas = (value) =>{
    setDatadetalle(value)
    setShowDetalles(true)
  }
  const detalles = (value) =>{
    if(window.location.pathname=="/ventas"){
      detallesVentas(value)
    }else if(window.location.pathname =="/entradas"){
      detallesEntradas(value)
    } else if(window.location.pathname =="/salidas"){
      
      detallesSalidas(value)
    } else if(window.location.pathname =="/movimientos"){
      
      detallesMovimientos(value)
    } 
  }
 
  const eliminarSalida = () =>{
    var parametros = {
      opcion : "ELIMINANDO",
      idMod: idMod,
    };
    dispatch(actionEliminar("salidas",parametros,callback,callbackError))
  }
  const callback = () =>{
    setMsg("Se ha eliminado correctamente!")
    setShowToast(true)
    
  }
  const callbackError = (msg) =>{
    setMsg(msg)
    setShowToast(true)
  }
  const eliminarEntrada = () =>{
    var parametros = {
      opcion : "ELIMINANDO",
      idMod: idMod,
    };
    dispatch(actionEliminar("entradas",parametros,callback,callbackError))
  }
  const editarSalidas = (value) =>{
    setDatadetalle([value[1],value[4],value[5],value[2],value[6],value[7],value[8]])
    setIdMod(value[0])
    setShowDetalles(true)
  }
  const editarEntradas = (value) =>{
    
    setDatadetalle([value[1],value[2],value[3]])
    
    setIdMod(value[0])
    setShowDetalles(true)
  }
  const eliminarSent = (value) =>{
    setIdMod(value[0])
    if ("/entradas" == window.location.pathname){
      setShowdeleteentrada(true)
    }else if("/salidas" == window.location.pathname){
      setShowdelete(true)
    }
  }
  return (
    <>
       
    <Modaldelete  idmodpost={idMod} eliminando={eliminarSalida}  show={showdelete} setShow={setShowdelete}/>
    <Modaldelete  idmodpost={idMod} eliminando={eliminarEntrada}  show={showDeleteEntrada} setShow={setShowdeleteentrada}/>
   <Toast msg={msg} setShow={setShowToast} show={showtoast}/>
    

      <div style={{height:altura,overflowY:"auto"}} >
        
      <table  className="table">

          {
          
          (data.length>0 ) && (
            
             
              <tbody>
              {data.map((item,index) => (
                <tr>
                {item.map((item2,index2) => (
              <td>
                 
                 <div>
                 <small
                   style={{ fontSize: "16px" }}
                   className="text-white d-block mb-1"
                 >
                  {
                    dataType[0][index2] == "STR"&&
                    item2
                  }
                  {
                    dataType[0][index2] == "INT"&&
                    parseInt(item2)
                  }
                  {
                    dataType[0][index2] == "FLOAT"&&
                    parseFloat(item2)
                  }
                  {
                    dataType[0][index2] == "CURRENCY"&&
                    "$"+ parseFloat(item2).toFixed(2)
                    
                  }
                    {
                   ( dataType[0][index2] == "BUTTON")&&
                 
                   <Dropdown>
                   <Dropdown.Toggle variant=""  className="btn-outline-secondary text-white border-0 rounded-circle custom-toggle"><i  style={{fontSize:"18px"}} className=" fas fa-ellipsis"></i></Dropdown.Toggle>
         
                     <Dropdown.Menu>
                  
                       <Dropdown.Item onClick={() => detalles(item2)}>Ver Detalles</Dropdown.Item>
                      
                         {
                   ( window.location.pathname=="/salidas")&&
                   <>
                      <Dropdown.Item onClick={() => editarSalidas(item2)}>Editar</Dropdown.Item>
                      <Dropdown.Item onClick={() => eliminarSent(item2)}>Eliminar</Dropdown.Item> 
                   </>
                
                       }
                       {
                   ( window.location.pathname=="/entradas")&&
                   <>
                                <Dropdown.Item onClick={() => editarEntradas(item2)}>Editar</Dropdown.Item>
                                <Dropdown.Item onClick={() => eliminarSent(item2)}>Eliminar</Dropdown.Item> 
                   </>
     
                       }
               
                  
            
                     </Dropdown.Menu>
                   </Dropdown>
               
               

                   
                  }
        
          
                 </small>
                 <small
                   style={{ fontSize: "12px" }}
                   className="text-muted d-block"
                 >
                   {dataHeader[index2]}
                 </small>
               </div>
       
             </td>
               ))}
                </tr>
              ))}
            </tbody>
                
              
            
          )}
           
        {
           (typeof data != "undefined" &&  data.length==0)&&
            <div className="text-center">
              <h6>Vacio</h6>
            </div>
          }
        </table>
        </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  data: state.dashboard.registros.content ?? [],
  dataHeader:state.dashboard.registros.dataHeader?? [],
  dataType:state.dashboard.registros.dataType?? [],
});

export default connect(mapStateToProps)(table);
 