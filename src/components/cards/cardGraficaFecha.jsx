import {useState} from 'react'
import Modalfecha from "../modals/modalAuth"
import Grafica from "../grafica/grafica.jsx"     
import { Form,Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
const dataLabels = ["Hora", "Dia","Semana","Mes"]
function card({title,horas,semana,dias,mes}) {
  console.log(title)
  const [show,setShow] = useState(false)
  const [dataDetalles,setDataDetalles] = useState([])
  const [grafica,setGrafica] = useState(false)
  const [valueinput,setValueInput] = useState()
  const [data,setData] = useState([])
  const [pos, setPos] = useState([2, 2, 2, 2]);
  const btn_expand = () =>{
    setDataDetalles([data,title,dataLabels,"BAR"])
    setGrafica(true)
    setShow(true)
  }
  const settitleinput = (posValue, posIndex) => {
    const newPos = pos.map((value, index) => {
      if (index === posIndex) {
        return posValue;
      }
      return value;
    });
    setPos(newPos);
  };
  const btn_detalles = () =>{
    setDataDetalles([table,dataLabels,columndouble,rowtitle])
    setGrafica(false)
    setShow(true)
  }
  const onStateChange = (value) =>{

    setValueInput(value)
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
    <Dropdown.Item onClick={()=> btn_detalles()} >Detalles</Dropdown.Item>
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
    mes: state.dashboard.dashboard.mes ?? [],
    semana: state.dashboard.dashboard.semana ?? [],
    horas: state.dashboard.dashboard.horas ?? [],
    dias: state.dashboard.dashboard.dias ?? [],
    title: state.dashboard.dashboard.title ?? "",
});
  
  export default connect(mapStateToProps)(card);
   