### Activar entorno e instalar los requirements  
```shell
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### Hacer las migraciones  
```shell
python manage.py make migrations api
python manage.py migrate
```

### Correr el commando para agregar los gestores  
```shell
python manage.py add_init_data
```

### Credenciales de Gestores creadas  
```json
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
```

### Correr el server  
```shell
python manage.py runserver
```


### Peticiones
**Para las peticiones es necesario mandar un token valido en los headers, solo en Login es opcional**  
## Login (GET)
* Para obtener token hacer la peticion al end point `api/login/`  
* pasar el usuario y contraseña por headers  
![login 1](http://ojitos369.com/media/python-baz/login-user-pass.png)  
o bien con el token anterior  
![login 2](http://ojitos369.com/media/python-baz/login-token.png)  

* Al generar un nuevo token el anterior se eliminara y se reiniciara el tiempo de vencimiento  
  
  
## Agregar Usuario (POST)  
* Para agregar usuario el endpoint es `api/agregar_usuario/`  
* Los datos de usuario a agregar deben de pasarse en json  
![add](http://ojitos369.com/media/python-baz/add-data.png)  
  
  
## Consultar Usuarios (GET)  
* Para agregar usuario el endpoint es `api/obtener_usuarios/`  
![get](http://ojitos369.com/media/python-baz/get-data.png)  
  
  
## Agregar Editar (POST/PUT/PATCH)  
* Para agregar usuario el endpoint es `api/actualizar_usuario/`  
* Los datos de usuario a agregar deben de pasarse en json  
* Es necesario el id del usuario  
![edit](http://ojitos369.com/media/python-baz/edit-data.png)  
  

## Agregar Eliminar (POST/DELETE)  
* Para agregar usuario el endpoint es `api/eliminar_usuario/`  
* Es necesario el id del usuario  
![edit](http://ojitos369.com/media/python-baz/delete-data.png)  


### Vista de prueba  
``  

### Documentacion  
`/doc/`  

