import React, { useState } from "react";
import "../../assets/css/login.css";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import Modalrecuperar from "../../components/modals/modalOlvidarPassword";
import Toast from "../../components/toasts/toast";
import { FloatingLabel, Form } from "react-bootstrap";
import logo from "../../assets/img/logo.jpg";
import {actionComprobar} from "../../redux/actions/login/login"
import { useDispatch } from "react-redux";
function Home({}) {
  const navegate = useNavigate();
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [showmsg, setShowmsg] = useState(false);
  const dispatch = useDispatch()
  const comprobar = () => {
    if (nombre.trim().length == 0 || pass.trim().length == 0) {
      setMsg("No puedes dejar campo vacio");
      setShowmsg(true);
      return false;
    }
    return true
  };
  const callback = (value) =>{
    console.log(value)
    if(value.status){
      localStorage.setItem("tokends",value.value);
      navegate("/empleados");
      return
    }
    setMsg("Nombre de usuario o contraseña no concuerdan");
    setShowmsg(true);
  }
  const callbackError = (value) =>{
    setMsg(value);
    setShowmsg(true);
  }
  const btn_aceptar = () => {
    if (comprobar() == false) {
      return;
    }
    var parametros = {
      nombre: nombre,
      pass: pass,
    };
    dispatch(actionComprobar(parametros,callback,callbackError))
  };

  const GoogleButton = ({}) => {
    return (
      <GoogleLogin
        clientId="AIzaSyDoKrdNf53mi6DKuxESOqiRN3Llf0gibXc"
        buttonText=""
        cookiePolicy={"single_host_origin"}
        className="w-100  text-center d-flex justify-content-center"
        style={{ padding: "0px" }}
      >
        Iniciar sesion
      </GoogleLogin>
    );
  };
  const FacebookButton = ({ onFacebookLogin }) => {
    return (
      <FacebookLogin
        appId="236070455686237"
        autoLoad={false}
        fields="name,email,picture"
        textButton="Iniciar sesion"
        callback={onFacebookLogin}
        icon="fa-facebook"
        cssClass="btn btn-primary w-100 btn-facebook"
      />
    );
  };
  return (
    <>
      <Toast msg={msg} setShow={setShowmsg} show={showmsg} />
      <Modalrecuperar show={show} setShow={setShow} />

      <div className="w-100 d-flex justify-content-center align-items-center h-100">
        <div
          className="scroll_login"
          style={{
            width: "500px",
            display: "inline-block",
            overflowY: "auto",
            height: "100vh",
          }}
        >
          <div className="d-flex justify-content-center p-2 ">
            <div>
              <div className="d-flex justify-content-center  ">
                <img style={{ width: "100px" }} src={logo} alt={""} />
              </div>
              <h4 className="mt-2">Inicio de Sesion</h4>
            </div>
          </div>
          <div className="p-3 m-3">
            <FloatingLabel
              label="Nombre de usuario"
              className="marginb-2 floating-label text-dark"
            >
              <Form.Control
                className="text-dark"
                value={nombre}
                onChange={(ev) => setNombre(ev.target.value)}
                type="text"
                placeholder="Nombre"
              />
            </FloatingLabel>

            <FloatingLabel label="Contraseña" className="marginb-2">
              <Form.Control
                value={pass}
                onChange={(ev) => setPass(ev.target.value)}
                type="password"
                placeholder="Contraseña"
              />
            </FloatingLabel>
            <div className="d-flex justify-content-center ">
              <div className="w-100 text-center">
                <button
                  className="d-block w-100 marginb-2 btn btn-primary-osmed"
                  onClick={() => btn_aceptar()}
                >
                  Aceptar
                </button>
                <h6 className="marginb-2">- o -</h6>
                <div className="marginb-1">
                  <GoogleButton />
                </div>
                <div className="marginb-2">
                  <FacebookButton />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center ">
              <h6
                className="link-primary-osmed link-pointer"
                onClick={() => setShow(true)}
              >
                ¿Has olvidado tu contraseña?
              </h6>
            </div>
          </div>
        </div>
        <div
          className="backimg "
          style={{
            width: "calc(100%)",
            height: "100vh",
            display: "inline-block",
          }}
        ></div>
      </div>
    </>
  );
}
export default Home;