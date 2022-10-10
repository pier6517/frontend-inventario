import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMarcasPorId, editarMarca } from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcasUpdate = () => {

    const { marcasId = '' } = useParams();
    const [ marcas, setMarcas ] = useState({});
    const [ valoresForm, setValoresForm ] = useState ({});
    const { nombre = '', estado = '', fechaCreacion = '' } = valoresForm;

    const getMarcas = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text:'Cargando...'
              });
            const { data } = await getMarcasPorId(marcasId);
            console.log(data);
            setMarcas(data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMarcas();
    }, [ marcasId ]);

    useEffect(() => {
            setValoresForm({
                nombre: marcas.nombre,
                estado: marcas.estado,
                fechaCreacion: marcas.fechaCreacion,

            });
    }, [marcas]);


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value}); // spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marcas = {
            nombre, estado, fechaCreacion
         }
         try {
            Swal.fire({
                allowOutsideClick: false,
                text:'Cargando...'
              });
              Swal.showLoading();
                const { data } = await editarMarca( marcasId, marcas);
                console.log(data);
                Swal.close();
         } catch (error) {
            console.log(error);
            console.log(error.response.data)
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
              mensaje = error.response.data;
            } else {
              mensaje = 'Ocurrió un error, intente de nuevo';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }    

        return (
            
            <div className='container-fluid mt-3 mb-2'>
                <div className='card'>
                    <div className='card-header'>
                        <h5 className='card-title'>Detalle </h5>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-4'>
                            </div>
                            <div className='col-md-8'>
                            <form onSubmit={(e) => handleOnSubmit(e)}> 
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input type="text" name='nombre' 
                                            required
                                            value={nombre} 
                                            onChange={ (e) => handleOnChange(e)}x
                                            className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                        <label className="form-label">Estado</label>
                                        <input type="text" name='estado' 
                                        required
                                        value={estado} 
                                        onChange={ (e) => handleOnChange(e)}
                                        className="form-control" />
                                        </div>  
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                        <label className="form-label">Fecha Creación</label>
                                        <input type="Date" name='fechaCreacion' 
                                        required
                                        value={fechaCreacion} 
                                        onChange={ (e) => handleOnChange(e)}
                                        className="form-control" />
                                        </div>  
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <button className='btn btn-secondary'>Guardar</button>
                                        </div>
                                    </div> 
                                </div>
                            </form>
                            </div>
                        </div> 
                        
                    </div>
                </div>
            </div>
            
)     
}
