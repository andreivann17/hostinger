import {useState} from 'react'
import Modalfecha from "../modals/modalAuth"
import Grafica from "../grafica/grafica.jsx"     
import {Form,Dropdown} from "react-bootstrap"
import { connect } from 'react-redux'
const dataLabels = ["Mes Pasado", "Este Mes"]
const dataSelectLabels = ["Ausentismo","Incapacidades","Horas Extras","Retardos","Permisos c/goce"]
function card({data,title,typeDash}) {
  const [show,setShow] = useState(false)
  const [dataDetalles,setDataDetalles] = useState([])
  const [grafica,setGrafica] = useState(false)
  const [valueInput,setValueInput] = useState()
  const btn_expand = () =>{
    setDataDetalles([data[typeDash],title[typeDash],dataLabels,"BAR"])
    setGrafica(true)
    setShow(true)
  }

  return (
    <div className="p-4 " >
      <div className="d-flex justify-content-between mb-3 ">
        <h5 > <Form.Select
            onChange={(ev) => onStateChange(ev.target.value)}
            className="mb-3 "
          >
                  {dataSelectLabels != null &&
              dataSelectLabels.map(
                (item,index) =>
                <option value={index} selected={item == valueInput}>
                {item}
              </option>
              )}
       
          </Form.Select></h5>
        <div>
        <Dropdown>
  <Dropdown.Toggle variant=""  className="btn-outline-primary  border-0 rounded-circle custom-toggle" >

<i class="fa-solid fa-ellipsis"></i>

  </Dropdown.Toggle>

    <Dropdown.Menu>
      
    <Dropdown.Item onClick={()=>setShow(true)}>Filtrar</Dropdown.Item>
    <Dropdown.Item onClick={()=> btn_expand()} >Maximizar</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
         
      </div>
        </div>
       <Modalfecha data={dataDetalles}  grafica={grafica} show={show} setShow={setShow} mes={title[typeDash]} tipo={"BAR"}/>
        <Grafica type={"BAR"} data={data[typeDash]} dataLabels={dataLabels} title={title[typeDash]} options={{
            maintainAspectRatio: false,
          }}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
    data: state.dashboard.dashboard.comparacion?.resultData ?? ["0","0"],
    title: state.dashboard.dashboard.title ?? "",
});
  
export default connect(mapStateToProps)(card);
   