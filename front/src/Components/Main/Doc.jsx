import React from 'react';
import { AllContext } from '../../App/MyContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const t = "`";
const documentacion = `
### Activar entorno e instalar los requirements  
${t}${t}${t}shell
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
${t}${t}${t}

### Hacer las migraciones  
${t}${t}${t}shell
python manage.py make migrations api
python manage.py migrate
${t}${t}${t}

### Correr el commando para agregar los gestores  
${t}${t}${t}shell
python manage.py add_init_data
${t}${t}${t}

### Credenciales de Gestores creadas  
${t}${t}${t}json
{
    "admin": {
        "username": "admin",
        "password": "admin",
        "permisos": "todos"
    },
    lectura: {
        "username": "lectura",
        "password": "lectura",
        "permisos": "lectura de datos generales"
    },
    escritura: {
        "username": "escritura",
        "password": "escritura",
        "permisos": "lectura y escritura de datos generales"
    },
    direccion: {
        "username": "direccion",
        "password": "direccion",
        "permisos": "lectura y escritura de datos de direccion (codigo postal, telefono)"
    },
}
${t}${t}${t}

### Correr el server  
${t}${t}${t}shell
python manage.py runserver
${t}${t}${t}


### Peticiones
**Para las peticiones es necesario mandar un token valido en los headers, solo en Login es opcional**  
## Login (GET)
* Para obtener token hacer la peticion al end point ${t}api/login/${t}  
* pasar el usuario y contraseña por headers  
![login 1](http://ojitos369.com/media/python-baz/login-user-pass.png)  
o bien con el token anterior  
![login 2](http://ojitos369.com/media/python-baz/login-token.png)  

* Al generar un nuevo token el anterior se eliminara y se reiniciara el tiempo de vencimiento  


## Agregar Usuario (POST)  
* Para agregar usuario el endpoint es ${t}api/agregar_usuario/${t}  
* Los datos de usuario a agregar deben de pasarse en json  
![add](http://ojitos369.com/media/python-baz/add-data.png)  


## Consultar Usuarios (GET)  
* Para agregar usuario el endpoint es ${t}api/obtener_usuarios/${t}  
![get](http://ojitos369.com/media/python-baz/get-data.png)  


## Agregar Editar (POST/PUT/PATCH)  
* Para agregar usuario el endpoint es ${t}api/actualizar_usuario/${t}  
* Los datos de usuario a agregar deben de pasarse en json  
* Es necesario el id del usuario  
![edit](http://ojitos369.com/media/python-baz/edit-data.png)  


## Agregar Eliminar (POST/DELETE)  
* Para agregar usuario el endpoint es ${t}api/eliminar_usuario/${t}  
* Es necesario el id del usuario  
![edit](http://ojitos369.com/media/python-baz/delete-data.png)  

### Vista de prueba  
${t}${t}  

### Documentacion  
${t}/doc/${t}  


`

function Doc() {
    const { ls, lf, s, f, Icons } = React.useContext(AllContext);
    const icons = new Icons();
    
    const CodeBlock = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
                >
                {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                {children}
                </code>
            );
        },
    };
    return (
        <ReactMarkdown 
            className='col-11'
            rehypePlugins={[rehypeRaw]}
            components={CodeBlock}
            >
            {documentacion}
        </ReactMarkdown>
    )
}
export { Doc };