import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  //Ponemos en el state la busqueda valida y actualizada desde el Formulario
  const [ busquedaletra, guardarBusquedaLetra ] = useState({});
  //Ponemos en el state la letra de la cancion obtenida desde la API
  const [ letra, guardarLetra ] = useState('');
  //Ponemos en el state la info del artista obtenida desde la API
  const [ info, guardarInfo ] = useState({});

  useEffect(() => {
    //chequeamos que la busqueda no llegue vacia
    if (Object.keys(busquedaletra).length === 0 ) return;
    
    const consultarApiLetra = async () => {

      //extraemos los datos del state
      const { artista, cancion } = busquedaletra;      
      
      //obtenemos la letra desde la API
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      //obtenemos la informacion del artista desde la API
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //esto lo agrego yo para que no me tire "unhandled error 404" al consultar un artista valido con una cancion no encontrada      
      try{
        //Esto es para que ninguna de las busquedas se quedan esperando a la otra y viceversa...inician al mismo tiempo
        const [ letra, informacion ] = await Promise.all([
          axios(url),
          axios(url2)
        ]);     

        //esto lo agrego yo para que no me tire error al consultar una data con cancion === null
        if (letra.data.artists !== null ){        
          guardarLetra(letra.data.lyrics);
          //console.log(letra.data.lyrics);
        }
        else{
          //le muevo el valor por defecto para que el componente Cancion no se muestre
          guardarLetra('');  
        }     

        //esto lo agrego yo para que no me tire error al consultar una data con artist === null, por ejemplo "guns and roses" que en la API esta como "Guns N' Roses"
        if (informacion.data.artists !== null ){        
          guardarInfo(informacion.data.artists[0]);
          //console.log(informacion.data.artists[0])
        }
        else{
           //le muevo el valor por defecto para que el componente Info no se muestre
          guardarInfo({});  
        } 
        
      } 
      // Aca trato el "unhandled error 404"
      catch(e){
        console.log(e.name + ": " + e.message);
      }

      //esto lo agrego yo, porque al parecer se queda llamando todo el tiempo a la API
      guardarBusquedaLetra({});

    }

    consultarApiLetra();

  }, [ busquedaletra, info ]);

  return (
    <Fragment>

        <Formulario
          guardarBusquedaLetra={guardarBusquedaLetra}      
        />
        
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Info 
                info={info}
              />
            </div>
            <div className="col-md-6">
              <Cancion 
                letra={letra}
              />
            </div>
          </div>
        </div>

    </Fragment>
  );
}

export default App;
