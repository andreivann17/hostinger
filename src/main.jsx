import { createRef } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  useNavigate,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {actionScroll} from "./redux/actions/utils/utils"
import Movimientos from "./containers/pages/registros";
import CatalogosRoutes from "./path/catalogos";
import DashboardRoutes from "./path/dashboard";
import Menu from "./components/navigation/menus";
import Divisas from "./containers/pages/divisas";
import Memoria from "./containers/pages/memoria";
import Login from "./containers/pages/login";
import "./assets/css/bootstrap.css";
import "./assets/css/administrador.css";
import "./styles.css";
import "./assets/css/styles.css";
import "./assets/css/scroll.css";
import "./assets/css/utils.css";
import store from "./store";
import { Provider, useDispatch } from "react-redux";
const token = localStorage.getItem("tokends");
const routes = [
  ...CatalogosRoutes,
...DashboardRoutes,
  {
    path: "/movimientos",
    value: "admin-9-0",
    name: "Movimientos",
    element: <Movimientos />,
    nodeRef: createRef(),
    className: "admin-5",
  },
  {
    path: "/login",
    value: "login-0",
    name: "Login",
    element: <Login />,
    nodeRef: createRef(),
    className: "Login",
  },


  {
    path: "/divisas",
    value: "admin-8-2",
    name: "divisas",
    element: <Divisas />,
    nodeRef: createRef(),
    className: "admin-8",
  },
  {
    path: "/memoria",
    value: "admin-8-3",
    name: "memoria",
    element: <Memoria />,
    nodeRef: createRef(),
    className: "admin-8",
  },
 
 
 

];
const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function Example() {
  const navegate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const currentOutlet = useOutlet();
  const pathname = location.pathname;
  const normalpath = pathname.replace(/\/+$/, "");
  if (token == null) {
    if (normalpath != "/login") {
      navegate("/login");
    }
  }

  
  const handleRightClick = (event) => {
    if (event.target.classList.contains('cardcatalogo')) {
      event.preventDefault();
    }
  }
  const onScroll = (event) =>{
    dispatch(actionScroll(event.currentTarget.scrollTop))

  }
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
   
  return (
    <>
     <Menu
          valuenav={'empleados'}

        ></Menu>

       <div onScroll={(evt) => onScroll(evt)} onContextMenu={handleRightClick} className={"div_contentmaster"}>
        <div>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              timeout={200}
              classNames="page"
              unmountOnExit
            >
              {(state) => (
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
