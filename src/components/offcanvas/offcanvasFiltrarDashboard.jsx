
import React, { Component,useImperativeHandle,useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { useEffect } from "react";
const datatipo = [["0","Todos"],["1","Comensales"],["2","Recoger Aqui"],["3","Delivery"]]
const datavaluepage = [["15","15"],["30","30"],["50","50"],["100","100"],["TODOS","Todos"]]
const offcanvas = React.forwardRef(({ini,show,setShow,historial,numpag},ref) => {
  const [datafiltrar, setDatafiltrar] = useState(["0", "15","0", ""]);
  const onStatefiltrar = (value, pos) => {
    let newdata = [...datafiltrar];
    newdata[pos] = value;
    setDatafiltrar(newdata);
  };
  useImperativeHandle(ref, () => ({
    ini: () =>{
      

        ini(datafiltrar[0],datafiltrar[1],datafiltrar[2],datafiltrar[3])
      
    },
   
  }));
  useEffect(() => {
    if (numpag.length == 1) {
      onStatefiltrar("0", 0);
    }
  }, [numpag]);
  return (
    
    <>
  <Offcanvas placement="end" show={show} onHide={() => setShow(false)} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrando</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="d-block margin-1 marginb-2">
            <div className="w-100">
              <h6 className='mb-2 text-white'># Paginacion</h6>
              <div id='div_selectpage'>
              <Form.Select
                  onChange={(ev) => onStatefiltrar(ev.target.value,0)}
              className="mb-3 "
              id='select_page'
            >
              
            {
              typeof numpag !="undefined"&&
              numpag.map((item,index) => (
                (index == datafiltrar[0] && (
                  <option selected="selected" value={index}>{index+1}</option>
                )) ||   <option  value={index}>{index+1}</option>
              
                ))}
            </Form.Select>
              
              </div>
            </div>
           
          </div>
          
          <div className="d-block margin-1 marginb-2">
      
            <div className="w-100 ">
              <h6 className='mb-2 text-white'># Resultados</h6>
              <Form.Select
            onChange={(ev) => onStatefiltrar(ev.target.value,1)}
              className="mb-3 "
              id='cajalimittabdisp'
            >
              {
             
             datavaluepage.map((item,index) => (
               (item[0] == datafiltrar[1] && (
                 <option selected="selected" value={item[0]}>{item[1]}</option>
               )) ||   <option  value={item[0]}>{item[1]}</option>
             
               ))}
            </Form.Select>
              
            </div>
          </div>
         {
          historial&&
          <div className="d-block margin-1 marginb-2">
          <div className="w-100 ">
            <h6 className='mb-2 text-white'>Tipo</h6>

            <Form.Select
          onChange={(ev) => onStatefiltrar(ev.target.value,2)}
            className="mb-3 "
         
          >
           {
             
             datatipo.map((item) => (
               (item[0] == datafiltrar[2] && (
                 <option selected="selected" value={item[0]}>{item[1]}</option>
               )) ||   <option  value={item[0]}>{item[1]}</option>
             
               ))}
          </Form.Select>
            
            </div>
          </div>
         }
      
          
          <div className="d-block margin-1 marginb-2">
      
          <div>
          <div className='text-end'>
              <h6 className='text-orange'>Folio  | Total </h6>
            </div>
            <div className="input-group">
      
              <span className="input-group-text "><i className="fas fa-search"></i></span>
      
              <input autocapitalize className="form-control "  value={datafiltrar[3]} onChange={(ev) => {
      
      if(ev.target.value.trim().length==0){onStatefiltrar(ev.target.value.trim(),3)}
      else{

        onStatefiltrar(ev.target.value,3)}
    }
      
    } placeholder="Buscador" id="buscador"/>
            </div>
          </div>
      
          </div>
          <div className="d-block margin-1 ">
            <button className=" btn btn-primary  w-100" onClick={(e) => ini(datafiltrar[0],datafiltrar[1],datafiltrar[2],datafiltrar[3])} >Aceptar</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
})
export default offcanvas
