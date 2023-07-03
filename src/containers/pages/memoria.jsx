import "./../../assets/css/cards.css";
import { useEffect } from "react";
import Header from "../../components/navigation/header.jsx";
import Grafica from "../../components/grafica/grafica.jsx";
import Contenido from "../../components/navigation/contenido.jsx";
import { useDispatch,connect } from "react-redux";
import {actionMemoria} from "../../redux/actions/memoria/memoria"
const token = localStorage.getItem("tokends");

function Home({data,title}) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionMemoria())
  }, []);

  return (
    <>
    {token != null && (
    <>
   <Header
            title={"Memoria"}
            titlebutton={"Editar informacion"}
            setShowadd={null}
            iconbutton={"pencil"}
            value={"-"}
            icon={"fas fa-utensils marginr-1 "}
          />

       

          <div className="Panel_Contenido  marginb-5">
          <Contenido
            title={"Memoria"}
            titlebutton={"Editar informacion"}
            value={"-"}
            setShowadd={null}
            iconbutton={"pencil"}
            icon={"fas fa-utensils marginr-1 "}
            setShow={null}
          />
     <div className="d-flex">
     <div
    className="marginb-2 bg-dark marginr-1 shadow-lg p-2"
    style={{ borderRadius: "6px", width: "60%" }}
  >
       <Grafica data={data} title={"Memoria (MB)"} type={"BAR"} options={{
            maintainAspectRatio: false,
          }} datalabels={ title} />
     
       
      </div>
      <div
  className="marginb-2 bg-dark marginl-1 shadow-lg p-2"
    style={{ borderRadius: "6px", width: "40%" }}
  >
     <table className="table">
            
              <tbody>
                {
                   data.map((item,index) => (
             
                <tr>
                  <td>
                    <div>
                      <small
                        style={{ fontSize: "16px" }}
                        className="text-white d-block mb-1"
                      >
                        {parseFloat(item).toFixed(3) + " (MB)"}
                      </small>
                      <small
                        style={{ fontSize: "12px" }}
                        className="text-muted d-block"
                      >
                        {title[index]}
                      </small>
                    </div>
                  </td>
                </tr>
         ))}
              </tbody>
        
          </table>
     </div>
     </div>
   
      </div>
      </>
    )}
    
    </>
  );
  
}

const mapStateToProps = (state) => ({
  data: state.memoria.memoria.data ?? [],
  title: state.memoria.memoria.title ?? "",
});

export default connect(mapStateToProps)(Home);