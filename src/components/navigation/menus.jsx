import React, { useState, useEffect,useRef} from "react";
import "./../../assets/css/menu.css";
import "./../../assets/css/utils.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.min.css";
import { useNavigate } from "react-router-dom";
import img from "./../../assets/img/logo.png";
import prueba from "./../../assets/img/andre.jpg";
import { Button,Popover,Collapse,OverlayTrigger } from "react-bootstrap/";
import { useDispatch,connect } from "react-redux";
import {actionPrivilegios,actionBotones} from "../../redux/actions/menus/menus"
const token = localStorage.getItem("tokends");
const icons = ["fas fa-user-tie",'fas fa-chart-line','fas fa-user','fas fa-cogs']
const botones = [
[["Empleados","-"],[["Empleados","/empleados"],["Departamentos","/departamentos"],["Puestos","/puestos"],["Tipo de Contrato","/contrato"],["Generos","/generos"]]],
[["Estadisticas",'/estadisticas'],[]],
[["Usuarios",'/usuarios'],[]],
[["Ajustes","-"],[["Memoria de uso","/memoria"],["Restablecimiento","/restablecimiento"]]],
]

function Nabvar({  valuenav,privilegios,infoUser }) {

  const navegate = useNavigate();
  const dispatch = useDispatch()
  const [activeButton, setActiveButton] = useState(0);
  const [activeButton2, setActiveButton2] = useState(0);
  const [open, setOpen] = useState(Array(botones.length).fill(false));
   const [showPopover, setShowPopover] = useState(false);
   const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    // Agregar controlador de eventos al documento para detectar clics fuera del popover y del botón
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remover el controlador de eventos al desmontar el componente
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleButtonClick = () => {
    setShowPopover(!showPopover);
  };
  const popover = (
    <Popover id="popover-basic" ref={popoverRef} style={{minWidth:"350px"}}>
      <Popover.Header as="h3" className=" bg-ligth">
        <div className='w-100 d-flex justify-content-center '>
          <div className="border-0 rounded-circle div_Popover"  style={{ backgroundImage: `url(${infoUser.img})` }} >
            
          </div>
          
        </div>
        <div className='w-100 d-flex justify-content-center margint-2 '>
          <h5 className="text-primary-osmed">{infoUser.nombre}</h5>
        </div>
        </Popover.Header>
      <Popover.Body>
    
  
        <div className="d-block  " >


        
     
          <div className="margint-2 mb-1 accesouser3-1" id="div_historialbtnadmin" >
            <button onClick={() => onState(-1,"-1","/movimientos")} className='btn btn-primary-osmed   text-white form-control '>
              Registro de movimientos
  
            </button>
        
        </div>  
                
             
       
  
          <div className=" d-flex align-items-end" style={{height: "50px"}}>
  
            <button onClick={() => onState(-1,"-1","/login")} className='btn btn-danger  text-white  form-control btn_salirsesion' >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  const onState = (pos, subpos, url) => {

    if (url === "-") {
      let newdata = [...open];
      newdata[pos] = !newdata[pos];
      setOpen(newdata);
      setActiveButton2(-1);
      
    } else {
     // Reinicia el botón activo principal cuando no hay subelementos
   
      navegate(url);
      
      setActiveButton(pos);
      setActiveButton2(subpos);
      
     
    }
    
  };
  useEffect(() => {    
    setActiveButton(parseInt(valuenav));
  }, [valuenav]);
  useEffect(() => {
  //  dispatch(actionPrivilegios()) 
  
  }, []);
  useEffect(() => {
    if (token == null) {
      navegate("/login");
    }
  }, [token]);

  return (
    <>
          <div className=" div_izqarriba">
 <OverlayTrigger trigger="click" placement="left" overlay={popover}>
<button ref={buttonRef} onClick={handleButtonClick} type="button" className="btn btn-secondary-osmed  rounded-pill text-white btn_imgcuenta ">
  <img className='imgcuenta rounded-circle' alt='' width='35' height='35' src={infoUser.img}/>

  <h6 className='col-8 text-truncate ' >{infoUser.nombre} </h6>



</button>
 </OverlayTrigger>

</div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,0"
      />

      {token != null && (
       <div className="" id="div_administradormaster">
          <div className="main_1 bg-primary-osmed" >
            <div className="justify-content-center d-flex marginb-2">
              <div className="p-2 margint-2 div_imgnav">
                <img className="img-fluid inlineblock" alt="" src={img} />
              </div>
            </div>
            <div className="w-100">
              <div  className="w-100">
              {botones.map((value, index) => {

        if (parseInt(privilegios[index]) > 0) {
          return (
            <>
            <button
             
              className={`w-100 d-block btn btn-primary-osmed text-white border-0 ${activeButton === index ? "active" : ""}`}
              style={{
                height: "50px",
                borderRadius: "0px",
                textAlign: "start",
              }}
              aria-controls="example-collapse-text"
              aria-expanded={open[index]}
              onClick={() => onState(index,"-1",value[0][1])}
            >
                 <div className="d-flex justify-content-between align-items-center">
                  <div>

                  
            <div className="d-flex div_buttonsmain" >
            <i style={{fontSize:"20px"}}  className={icons[index] + " marginr-1"}></i>
              <h6>{value[0][0]}</h6>
            </div>
              </div>
              {
                value[1].length > 0 &&
                <div className="icon-collapse"> 
             {
            open[index] ? <span class="material-symbols-outlined">
            expand_more
            </span> : <span class="material-symbols-outlined">
            chevron_right
            </span>
             }
             </div>
              }
              </div>
            </button>
          
            {value[1].length > 0 && (
              <Collapse in={open[index]}>
                <div>
                  {value[1].map((value2, index2) => (
                    
                    <button
                    
                 
                      
                      className={`w-100 btn-primary-osmed btn d-block text-white border-0 ${(activeButton2 === index2 && activeButton === index) ? "active" : ""}`}

                      
                     
                      onClick={() => onState(index,index2,value2[1])}
                      style={{
                        height: "40px",
                        borderRadius: "0px",
                        textAlign: "start",
                      }}
                    >
                     
                      <div className="marginl-3 div_buttonsmain">
                      <h6>    {value2[0]}</h6>
                      </div>
                    </button>
                  ))}
                </div>
              </Collapse>
            )}
          </>
            
          );
        } else {
          return null;
        }
      })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  botones: state.menus.botones ?? [],
  privilegios: state.menus.privilegios ?? [2,2],
  infoUser:state.menus.infoUser ?? {id:"0",nombre:"Andre Herrera",img:prueba}
});

export default connect(mapStateToProps)(Nabvar);