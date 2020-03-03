import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Formulario = ( { guardarBusquedaLetra } ) => {

    //state para tener la actualizacion de la busqueda segun el input del usuario
    const [ busqueda, guardarBusqueda ] = useState({
        artista: '',
        cancion: ''
    });

    //Para saber si hubo error en la validacion del Formulario
    const [ error, guardarError ] = useState(false);

    //extraemos el artista y la cancion desde el state
    const {artista, cancion } = busqueda;

    //funcion para leer lo ingresado en el input y colocarlo en el state
    const actualizarState = (e) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    //consultar las apis
    const buscarInformacion = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validando el artista y la cancion del input
        if (artista.trim() === '' || cancion.trim() === ''){
            //Seteamos a true, ya que no paso la validacion
            guardarError(true);

            return;
        }

        //Reseteamos el valor a false, porque los datos estaban completos
        guardarError(false);

        //Actualizamos en el state de la app principal el input validado
        guardarBusquedaLetra(busqueda)

    }

    return (  
        <div className="bg-info">
            { error ? <p className="alert alert-danger text-center p-2">Todos los campos son obligatorios</p> : null}
            <div className="container">
                <div className="row">                    
                    <form 
                        onSubmit={buscarInformacion}
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>

                    </form>
                </div>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    guardarBusquedaLetra: PropTypes.func.isRequired
}

export default Formulario;