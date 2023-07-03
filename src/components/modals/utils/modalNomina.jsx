import React, { Component,useState } from "react";
import {Modal,Row, Table} from "react-bootstrap/";
import venthoimg from "../../../assets/img/ventho.png"
function modal({show,setShow}) {
    
  return (
    <>

  <Modal show={true} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton>Nomina</Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between w-100" style={{marginBottom:"40px"}}>
        <img src={venthoimg} style={{width:"180px"}} alt=""/>
        <div className="text-center">
        <h6 style={{fontWeight:"bold",fontSize:"18px"}}>DESARROLLADORA E INTEGRADORA VENTHO </h6>
<h6 style={{fontSize:"14px"}} >AV. HIDALGO ENTRE MORELOS Y 2da. #101,COL. CUAUHTEMOC</h6>
<h6 style={{fontSize:"14px"}}>SAN LUIS RIO COLORADO 83400</h6>
<h6 style={{fontSize:"14px",fontWeight:"bold"}}>DIV180630B59</h6>
<h6 style={{fontSize:"14px"}}>601 - General de Ley Personas Morales</h6>
        </div>
        <div style={{width:"200px"}}>
          <div className="w-100 border" style={{backgroundColor:"#096d65"} }>
            <div className="d-flex border-1 border-dark justify-content-center align-items-center" style={{backgroundColor:"#096d65",borderWidth:"0.5px"} }>
            <h6 className="text-white mt-2">TIPO DE NOMINA</h6>
            </div>
            <div className="d-flex bg-white border border-1 border-dark justify-content-center align-items-center " style={{borderWidth:"0.5px"}}>
               <h6 className="mt-1" style={{fontWeight:"bold"}}>ORDINARIA</h6>
            </div>
            <div className="d-flex bg-white border border-1 border-dark justify-content-center align-items-center">
    <div className="col-4 border border-1 border-dark" style={{borderWidth:"0.5px"}}>
        <h6 className="mt-1" style={{fontWeight:"bold"}}>Reg. Pat.</h6>
    </div>
    <div className="col-8 border border-1 border-dark" style={{borderWidth:"0.5px"}} >
        <h6 className="mt-1" style={{fontWeight:"bold"}}>E127306107</h6>
    </div>
</div>

          </div>
          
        </div>
        </div>
        <div className="w-100 "  style={{marginBottom:"20px"}}>
    <div className="d-flex">
    <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"80px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Empleado</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"80px",height:"40px"}}>
           <h6 className="text-dark mt-2">014</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"430px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Nombre del empleado</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"430px",height:"40px"}}>
           <h6 className="text-dark mt-2">ANDRE IVANN HERRERA CHAVEZ</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"255px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Puesto</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"255px",height:"40px"}}>
           <h6 className="text-dark mt-2">PROGRAMADOR</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"340px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2">Departamento</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"340px",height:"40px"}}>
           <h6 className="text-dark mt-2">INNOVACION Y DESARROLLO</h6>
          </div>
          </div>
    </div>
    <div className="d-flex">
    <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"160px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> RFC</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"160px",height:"40px"}}>
           <h6 className="text-dark mt-2">HECA000317MY6</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"210px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2">CURP</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"210px",height:"40px"}}>
           <h6 className="text-dark mt-2">HECA000317HSRRHNA4</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"140px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Inicio Rel. Laboral</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"140px",height:"40px"}}>
           <h6 className="text-dark mt-2">2023-01-11</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"180px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> No. Afiliación IMSS</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"180px",height:"40px"}}>
           <h6 className="text-dark mt-2">61160022242</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"110px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Sindicalizado</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"110px",height:"40px"}}>
           <h6 className="text-dark mt-2">No</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"90px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Riesgo</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"90px",height:"40px"}}>
           <h6 className="text-dark mt-2">Clase II </h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"115px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Salario Diario</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"115px",height:"40px"}}>
           <h6 className="text-dark mt-2">457.13</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"100px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> S.B.C.</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"100px",height:"40px"}}>
           <h6 className="text-dark mt-2">457.13</h6>
          </div>
          </div>
    </div>
    <div className="d-flex margint-2">
    <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"80px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Ejercicio</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"80px",height:"40px"}}>
           <h6 className="text-dark mt-2">2023</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"80px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2">Núm. Per.</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"80px",height:"40px"}}>
           <h6 className="text-dark mt-2">23</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"140px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Periodicidad</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"140px",height:"40px"}}>
           <h6 className="text-dark mt-2">02 - Semanal </h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"280px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Fecha Inicial Pago - Fecha Final Pago</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"280px",height:"40px"}}>
           <h6 className="text-dark mt-2">31/05/2023-06/06/2023</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"110px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Días de Pago</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"110px",height:"40px"}}>
           <h6 className="text-dark mt-2">7.000 </h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"110px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Jornada</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"110px",height:"40px"}}>
           <h6 className="text-dark mt-2">01 - Diurna </h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"125px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Régimen</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"125px",height:"40px"}}>
           <h6 className="text-dark mt-2">a Sueldos (Incluye)</h6>
          </div>
          </div>
          <div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{borderRadius:"2px",width:"180px",height:"30px",backgroundColor:"#c8c4c4"}}>
           <h6 className="text-dark mt-2"> Tipo Contrato</h6>
          </div>
          <div className="border border-1 border-dark d-flex justify-content-center align-items-center" style={{width:"180px",height:"40px"}}>
           <h6 className="text-dark mt-2">Tiempo indeterminado</h6>
          </div>
          </div>
    </div>
        </div>
        <div className="w-100">
          <div className="d-flex w-100">
           <div className="col-8">
           <div className="d-flex justify-content-center align-items-center  border border-1 border-dark" style={{height:"40px",backgroundColor:"#096d65"} }>
              <h6 className="text-white mt-2">PERCEPCIONES</h6>
            </div>
            <div  className="border border-1 border-dark" style={{minHeight:"300px"}}>
       <table className="table "> 
       <thead>
        <tr className="">
          <th style={{width:"80px"}} className="text-primary">SAT</th>
          <th style={{width:"40px"}}>No.</th>
          <th style={{width:"220px"}}>Concepto</th>
          <th style={{width:"80px"}}>Valor</th>
          <th style={{width:"80px"}}>Gravado</th>
          <th style={{width:"80px"}}>Exento</th>
          <th style={{width:"80px"}}>Total</th>
        </tr>
       </thead>
       <tbody>

        <tr>
          <td>P 001</td>
      
          <td>1</td>
          <td>Sueldo</td>
          <td>6.00</td>
          <td>2,567.10</td>
          <td>0.00</td>
          
          <td>2,567.10</td>
        </tr>
        <tr>
          <td>P 001</td>
      
          <td>1</td>
          <td>Bono puntualidad</td>
          <td>6.00</td>
          <td>2,567.10</td>
          <td>0.00</td>
          
          <td>2,567.10</td>
        </tr>
       </tbody>
       </table>
       </div>
           </div>
            <div className="col-4">
            <div className="d-flex justify-content-center align-items-center  border border-1 border-dark" style={{height:"40px",backgroundColor:"#096d65"} }>
              <h6 className="text-white mt-2">DEDUCCIONES</h6>
           
            </div>
            <div className="border border-1 border-dark" style={{minHeight:"300px"}}>
            <table className="table border border-1 border-dar" > 
       <thead>
        <tr className="">
        <th style={{width:"60px"}} className="text-primary">SAT</th>
          <th style={{width:"40px"}}>No.</th>
          <th style={{width:"220px"}}>Concepto</th>
          <th style={{width:"80px"}}>Total</th>
        </tr>
       </thead>
       <tbody>

        <tr>
          <td>004</td>
          <td>99</td>
          <td>Ajuste al neto</td>
          <td>0.07</td>
 
          
      
        </tr>
        <tr>
          <td>004</td>
          <td>99</td>
          <td>Ajuste al neto</td>
          <td>0.07</td>
 
          
      
        </tr>
        <tr>
          <td>004</td>
          <td>99</td>
          <td>Ajuste al neto</td>
          <td>0.07</td>
 
          
      
        </tr>
       </tbody>
       </table>
            </div>
            </div>
          </div>
           <div className="w-100 d-flex border border-1 border-dark">
          
            <div className="text-end mt-2" style={{width:"340px"}}>
              <h6 style={{fontWeight:"bold"}}>Suma de Percepciones + Otros Pagos:</h6>
            </div>
            
          </div>
        </div>
      </Modal.Body>
      </Modal>
      </>
  );
}

export default modal
