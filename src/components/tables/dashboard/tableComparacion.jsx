import { connect } from "react-redux";
function table({resultadoData,tableData,typeData,porcentaje,alcance,altura}) {
  return (
    <>
    
      <div style={{overflowX:"auto"}}>
        <div className="d-flex marginb-2 p-2">
        <h6 className="marginr-1 text-light">Alcance total:</h6>
          <h6>{alcance}</h6>

        </div>
      <div style={{height:altura,overflowY:"auto"}}>
      <table className="table">
          {
          
 
           
            ( typeof resultadoData[0] !="undefined" ) && (
            
             
            <tbody>
            {resultadoData[0].map((item,index) => (
              <tr>
          {tableData.map((item2,index2) => (
           
           <td>
               
           <div>
            {
                item2=="Resultado"&&
<>
<h6>{parseFloat(porcentaje[index]).toFixed(2)+"%"}</h6>
<div class="progress d-block mb-1" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                 <div class={"text-center progress-bar bg-"+resultadoData[index2][index]} style={{"width": Math.abs(parseFloat(porcentaje[index]).toFixed(2))+"%"}}><h6 style={{visibility:"hidden"}}>{porcentaje[index]+"%"}</h6></div>
             
                </div>
</>
                
            }{
                item2!="Resultado"&& 
          
           <small
             style={{ fontSize: "16px" }}
             className="text-white d-block mb-1"
           >
            {
              typeData[index2] == "STR"&&
              resultadoData[index2][index]
            }
            {
              typeData[index2] == "INT"&&
              parseInt( resultadoData[index2][index])
            }
            {
              typeData[index2] == "FLOAT"&&
              parseFloat( resultadoData[index2][index])
            }
            {
              typeData[index2] == "CURRENCY"&&
              "$"+parseFloat( resultadoData[index2][index]).toFixed(2)
              
            }

    
           </small>
             }
           <small
             style={{ fontSize: "12px" }}
             className="text-muted d-block"
           >
             {tableData[index2]}
           </small>
         </div>
 
       </td>
                 ))}
              </tr>
            ))}
          </tbody>
              
            
          
        )}
        </table>
      </div>
        </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  resultadoData: state.dashboard.comparacion?.resultData ?? [],
  porcentaje:state.dashboard.comparacion?.porcentaje?? [],
  alcance:state.dashboard.comparacion?.alcance?? [],
  typeData:state.dashboard.comparacion?.typeData?? [],
  tableData:state.dashboard.comparacion?.tableData?? [],
});

export default connect(mapStateToProps)(table);
 
