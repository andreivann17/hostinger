import "../../assets/css/contenido.css";
import {Button,Dropdown} from "react-bootstrap/";
function Contenido({children, title }) {

  return (
    
  <>
   
  <div >

<div className="d-flex margint-5 ">

<h2 className="text-primary-osmed">{title}</h2>
</div>
<div className="margint-2 marginb-5">

<div  className="d-flex  align-items-center justify-content-start margint-1 marginb-1 div_buttonmain">
 {children}
 
</div>

</div>
</div>
</> 
  );
}
;
export default Contenido
