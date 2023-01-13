import React from 'react';
import { AllContext } from '../../App/MyContext';
import { EditDataModal } from '../Modals/EditDataModal';

function Data() {
    const { ls, lf, s, f, Icons } = React.useContext(AllContext);
    const icons = new Icons();
    
    React.useEffect(() => {
        f.data.getData();
    }, []);
    return (
        <div className="container mt-5">
            {s?.data?.usuarios?.map((item, index) => {
                return (
                    <div key={index} className="row manita"
                        onClick={() => {
                            f.upgradeLvl1('data', 'edit', item);
                            f.upgradeLvl2('modals', 'data', 'edit', true);
                        }}
                    >
                        {!!item.id && <p className='col'>id: {item.id}</p>}
                        {!!item.nombre && <p className='col'>nombre: {item.nombre}</p>}
                        {!!item.curp && <p className='col'>curp: {item.curp}</p>}
                        {!!item.cp && <p className='col'>cp: {item.cp}</p>}
                        {!!item.rfc && <p className='col'>rfc: {item.rfc}</p>}
                        {!!item.telefono && <p className='col'>telefono: {item.telefono}</p>}
                        {!!item.fecha && <p className='col'>fecha: {item.fecha}</p>}
                    </div>
                )
            })}
            {!!s?.modals?.data?.edit && <EditDataModal />}
        </div>
    )
}

export { Data };