import { Link } from "react-router-dom";

function card({ data, url }) {
 
  
  return (
    <>
  
          {data.map((item) => (
            <Link to={"/" + url + "/" + item.id}>
              <button     className="cardcatalogo btn">
                <div className="d-flex justify-content-center mt-2">
                  <img className="div_backimgs" src={item.img} alt="" />
                </div>
                <div className="cardcatalogocontent d-flex flex-column align-items-start">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title inlineblock marginl-1">
                      {" "}
                      {item.nombre}
                    </h5>
                  </div>
                </div>
              </button>
            </Link>
          ))}
          {data.length == 0 && (
            <div className="text-center">
              <h6 className="text-vacio text-primary-osmed">Vacio</h6>
            </div>
          )}
    
    </>
  );
}

export default card;
