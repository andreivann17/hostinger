const data = {
    "/empleados":{
        info:[],
        img:"",
        error:null,
    },
"/usuarios":{
    info:[],
    privilegios:[],
    img:"",
    error:null,
},"/departamentos":{
    info:[],
    error:null,
},"/puestos":{
    info:[],
    error:null,
},"/contrato":{
    info:[],
    error:null,
},"/generos":{
    info:[],
    error:null,
},
}
const getData = () =>{
return data[window.location.pathname]
}
export default getData