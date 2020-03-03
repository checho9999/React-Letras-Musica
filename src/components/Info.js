import React from 'react';
import PropTypes from 'prop-types';

const Info = ( { info } ) => {

    // si el objeto llega vacio no se ejecuta nada
    if(Object.keys(info).length === 0 ) return null;

    //Agregue los chequeos de los info.strFacebook, strTwitter y strLastFMChart, ya que por ejemplo el strLastFMChart de Madonna viene null, entonces el link no apunta a ningun lado    
    //Extraigo los datos del artista
    const { strArtistThumb, strGenre, strBiographyES } = info;
    
    return ( 
        <div className="card border-light">
            <div className="card-header bg-primary text-light font-weight-bold">
                Información Artista
            </div>
            <div className="card-body">
                <img src={strArtistThumb} alt="Logo Artista" />
                <p className="card-text">Género: {strGenre}</p>
                <h2 className="card-text">Biografía:</h2>
                <p className="card-text">{strBiographyES}</p>
                <p className="card-text">
                { info.strFacebook ? <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                </a> : null }
                { info.strTwitter ? <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a> : null } 
                { info.strLastFMChart ?
                <a href={`${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-lastfm"></i>
                </a> : null }
                </p>
            </div>
        </div>
     );
}

Info.propTypes = {
    info: PropTypes.object.isRequired
}
 
export default Info;