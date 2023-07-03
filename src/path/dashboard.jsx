// /src/routes/dashboard.js
import { createRef } from "react";
import Dashboard from "../containers/pages/utils/dashboard";
let MenusRoutes = [
    {
        path: `/empleados/:id`,
value:`admin-0`, 
name:"Empleados", 
element: <Dashboard  title={"Empleados"} />, 
nodeRef: createRef() , 
className:`admin-0`
    }, {
        path: `/usuarios/:id`,
value:`admin-0`, 
name: "Usuarios", 
element: <Dashboard  title={"Usuarios"}  />, 
nodeRef: createRef() , 
className:`admin-1`
    },
    {
        path: `/departamentos/:id`,
value:`admin-0`, 
name: "Departamentos", 
element: <Dashboard  title={"Departamentos"} />, 
nodeRef: createRef() , 
className:`admin-2`
    },{
        path: `/puestos/:id`,
value:`admin-0`, 
name: "Puestos", 
element: <Dashboard  title={"Puestos"}/>, 
nodeRef: createRef() , 
className:`admin-3`
    },{
        path: `/contrato/:id`,
value:`admin-0`, 
name: "Contrato", 
element: <Dashboard  title={"Tipo de contrato"} />, 
nodeRef: createRef() , 
className:`admin-3`
    },{
        path: `/generos/:id`,
value:`admin-0`, 
name: "Generos", 
element: <Dashboard  title={"Generos"} />, 
nodeRef: createRef() , 
className:`admin-3`
    }
]

export  default MenusRoutes 