const data = {
    "/empleados/:id":{
        info:[],
        img:"",
        error:null,
    },
"/usuarios/:id":{
    info:[],
    privilegios:[],
    img:"",
    error:null,
},"/departamentos/:id":{
    info:[],
    error:null,
},"/puestos/:id":{
    info:[],
    error:null,
},"/contrato/:id":{
    info:[],
    error:null,
},"/generos/:id":{
    info:[],
    error:null,
},
}
const getData = () =>{
return data[window.location.pathname]
}
export default getData