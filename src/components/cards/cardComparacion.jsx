import Tabledashcomp from "../tables/dashboard/tableComparacion";
import Pdf from "../utils/pdf"
import { useRef } from "react";
import { connect } from "react-redux";
function card({title}) {
    const ref = useRef()
    
   
  return (
    <div className="p-3" >
     <Pdf ref={ref}/>
      <div className="d-flex justify-content-between mb-3 p-2">
        <h5>{title}</h5>
     
      </div>
      <Tabledashcomp />
    </div>
  );
}

const mapStateToProps = (state) => ({
  title: state.dashboard.dashboard.title ?? "",
  });
  
  export default connect(mapStateToProps)(card);