import React from 'react';
import { AllContext } from '../../App/MyContext';


function Add() {
    const { ls, lf, s, f, Icons } = React.useContext(AllContext);
    const icons = new Icons();
    
    return (
        <React.Fragment>
            <hr />
            <form 
                className="row justify-content-around mt-5"
                id="form-edit-cliente"
                onSubmit={e => {
                    e.preventDefault();
                    f.upgradeLvl1('data','error',null);
                    f.data.add();
                }}>
                <div className="row justify-content-center mt-3">
                    <div 
                        className='col-10 col-md-4 form-group mt-5'
                        >
                        <label htmlFor="login-nombre">Nombre</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="nombre"
                            id="login-nombre"
                            value={s.data?.add?.nombre || ''}
                            onChange={e => f.upgradeLvl2('data','add',e.target.name,e.target.value)}
                            />
                    </div>
                    <div 
                        className='col-10 col-md-4 form-group mt-5'
                        >
                        <label htmlFor="login-curp">Curp</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="curp"
                            id="login-curp"
                            value={s.data?.add?.curp || ''}
                            onChange={e => f.upgradeLvl2('data','add',e.target.name,e.target.value)}
                            />
                    </div>
                    <div 
                        className='col-10 col-md-4 form-group mt-5'
                        >
                        <label htmlFor="login-cp">cp</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="cp"
                            id="login-cp"
                            value={s.data?.add?.cp || ''}
                            onChange={e => f.upgradeLvl2('data','add',e.target.name,e.target.value)}
                            />
                    </div>
                    <div 
                        className='col-10 col-md-4 form-group mt-5'
                        >
                        <label htmlFor="login-rfc">rfc</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="rfc"
                            id="login-rfc"
                            value={s.data?.add?.rfc || ''}
                            onChange={e => f.upgradeLvl2('data','add',e.target.name,e.target.value)}
                            />
                    </div>
                    <div 
                        className='col-10 col-md-4 form-group mt-5'
                        >
                        <label htmlFor="login-telefono">telefono</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="telefono"
                            id="login-telefono"
                            value={s.data?.add?.telefono || ''}
                            onChange={e => f.upgradeLvl2('data','add',e.target.name,e.target.value)}
                            />
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <button 
                        type="submit" 
                        className={`btn col-10 col-md-4 mt-5 mb-5 btn-primary`}
                        >
                        Guardar
                    </button>
                </div>
                {!!s?.data?.error && 
                <small className='text-danger'>
                    {s?.data?.error}
                </small>}
            </form>
        </React.Fragment>
    )
}

export { Add };