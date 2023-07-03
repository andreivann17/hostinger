// /src/routes/dashboard.js
import { createRef } from "react";
import Catalogos from "../containers/pages/Utils/Catalogos";
let MenusRoutes = [
    {
        path: `/empleados`,
value:`admin-0`, 
name:"Empleados", 
element: <Catalogos  title={"Empleados"} titleButton={"empleados"} />, 
nodeRef: createRef() , 
className:`admin-0`
    }, {
        path: `/usuarios`,
value:`admin-0`, 
name: "Usuarios", 
element: <Catalogos  title={"Usuarios"} titleButton={"usuarios"} />, 
nodeRef: createRef() , 
className:`admin-1`
    },
    {
        path: `/departamentos`,
value:`admin-0`, 
name: "Departamentos", 
element: <Catalogos  title={"Departamentos"} titleButton={"departamentos"} />, 
nodeRef: createRef() , 
className:`admin-2`
    },{
        path: `/puestos`,
value:`admin-0`, 
name: "Puestos", 
element: <Catalogos  title={"Puestos"} titleButton={"puestos"} />, 
nodeRef: createRef() , 
className:`admin-3`
    },{
        path: `/contrato`,
value:`admin-0`, 
name: "Contrato", 
element: <Catalogos  title={"Tipo de contrato"} titleButton={"tipo de contrato"} />, 
nodeRef: createRef() , 
className:`admin-3`
    },{
        path: `/generos`,
value:`admin-0`, 
name: "Generos", 
element: <Catalogos  title={"Generos"} titleButton={"generos"} />, 
nodeRef: createRef() , 
className:`admin-3`
    }
]

export  default MenusRoutes 