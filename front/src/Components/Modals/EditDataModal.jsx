import React from 'react';
import { AllContext } from '../../App/MyContext';

function EditDataModal(props) {
    const { ls, Icons, s, f } = React.useContext(AllContext);
    
    const ztyle = props.zindex ? {zIndex: props.zindex} : {};

    const close = () => {
        f.upgradeLvl1('data', 'edit', {});
        f.upgradeLvl2('modals', 'data', 'edit', false);
    }
    const closeModal = e => {
        if (e.key === 'Escape') {
            e.preventDefault();
            
            close();
        }
    }
    React.useEffect(() => {
        document.addEventListener('keydown', closeModal);
        return () => {
            document.removeEventListener('keydown', closeModal);
        }

    }, [s.modals?.data?.edit]);
    return (
        <div
            className="modal-info"
            style={{...ztyle}}
            onClick={close}
            >
            <div 
                className={`container modal-container modal-container-50 pb-5 pt-5 modal-${ls.theme}`}
                style={{...s.styles.basic}}
                onClick={e => e.stopPropagation()}
                >
                Content Here
                <div className="row justify-content-around">
                    <form 
                        className="row justify-content-around mt-5"
                        id="form-edit-cliente"
                        onSubmit={e => {
                            e.preventDefault();
                            f.data.edit();
                            close();
                        }}>
                        <div className="row justify-content-center mt-3">
                            <div 
                                className='col-10 col-md-4 form-group'
                                >
                                <label htmlFor="login-nombre">Nombre</label>
                                    <input 
                                    type="text" 
                                    className='form-control myinput'
                                    name="nombre"
                                    id="login-nombre"
                                    value={s.data?.edit?.nombre || ''}
                                    onChange={e => f.upgradeLvl2('data','edit',e.target.name,e.target.value)}
                                    />
                            </div>
                            {!!s?.data?.edit?.curp && <div 
                                className='col-10 col-md-4 form-group'
                                >
                                <label htmlFor="login-curp">Curp</label>
                                    <input 
                                    type="text" 
                                    className='form-control myinput'
                                    name="curp"
                                    id="login-curp"
                                    value={s.data?.edit?.curp || ''}
                                    onChange={e => f.upgradeLvl2('data','edit',e.target.name,e.target.value)}
                                    />
                            </div>}
                            {!!s?.data?.edit?.cp && <div 
                                className='col-10 col-md-4 form-group'
                                >
                                <label htmlFor="login-cp">cp</label>
                                    <input 
                                    type="text" 
                                    className='form-control myinput'
                                    name="cp"
                                    id="login-cp"
                                    value={s.data?.edit?.cp || ''}
                                    onChange={e => f.upgradeLvl2('data','edit',e.target.name,e.target.value)}
                                    />
                            </div>}
                            {!!s?.data?.edit?.rfc && <div 
                                className='col-10 col-md-4 form-group'
                                >
                                <label htmlFor="login-rfc">rfc</label>
                                    <input 
                                    type="text" 
                                    className='form-control myinput'
                                    name="rfc"
                                    id="login-rfc"
                                    value={s.data?.edit?.rfc || ''}
                                    onChange={e => f.upgradeLvl2('data','edit',e.target.name,e.target.value)}
                                    />
                            </div>}
                            {!!s?.data?.edit?.telefono && <div 
                                className='col-10 col-md-4 form-group'
                                >
                                <label htmlFor="login-telefono">telefono</label>
                                    <input 
                                    type="text" 
                                    className='form-control myinput'
                                    name="telefono"
                                    id="login-telefono"
                                    value={s.data?.edit?.telefono || ''}
                                    onChange={e => f.upgradeLvl2('data','edit',e.target.name,e.target.value)}
                                    />
                            </div>}
                        </div>
                        <div className="row justify-content-center mt-3">
                            <button 
                                type="submit" 
                                className={`btn col-10 col-md-4 mt-5 mb-5 btn-primary`}
                                >
                                Guardar
                            </button>
                        </div>
                        <span className='manita' 
                            onClick={() => {
                                f.data.delete();
                                close();
                            }}>
                            Delete
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { EditDataModal };