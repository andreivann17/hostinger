import {Form,Offcanvas} from 'react-bootstrap';
import { actionCatalogos } from "../../redux/actions/catalogos/catalogos";
import { useDispatch,connect } from "react-redux";
import { useState,useEffect } from "react";
const DataPage = [["15","15"],["30","30"],["50","50"],["100","100"],["0","Todos"]]
function OffCanvas({numPag,setShow,show}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    limit: "0",
    buscador: "",
    value: "15",
  });
  const onState = (value, key) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (typeof numPag != "undefined" && numPag.length == 1) {
      onState("0", 0);
    }
  }, [numPag]);
  useEffect(() => {
    dispatch(actionCatalogos(data));
  }, []);
  return (
    
    <>

  <Offcanvas show={show} onHide={()=>setShow(false)} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrando</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="d-flex margin-1 marginb-4 margint-3">
            <div className="w-100 marginr-1">
              <h6 className='mb-2 text-white'># Paginacion</h6>
              <div>
              <Form.Select
              onChange={(ev) => onState(ev.target.value,"limit")}
              className="mb-3 "
          
            >{
              typeof numPag !="undefined"&&
              numPag.map((item,index) => (
                (index == data.limit && (
                  <option selected="selected" value={index}>{index+1}</option>
                )) ||   <option  value={index}>{index+1}</option>
              
                ))}
              
            </Form.Select>
              
              </div>
            </div>
            <div className="w-100 marginl-1">
              <h6 className='mb-2 text-white'># Resultados</h6>
              <Form.Select
              onChange={(ev) => onState(ev.target.value,"value")}
              className="mb-3 "
          
            >
       {
             
             DataPage.map((item) => (
               (item[0] == data.value && (
                 <option selected="selected" value={item[0]}>{item[1]}</option>
               )) ||   <option  value={item[0]}>{item[1]}</option>
             
               ))}
            </Form.Select>
              
            </div>
          </div>
          <div className="d-grid gap-2 margin-1 marginb-2">
      
            <div className='text-end'>
              <h6 className='text-orange'>ID  | Nombre</h6>
            </div>
            <div className="input-group">
      
              <span className="input-group-text "><i className="fas fa-search"></i></span>
      
              <input autocapitalize className="form-control "  value={data.buscador} onChange={(ev) => {
      
                        if(ev.target.value.trim().length==0){onState(ev.target.value.trim(),'buscador')}
                        else{
        
                          onState(ev.target.value,"buscador")}
                      }
                        
                      } placeholder="Buscador"/>
            </div>
      
          </div>
          <div className="d-grid gap-2 margin-1 ">
            <button className=" btn btn-primary-osmed  " onClick={(e) => dispatch(actionCatalogos(data))} >Aceptar</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}

const mapStateToProps = (state) => ({
  numPag: state.catalogos.catalogos.count,
});

export default connect(mapStateToProps)(OffCanvas);