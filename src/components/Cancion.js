import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Cancion = ( { letra } ) => {

    //si la letra llega vacia no se ejecuta nada
    if(letra.length === 0) return null;

    return ( 
        <Fragment>
            <h2>Letra Canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
    );
}

Cancion.propTypes = {
    letra: PropTypes.string.isRequired
}
 
export default Cancion;