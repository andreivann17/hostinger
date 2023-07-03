import {useState} from 'react'
import Modalfecha from "../modals/modalAuth"
import Grafica from "../grafica/grafica.jsx"     
import {Form,Dropdown} from "react-bootstrap"
import { connect } from 'react-redux'
const dataLabels = ["Mes Pasado", "Este Mes"]
const dataSelectLabels = ["Ausentismo","Incapacidades","Horas Extras","Retardos","Permisos c/goce"]
function card({data,title}) {
  console.log(data)
  const [show,setShow] = useState(false)
  const [dataDetalles,setDataDetalles] = useState([])
  const [grafica,setGrafica] = useState(false)
  const btn_expand = () =>{
    setDataDetalles([data,title,dataLabels,"BAR"])
    setGrafica(true)
    setShow(true)
  }

  return (
    <div className="p-4 " >
      <div className="d-flex justify-content-end mb-3 ">

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
       <Modalfecha data={dataDetalles}  grafica={grafica} show={show} setShow={setShow} mes={title} tipo={"BAR"}/>
        <Grafica type={"BAR"} data={data} dataLabels={dataLabels} title={title} options={{
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
   