import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Dashboardcard from "./dashboardCard";
import DashboardMap from "../../Map/dashboard"
import Barra from "./Barra";
import {actionDashboard,actionDashboardGeneral,actionDashboardRegistros} from "../../redux/actions/dashboard/dashboard"
import { useDispatch,connect } from "react-redux";
const fecha = new Date();
const ano = fecha.getFullYear();

const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
const componentsByURL = {...DashboardMap}
function card({ contabilidad,meses,countCard,fechas,barra }) {
  const SelectedComponent = componentsByURL[window.location.pathname];
  const [inputfecha, setInputFecha] = useState(`${ano}-${mes}`);
  let { id } = useParams();
  const dispatch = useDispatch()
  
  const ini = () => {
    
      var parametros = {
        clave: id,
        fecha: inputfecha,
      };
      dispatch(
      actionDashboard(parametros)
      )
     
  };
  const iniinfo = (cantidad,paginacion, tipo, buscador) => {
    
      var parametros = {
     
        clave: id,
        value: paginacion,
        limit: cantidad,
        tipo: tipo,
        buscador: buscador,
        fecha: inputfecha,
      };
      dispatch(actionDashboardRegistros(parametros))
  };
  const iniextra = () => {
    const parametros = {
      clave: id,
      fecha: inputfecha,
    };
   dispatch(actionDashboardGeneral(parametros))
  };
  const inimaster =()=>{
    ini();
    iniinfo("0", "15", "TODOS", "");
    if((contabilidad == false || window.location.pathname=="/ventas")){
      iniextra();
    }
  }

  useEffect(() => {
    inimaster()
    
  }, [inputfecha]);
 
  return (
    <>
       
          <div className="marginb-1  d-flex justify-content-end text-end">
            <div className=" col-3">
              <Form.Select
                onChange={(ev) => setInputFecha(ev.target.value)}
                className="mb-3 "
              >   
                {meses.map(
                    (item, index) =>
                    <option value={fechas[index]}   selected={fechas[index] == inputfecha}>
                    {item}
                  </option>
                  )}
              </Form.Select>
            </div>
          </div>
          {typeof barra != "undefined" && <Barra />}
          {
            countCard.map((item, index) => (
              <Dashboardcard
                typeDash={item}
              />
            ))}
      
  
      {(contabilidad == false || window.location.pathname=="/ventas") && (
        <SelectedComponent
          fecha={fecha}
        />
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  meses: state.dashboard.dashboard.meses?.meses ?? [],
  fechas:state.dashboard.dashboard.meses?.fechas,
  countCard:state.dashboard.dashboard.countCard?? [],
  barra:state.dashboard.dashboard.barra ??[],
  contabilidad:state.dashboard.dashboard.contabilidad ?? false,
});

export default connect(mapStateToProps)(card);
 