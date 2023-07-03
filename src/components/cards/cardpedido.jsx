import {Card,Col} from "react-bootstrap"
function card({btn_eliminar, itemzona,pedidos_click,btn_agremarmenus,btn_detallesproductos,btn_pagar,indexzona,tipo }) {
    return (
        <Col className="cardpedidos">
        <Card style={{
WebkitBoxShadow: "5px 0.5px 5px 5px rgba(0,0,0,0)",
MozBoxShadow: "5px 0.5px 5px 5px rgba(0,0,0,0)",
boxShadow: "5px 0.5px 5px 5px rgba(0,0,0,0)",
}} onClick={() =>pedidos_click(indexzona)}>
          <Card.Header className="bg-secondary p-2 d-flex justify-content-center align-items-center" style={{height:"160px"}}>
         <div className="d-flex"> <i className="fas fa-clock marginr-1" style={{fontSize:"22px"}}></i><h5>{itemzona.hora}</h5></div>
          </Card.Header>
          <Card.Body  >
            <Card.Title>{itemzona.nombre}</Card.Title>
            <Card.Subtitle>{itemzona.celular}</Card.Subtitle>
            <Card.Text>
             {itemzona.direccion}
            </Card.Text>
            <div
            style={{
              opacity:  itemzona.opacity,
              transition: "all 250ms linear 0.2s",
            }}
          >
            <div style={{ display:  itemzona.display}}>

              

             <div className="w-100 margint-4 ">
              <div className="d-flex ">
              <button onClick={() => btn_agremarmenus(indexzona, tipo)} className="btn btn-secondary w-100 d-block marginb-1 marginr-1"><i className="fas fa-plus marginr-icon"></i>Agregar menus</button>
              <button    onClick={() => btn_detallesproductos(indexzona, tipo)} className="btn btn-secondary w-100 d-block marginb-1"><i className="fas fa-info-circle marginr-icon"></i>Ver detalles</button>
              </div>
             <div className="d-flex ">
             <button onClick={() => btn_pagar(itemzona.id,tipo)} className="btn btn-primary w-100 d-block marginb-1 marginr-1"><i className="fas fa-dollar-sign marginr-icon"></i>Pagar cuenta</button>
              <button  onClick={() => btn_eliminar(itemzona.id,tipo)} className="btn btn-danger w-100 d-block marginb-1"><i className="fas fa-trash marginr-icon"></i>Eliminar</button>
             </div>
            </div>
            </div>
            </div>
          </Card.Body>
         
        </Card>
      </Col>
    );
  }
  
  export default card
  