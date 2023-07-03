import React, {useImperativeHandle, useRef } from 'react';
import Header from './header';
import '../../assets/css/cards.css';
import Contenido from './contenido';

import { connect, useDispatch } from 'react-redux';
const token = localStorage.getItem('tokends');

const Contenedor =({children,openShow,title,titleButton,setShowFiltrar,value }) => {
    
 const handleRightClick = (event) => {
    event.preventDefault();
}

  return (
    <>
       
      {token != null && (
        
        <div onContextMenu={handleRightClick}  style={{overflowY:"auto","minHeight":"1200px"}}>
        <Header
            title={title}
            titleButton={`Agregar ${titleButton}`}
            setShowAdd={openShow}
            icon={'fas fa-utensils marginr-1 '}
          />

          <div className="Panel_Contenido   marginb-5">
            <Contenido
              title={title}
              titleButton={`Agregar ${titleButton}`}
              setShowAdd={openShow}
              icon={'fas fa-utensils marginr-1 '}
              setShow={setShowFiltrar}
            />
          {children}
            
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
 
});
  
export default connect(mapStateToProps)(Contenedor);
