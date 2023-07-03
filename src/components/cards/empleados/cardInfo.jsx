import Modalformmenu from "../../modals/modalonlymenuinfoform";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import Modaleliminando from "../../modals/modalEliminar";
import { useNavigate, useParams } from "react-router-dom";
import { actionEliminar } from "../../../redux/actions/empleados/empleados";
import Pdf from "../../utils/pdf";
import { useRef } from "react";
import imgback from "../../../assets/media/Logo_DonSimonN.png";
import { useDispatch,connect } from "react-redux";
const titleexport = "Informacion del Platillo";
const rowheader = [
  "Clave",
  "Nombre",
  "Categoria",
  "Area",
  "Precio",
  "I.V.A",
  "Precio C/IVA",
  "Descripcion",
  "Fecha de creacion",
  "Hora de creacion",
];
function CardInfo({ callback, altura, img }) {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const [showeliminar, setShoweliminar] = useState(false);
  let { id } = useParams();
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const callbackMsg = () => {
    setShoweliminar(false);
    navegate("/menus");
  };
  const eliminando = () => {
    var parametros = {
      clave: id,
    };
    dispatch(actionEliminar(parametros, callbackMsg, () => true));
  };
  const exportar = () => {
    const rowbody = [
      data[0],
      data[1],
      data[9].toString(),
      data[10].toString(),
      `$ ${parseFloat(data[4]).toFixed(2).toString()} `,
      `$ ${parseFloat(data[11]).toFixed(2).toString()}  (%${data[5].toString()}) `,
      `$ ${parseFloat(data[12]).toFixed(2).toString()} `,
      data[6],
      data[7],
      data[8],
    ];
    ref.current.exportar(titleexport, "TABLE_VERTICAL", [rowheader, rowbody]);
  };
  return (
    <div className="p-3">
      <Pdf ref={ref} />
      <Modaleliminando
        eliminando={eliminando}
        idmodpost={""}
        setShow={setShoweliminar}
        show={showeliminar}
      />
      <Modalformmenu callback={callback} show={show} setShow={setShow} />
      <div className="d-flex justify-content-between mb-3">
        <h5>Informacion</h5>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="btn-outline-secondary text-white border-0 rounded-circle custom-toggle"
            >
              <i style={{ fontSize: "18px" }} className=" fas fa-ellipsis"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShow(true)}>
                Editar
              </Dropdown.Item>
              <Dropdown.Item onClick={() => exportar()}>Exportar</Dropdown.Item>
              <Dropdown.Item onClick={() => setShoweliminar(true)}>
                Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div
        style={{
          minHeight: "300px",
          height: altura,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="d-flex"
      >
        <div className="w-50 p-1">
          { img && img != null && img != "" && (
            <img className="img-fluid" src={img} />
          )}
          {(!img  || img == null || img == "") && (
            <div
              className="div_backimgs "
              style={{ backgroundColor: "var(--bs-secondary)" }}
            >
              <img
                className="img-fluid logoempresa p-4 margint-2"
                alt=""
                src={imgback}
              />
            </div>
          )}
        </div>
        <table className="table marginl-1 w-50">
          {typeof data !== "undefined" && (
            <tbody>
              <tr>
                <td>
                  <div>
                    <small
                      style={{ fontSize: "16px" }}
                      className="text-white d-block mb-1"
                    >
                      {data[0]}
                    </small>
                    <small
                      style={{ fontSize: "12px" }}
                      className="text-muted d-block"
                    >
                      Clave
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <small
                      style={{ fontSize: "16px" }}
                      className="text-white d-block mb-1"
                    >
                      {data[1]}
                    </small>
                    <small
                      style={{ fontSize: "12px" }}
                      className="text-muted d-block"
                    >
                      Nombre
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <small
                      style={{ fontSize: "16px" }}
                      className="text-white d-block mb-1"
                    >
                      {data[9]}
                    </small>
                    <small
                      style={{ fontSize: "12px" }}
                      className="text-muted d-block"
                    >
                      Categoria
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <small
                      style={{ fontSize: "16px" }}
                      className="text-white d-block mb-1"
                    >
                      ${parseFloat(data[4]).toFixed(2)}
                    </small>
                    <small
                      style={{ fontSize: "12px" }}
                      className="text-muted d-block"
                    >
                      Precio
                    </small>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <small
                      style={{ fontSize: "16px" }}
                      className="text-white d-block mb-1"
                    >
                      %{data[5]}
                    </small>
                    <small
                      style={{ fontSize: "12px" }}
                      className="text-muted d-block"
                    >
                      I.V.A.
                    </small>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  img: state.catalogos.details.details.img,
});

export default connect(mapStateToProps)(CardInfo);
