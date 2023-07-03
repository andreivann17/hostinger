import CardGraficaComparacion from "./cardGraficaComparacion";
import CardGraficaFecha from "./cardGraficaFecha";
import Card from "./cards";
import CardRegistros from "./cardRegistros";
import CardComparacion from "./cardComparacion";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
const card = ({  }) => {

  const cardComparacionRef = useRef(null);
  const cardFechaRef = useRef(null);
  const [altura, setAltura] = useState("0px");
  useEffect(() => {
    setAltura(`${cardFechaRef.current.clientHeight}px`);
  }, []);
  return (
    <>
      <div className=" marginb-2 " style={{ borderRadius: "6px" }}>
        <Card />
      </div>
      <div className="d-flex align-items-stretch">
        <div
          className="marginb-2 bg-light marginr-1 shadow-lg"
          style={{ borderRadius: "6px", width: "40%" }}
        >
          <div className="w-100">
            <CardGraficaComparacion  />
          </div>
        </div>
        <div
          className="marginb-2 bg-light marginl-1 d-flex flex-column"
          style={{ borderRadius: "6px", width: "60%" }}
        >
          <CardRegistros  altura={altura} style={{ flex: "1" }} />
        </div>
      </div>

      <div className="d-flex align-items-stretch ">
        <div
          className="marginb-2 bg-light marginr-1 shadow-lg"
          style={{ borderRadius: "6px", width: "60%", overflowY: "auto" }}
          ref={cardComparacionRef}
        >
          <CardComparacion />
        </div>

        <div
          className="marginb-2 bg-light marginl-1 shadow-lg"
          style={{ borderRadius: "6px", width: "40%", alignSelf: "stretch" }}
          ref={cardFechaRef}
        >
          <CardGraficaFecha  />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps)(card);
 