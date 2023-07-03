import React, {  useEffect } from "react";
import "./../../assets/css/cards.css";
import Table from "react-bootstrap/Table";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/contenido.jsx";
import { useDispatch, connect } from "react-redux";
import { actionRegistros } from "../../redux/actions/registros/registros";
const token = localStorage.getItem("tokends");
function Home({ data }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionRegistros({
      limit: "0",
      buscador: "",
      value: "15",
    }));
  }, []);

  return (
    <>
      {token != null && (
        <>
          <Header
            title={"Movimientos"}
            titlebutton={"movimientos"}
            value={"-"}
            icon={"fas fa-history marginr-1 "}
            url={"//"}
          />
          <div className="Panel_Contenido marginb-5">
            <Contenido
              title={"Movimientos"}
              titlebutton={"movimientos"}
              value={"-"}
              icon={"fas fa-history marginr-1 "}
              url={"//"}
            />
            <Table striped bordered hover>
              <tbody>
                {data.length > 0 &&
                  data.map((item) => (
                    
                    <tr>
                      <td>
                        <div>
                          <small
                            style={{ fontSize: "16px" }}
                            className=" d-block mb-1"
                          >
                            {item.clave}
                          </small>
                          <small
                            style={{ fontSize: "12px" }}
                            className="text-muted d-block"
                          >
                            Clave
                          </small>
                        </div>
                      </td>
                      <td>
                        <div>
                          <small
                            style={{ fontSize: "16px" }}
                            className=" d-block mb-1"
                          >
                            {item.nombre}
                          </small>
                          <small
                            style={{ fontSize: "12px" }}
                            className="text-muted d-block"
                          >
                            Nombre
                          </small>
                        </div>
                      </td>

                      <td>
                        <div>
                          <small
                            style={{ fontSize: "16px" }}
                            className=" d-block mb-1"
                          >
                            {item.ip}
                          </small>
                          <small
                            style={{ fontSize: "12px" }}
                            className="text-muted d-block"
                          >
                            IP
                          </small>
                        </div>
                      </td>
                      <td>
                        <div>
                          <small
                            style={{ fontSize: "16px" }}
                            className=" d-block mb-1"
                          >
                            {item.fecha + " " + item.hora}
                          </small>
                          <small
                            style={{ fontSize: "12px" }}
                            className="text-muted d-block"
                          >
                            Fecha
                          </small>
                        </div>
                      </td>
                    </tr>
                  ))}
                {data.length == 0 && (
                  <div className="text-center text-vacio">
                    <h6>Vacio</h6>
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.registros.registros,
});

export default connect(mapStateToProps)(Home);