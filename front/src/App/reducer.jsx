import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

let link = '';
link = 'http://localhost:8000/'

const actionTypes = {
    levels: {
        upgradeLvl0: 'LVL0_UPGRADE',
        setLvl0: 'LVL0_SET',
        upgradeLvl1: 'LVL1_UPGRADE',
        setLvl1: 'LVL1_SET',
        upgradeLvl2: 'LVL2_UPGRADE',
        setLvl2: 'LVL2_SET',
        upgradeLvl3: 'LVL3_UPGRADE',
        setLvl3: 'LVL3_SET',
        upgradeLvl4: 'LVL4_UPGRADE',
        setLvl4: 'LVL4_SET',
        upgradeLvl5: 'LVL5_UPGRADE',
        setLvl5: 'LVL5_SET',
    }
}

const reducerObject =  (state, actionTypes, payload = null) => ({

    // ------------------------------------------------------------------ //
    // ---------------------------   LEVELS   --------------------------- //
    // ------------------------------------------------------------------ // 
    [actionTypes.levels.upgradeLvl0]: {
        ...state,
        ...payload?.value,
    },
    [actionTypes.levels.setLvl0]: payload?.value,


    [actionTypes.levels.upgradeLvl1]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1],
            ...payload?.value,
        },
    },
    [actionTypes.levels.setLvl1]: {
        ...state,
        [payload?.lvl1]: payload?.value,
    },

    [actionTypes.levels.upgradeLvl2]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                ...payload?.value,
            }
        }
    },
    [actionTypes.levels.setLvl2]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: payload?.value,
        }
    },

    [actionTypes.levels.upgradeLvl3]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: {
                    ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3] || {},
                    ...payload?.value,
                }
            }
        }
    },
    [actionTypes.levels.setLvl3]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: payload?.value,
            }
        }
    },

    [actionTypes.levels.upgradeLvl4]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: {
                    ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3] || {},
                    [payload?.lvl4]: {
                        ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3]?.[payload?.lvl4] || {},
                        ...payload?.value,
                    }
                }
            }
        }
    },
    [actionTypes.levels.setLvl4]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: {
                    ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3] || {},
                    [payload?.lvl4]: payload?.value,
                }
            }
        }
    },

    [actionTypes.levels.upgradeLvl5]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: {
                    ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3] || {},
                    [payload?.lvl4]: {
                        ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3]?.[payload?.lvl4] || {},
                        [payload?.lvl5]: {
                            ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3]?.[payload?.lvl4]?.[payload?.lvl5] || {},
                            ...payload?.value,
                        }
                    }
                }
            }
        }
    },
    [actionTypes.levels.setLvl5]: {
        ...state,
        [payload?.lvl1]: {
            ...state[payload?.lvl1] || {},
            [payload?.lvl2]: {
                ...state[payload?.lvl1]?.[payload?.lvl2] || {},
                [payload?.lvl3]: {
                    ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3] || {},
                    [payload?.lvl4]: {
                        ...state[payload?.lvl1]?.[payload?.lvl2]?.[payload?.lvl3]?.[payload?.lvl4] || {},
                        [payload?.lvl5]: payload?.value,
                    }
                }
            }
        }
    },
    
})

const reducer = (state, action) => {
    const type = action.type;
    const payload = action.payload || null;

    if (reducerObject(state, actionTypes, payload)[type]) {
        return reducerObject(state, actionTypes, payload)[type];
    }
    return state;
}

class functions {
    constructor(d, s) {
        this.d = d;
        this.s = s;
    }

    login = {
        login: () => {
            const url = link + 'api/login/';
            const data = this.s?.login;
            const config = {
                headers:{
                    ...data,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH',
                }
            };

            axios.get(url, config)
            .then((response) => {
                this.upgradeLvl0('logged', true);
                this.upgradeLvl0('token', response.data.token);
                this.upgradeLvl0('login', {});
            })
            .catch((error) => {
                console.log(error);
                const message = error.response.data.message;
                if (message === 'Token no valido') {
                    this.upgradeLvl0('logged', false);
                    this.upgradeLvl0('token', null);
                }
            })
        }
    }

    data = {
        getData: () => {
            const url = link + 'api/obtener_usuarios/';
            const config = {
                headers:{
                    token: this.s?.token,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH',
                }
            };

            axios.get(url, config)
            .then((response) => {
                this.upgradeLvl1('data', 'usuarios', response.data.usuarios);
            })
            .catch((error) => {
                console.log(error);
                const message = error.response.data.message;
                this.upgradeLvl1('data','error',message);
                if (message === 'Token no valido') {
                    this.upgradeLvl0('logged', false);
                    this.upgradeLvl0('token', null);
                }
            })
        },
        edit: () => {
            const url = link + 'api/actualizar_usuario/';
            const config = {
                headers:{
                    token: this.s?.token,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH',
                }
            };
            let data = this.s?.data?.edit

            axios.put(url, data, config)
            .then((response) => {
                this.data.getData();
                this.upgradeLvl1('data', 'edit', {});
            })
            .catch((error) => {
                console.log(error);
                const message = error.response.data.message;
                this.upgradeLvl1('data','error',message);
                if (message === 'Token no valido') {
                    this.upgradeLvl0('logged', false);
                    this.upgradeLvl0('token', null);
                }
                this.upgradeLvl1('data', 'edit', {});
            })
        },
        add: () => {
            const url = link + 'api/agregar_usuario/';
            const config = {
                headers:{
                    token: this.s?.token,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH',
                }
            };
            let data = this.s?.data?.add || {};

            axios.post(url, data, config)
            .then((response) => {
                this.data.getData();
                this.upgradeLvl1('data', 'edit', {});
            })
            .catch((error) => {
                console.log(error);
                const message = error.response.data.message;
                this.upgradeLvl1('data','error',message);
                if (message === 'Token no valido') {
                    this.upgradeLvl0('logged', false);
                    this.upgradeLvl0('token', null);
                }
                this.upgradeLvl1('data', 'edit', {});
            })
        },
        delete: () => {
            const url = link + 'api/eliminar_usuario/';
            const config = {
                headers:{
                    token: this.s?.token,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH',
                }
            };
            let data = this.s?.data?.edit

            axios.post(url, data, config)
            .then((response) => {
                this.data.getData();
                this.upgradeLvl1('data', 'edit', {});
            })
            .catch((error) => {
                console.log(error);
                const message = error.response.data.message;
                this.upgradeLvl1('data','error',message);
                if (message === 'Token no valido') {
                    this.upgradeLvl0('logged', false);
                    this.upgradeLvl0('token', null);
                }
                this.upgradeLvl1('data', 'edit', {});
            })
        }
    }
    
    // ------------------------------------------------------------------ //
    // ---------------------------   LEVELS   --------------------------- //
    // ------------------------------------------------------------------ //

    upgradeLvl0 = (field_name, value) => {
        const data = {
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl0, payload: data });
    }

    setLvl0 = (value) => {
        const data = {
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl0, payload: data });
    }

    resetLvl0 = () => {
        const data = {
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl0, payload: data });
    }

    upgradeLvl1 = (name1, field_name, value) => {
        const data = {
            lvl1: name1,
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl1, payload: data });
    }

    setLvl1 = (name1, value) => {
        const data = {
            lvl1: name1,
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl1, payload: data });
    }

    resetLvl1 = (name) => {
        const data = {
            lvl1: name,
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl1, payload: data });
    }

    upgradeLvl2 = (name1, name2, field_name, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl2, payload: data });
    }

    setLvl2 = (name1, name2, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl2, payload: data });
    }

    resetLvl2 = (name1, name2) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl2, payload: data });
    }

    upgradeLvl3 = (name1, name2, name3, field_name, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl3, payload: data });
    }

    setLvl3 = (name1, name2, name3, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl3, payload: data });
    }

    resetLvl3 = (name1, name2, name3) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl3, payload: data });
    }

    upgradeLvl4 = (name1, name2, name3, name4, field_name, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl4, payload: data });
    }

    setLvl4 = (name1, name2, name3, name4, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl4, payload: data });
    }

    resetLvl4 = (name1, name2, name3, name4) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl4, payload: data });
    }

    upgradeLvl5 = (name1, name2, name3, name4, name5, field_name, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            lvl5: name5,
            value: {[field_name]: value},
        }
        this.d({ type: actionTypes.levels.upgradeLvl5, payload: data });
    }

    setLvl5 = (name1, name2, name3, name4, name5, value) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            lvl5: name5,
            value: value,
        }
        this.d({ type: actionTypes.levels.setLvl5, payload: data });
    }

    resetLvl5 = (name1, name2, name3, name4, name5) => {
        const data = {
            lvl1: name1,
            lvl2: name2,
            lvl3: name3,
            lvl4: name4,
            lvl5: name5,
            value: {},
        }
        this.d({ type: actionTypes.levels.setLvl5, payload: data });
    }

}

export { reducer, actionTypes, functions };