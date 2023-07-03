import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
const Barra = ({ salidas, entradas }) => {
  const [porcentone, setPorcentone] = useState(50);
  const [porcenttwo, setPorcenttwo] = useState(50);
  const setporcent = (salidas, ventas) => {
    try {
      let x = 50;
      if (parseInt(salidas) > 0 || parseInt(ventas) > 0) {
        x =
          (parseFloat(ventas) / (parseFloat(ventas) + parseFloat(salidas))) *
          100;
      }
      let y = 100 - x;
      setPorcentone(y);
      setPorcenttwo(x);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    setporcent(salidas, entradas);
  }, [entradas, salidas]);

  return (
    <div
      className="d-flex   marginb-4 "
      style={{
        height: "200px",
        background:
          "to right, #333  50%, linear-gradient(" + (porcenttwo >= porcentone)
            ? "#375a7f , #375a7f"
            : "#f39c12,#f39c12" + ")  50%",
        backgroundPosition: "left top, right top",
        backgroundSize: "50% 100%, 50% 100%",
        backgroundRepeat: " no-repeat",
      }}
    >
      <div className=" col-2" style={{ backgroundColor: "#333" }}>
        <div className="d-flex justify-content-center w-100 h-100 align-items-center">
          <div>
            <h5>${parseFloat(salidas).toFixed(2)}</h5>
            <small className="text-light marginr-1">{text1}</small>
          </div>
        </div>
      </div>

      <div
        className=" "
        style={{
          backgroundColor: "#333",
          width: porcentone + "%",
          transition: "width 0.5s ease",
        }}
      >
        <div className="text-end w-100 " style={{ position: "absolute" }}>
          <small style={{ marginRight: "10px" }}>
            {parseFloat(porcentone).toFixed(2) + "%"}
          </small>
        </div>
      </div>
      <div
        className={porcenttwo >= porcentone ? "bg-primary" : "bg-warning"}
        style={{ width: porcenttwo + "%", transition: "width 0.5s ease" }}
      ></div>
      <div
        className={
          porcenttwo >= porcentone ? "bg-primary col-2" : "bg-warning col-2"
        }
      >
        {typeof entradas != "undefined" && (
          <div className="d-flex justify-content-center w-100 h-100 align-items-center">
            <div>
              <h5>${parseFloat(entradas).toFixed(2)}</h5>
              <small className="text-light">{text2}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  entradas: state.dashboard.dashboard.entradas ?? 0,
  salidas:state.dashboard.dashboard.salidas ?? 0,
});

export default connect(mapStateToProps)(Barra);
