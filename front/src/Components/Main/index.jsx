import React from 'react';
import { AllContext } from '../../App/MyContext';
import { ModalThemeChanged } from '../Modals/ModalThemeChanged';

import { Login } from './Login';
import { Data } from './Data';
import { Add } from './Add';

function Main() {
    const { ls, lf, s, f, Icons } = React.useContext(AllContext);
    const icons = new Icons();
    
    return (
        <React.Fragment>
            {!!s?.logged && 
            <div className='row mt-5'>
                <p className='text-end pe-5'>
                    <span 
                        className='manita'
                        onClick={() => {
                            f.upgradeLvl0('logged', false);
                            f.upgradeLvl0('token', null);
                            f.upgradeLvl0('data', null);
                        }}
                    >
                        salir
                    </span>
                </p>

            </div>}
            {!s?.logged && <Login />}
            {!!s?.logged && <Data />}
            {!!s?.logged && <Add />}
        </React.Fragment>
    )
}

export { Main };