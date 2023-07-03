import { connect } from "react-redux";
import { useNavigate } from "react-router";
const color = ["light", "light", "light", "light", "light", "light"];
const invert = [false, false, false, false];

function card({ data, dataTitle }) {
  console.log(data)
  const navigate = useNavigate();
  const click = [
    () => click_card(0),
    () => click_card(1),
    () => click_card(2),
    () => click_card(3),
  ];
  const click_card = (value) => {
    if (value == 0 && window.location.pathname == "/entradas") {
      navigate("/ventas");
    }
  };
  return (
    <div className="w-100  d-flex">
      {
      typeof data["contentCards"] != "undefined" &&
      data["contentCards"].map((item, index) => (
        <button
          onClick={click[index]}
          className={
            "  shadow-lg p-3 marginb-1 btn-" + color[index] + " btn text-dark h-100"
          }
          style={{
            width:"350px",
            borderRadius: "6px",
            marginLeft: index < data["contentCards"].length && index > 0 ? "10px" : "10px",
            marginRight: index < data["contentCards"].length ? "10px" : "10px",
          }}
        >
          <h6 className="text-dark marginb-2 text-start ">
            {dataTitle["titleCards"][index]}
          </h6>

          <div className="d-flex justify-content-center align-items-center">
            {item[2] == "$" && <h3 className=" marginb-3 ">{item[2]}</h3>}
            <h3 className=" marginb-3 marginr-1">
              {parseFloat(item[1]).toFixed(2)}{" "}
            </h3>
            {item[2] != "$" && item[2] != "-" && item[2] != "NO" && (
              <h3 className=" marginb-3 ">{item[2]}</h3>
            )}
            {item[0] != "" && (
              <small>
                {" (" + parseFloat(item[0]).toFixed(2) + " " + item[3] + ")"}
              </small>
            )}
          </div>

      
          {}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.dashboard.dashboard.cards ?? [],
  dataTitle: state.dashboard.dashboard.cards ?? [],
});

export default connect(mapStateToProps)(card);
