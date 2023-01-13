import React from 'react';
import { AllContext } from '../../App/MyContext';
import { ModalThemeChanged } from '../Modals/ModalThemeChanged';

function Login() {
    const { ls, lf, s, f, Icons } = React.useContext(AllContext);
    const icons = new Icons();
    
    return (
        <React.Fragment>
            <form 
                className="row justify-content-around mt-5"
                id="form-edit-cliente"
                onSubmit={e => {
                    if (!(!!s?.login?.password && !!s?.login?.username)) {
                        return;
                    }
                    e.preventDefault();
                    f.login.login();
                }}>
                <div className="row justify-content-center mt-3">
                    <div 
                        className='col-10 col-md-4 form-group'
                        >
                        <label htmlFor="login-username">Username</label>
                            <input 
                            type="text" 
                            className='form-control myinput'
                            name="username"
                            id="login-username"
                            value={s.login?.username || ''}
                            onChange={e => f.upgradeLvl1('login',e.target.name,e.target.value)}
                            />
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div 
                        className='col-10 col-md-4 form-group'
                        >
                        <label htmlFor="login-password">Password</label>
                            <input 
                            type="password" 
                            className='form-control myinput'
                            name="password"
                            id="login-password"
                            value={s.login?.password || ''}
                            onChange={e => f.upgradeLvl1('login',e.target.name,e.target.value)}
                            />
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <button 
                        type="submit" 
                        className={`btn col-10 col-md-4 mt-5 mb-5 ${(!!s?.login?.password && !!s?.login?.username) ? 'btn-primary' : 'disabled btn-secondary'}`}
                        >
                        Guardar
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export { Login };