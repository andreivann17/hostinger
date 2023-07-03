
import Cardinfo from "../empleados/cardInfo";
import { useRef,useEffect,useState } from "react";
function card({ data, callback }) {
  const cardFechaRef = useRef(null);
  const [altura,setAltura] = useState("0px")

  useEffect(() => {
    setAltura(`${cardFechaRef.current.clientHeight}px`)
  }, []);
  return (
    <>
    
    <div className="d-flex   marginb-3">
      <div
        className="marginr-1  bg-dark"
        style={{ borderRadius: "6px", width: "calc(50% )" }}
      >
       
      </div>
      <div
        className=" marginl-1 bg-dark"
        style={{ borderRadius: "6px", width: "calc(50% )" }}  ref={cardFechaRef}
      >
        {typeof data != "undefined" && (
          <Cardinfo data={data[0]} ini={ini} img={data[4]} dataiva={data[1]} dataarea={data[3]} datacategorias={data[2]}/>
        )}
      </div>
    </div>
    </>
  );
}

export default card;
