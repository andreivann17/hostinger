import {useState} from 'react'
import Modalfecha from "../modals/modalAuth"
import Grafica from "../grafica/grafica.jsx"     
import { Form,Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
const dataLabels = ["Hora", "Dia","Semana","Mes"]
function card({title,horas,semana,dias,mes,typeDash,}) {
  console.log(title)
  const [show,setShow] = useState(false)
  const [dataDetalles,setDataDetalles] = useState([])
  const [grafica,setGrafica] = useState(false)
  const [valueinput,setValueInput] = useState()
  const [data,setData] = useState([])
  const [pos, setPos] = useState([2, 2, 2, 2]);
  const btn_expand = () =>{
    setDataDetalles([data,title[typeDash],dataLabels,"BAR"])
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
      <div className="d-flex justify-content-between mb-3 ">
      <div className='col-6'>
             <Form.Select
            onChange={(ev) => onStateChange(ev.target.value)}
            className="mb-3 "
          >
                  {dataLabels != null &&
              dataLabels.map(
                (item,index) =>
                  (item == valueinput && (
                    <option value={index} selected>
                      {item}
                    </option>
                  )) || <option value={index}>{item}</option>
              )}
       
          </Form.Select>
         </div>
      
        <div>
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
        </div>
       <Modalfecha data={dataDetalles}  grafica={grafica} show={show} setShow={setShow} mes={title[typeDash]} tipo={"BAR"}/>
        <Grafica type={"BAR"} data={data} dataLabels={dataLabels} title={title[typeDash]} options={{
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
   