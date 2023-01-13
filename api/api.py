# Python
import re
import json
import uuid
import datetime

# Django
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone, dateformat
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Ojitos369
from ojitos369.utils import get_d, printwln

# User
from app.settings import MYE, prod_mode, ce
from api.models import Gestores, Usuarios, Permisos, Tokens

def validar_token(headers, ahora = timezone.now()):
    old_token = headers.get('token')
    try:
        token = Tokens.objects.get(token=old_token)
        if token:
            inicio = token.inicio
            diff = ahora - inicio
            if diff.seconds > 3600:
                token.delete()
                raise MYE('Token no valido')
            gestor = token.gestor
    except:
        raise MYE('Token no valido')
    permisos = Permisos.objects.filter(gestor = gestor)
    permisos = [p.permiso for p in permisos]
    return gestor, permisos


def upgrade_usuario(usuario, data, mode):
    usuario.nombre = get_d(data, 'nombre', none = True)
        
    curp = get_d(data, 'curp', none = True)
    if not curp and mode == 'upgrade':
        curp = usuario.curp
    if not curp:
        raise MYE('Por favor Proporcione CURP')
    curp = str(curp).upper()
    if len(curp) != 18:
        raise MYE('El CURP debe de tener 18 caracteres')
    pattern = '''^[A-Z&Ñ]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'''
    if not re.match(pattern, curp):
        raise MYE('El formato del CURP no es correcto')
    usuario.curp = curp
    
    cp = get_d(data, 'cp', none = True)
    if not cp and mode == 'upgrade':
        cp = usuario.cp
    if not cp:
        raise MYE('Por favor Proporcione CP')
    cp = str(cp).upper()
    if len(cp) != 5:
        raise MYE('El CP debe de tener 5 digitos')
    pattern = '''^\d{5}$'''
    if not re.match(pattern, cp):
        raise MYE('El formato del CP no es correcto')
    usuario.cp = int(cp)

    rfc = get_d(data, 'rfc', none = True)
    if not rfc and mode == 'upgrade':
        rfc = usuario.rfc
    if not rfc:
        raise MYE('Por favor Proporcione RFC')
    rfc = str(rfc).upper()
    if len(rfc) not in (12,13):
        raise MYE('El RFC debe de tener 12 o 13 digitos')
    pattern = '''^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$'''
    if not re.match(pattern, rfc):
        raise MYE('El formato del RFC no es correcto. Asegurese de incluir homoclave')
    usuario.rfc = rfc
    
    
    telefono = get_d(data, 'telefono', none = True)
    if not telefono and mode == 'upgrade':
        telefono = usuario.telefono
    if not telefono:
        raise MYE('Por favor Proporcione TELEFONO')
    telefono = str(telefono).upper()
    if len(telefono) != 10:
        raise MYE('El TELEFONO debe de tener 10 digitos')
    pattern = '''^\d{10}$'''
    if not re.match(pattern, telefono):
        raise MYE('El formato del TELEFONO no es correcto')
    usuario.telefono = int(telefono)

    return usuario


@api_view(['GET'])
def login(request):
    status = 200
    response = {}
    try:
        headers = request.headers
        old_token = headers.get('token')
        username = headers.get('username')
        password = headers.get('password')
        ahora = timezone.now()

        # Validando el inicio de sesion por token pasado o por usuario y contraseña
        if old_token:
            gestor, permisos = validar_token(request.headers, ahora)
        else:
            try:
                gestor = Gestores.objects.get(username=username)
                if gestor:
                    if not check_password(password, gestor.password):
                        raise MYE('Usuario o Contraseña no valido')
            except:
                raise MYE('Usuario o Contraseña no valido')

        new_token = uuid.uuid4()
        tokens = Tokens.objects.filter(gestor = gestor)
        for token in tokens:
            token.delete()
        token = Tokens(gestor = gestor, token = new_token)
        token.save()

        response = {
            'token': new_token,
            'username': username,
            'inicio': dateformat.format(ahora, 'd-m-Y H:i:s'),
            'vencimiento': dateformat.format(ahora + datetime.timedelta(hours=1), 'd-m-Y H:i:s'),
        }
        
    except MYE as e:
        error = ce.show_error(e)
        print(error)
        status = 400
        response = {
            'message': str(e),
        }
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)


@api_view(['GET'])
def obtener_usuarios(request):
    status = 200
    response = {}
    ahora = timezone.now()
    try:
        gestor, permisos = validar_token(request.headers, ahora)
        
        if not any(p in ('adm', 'lec') for p in permisos):
            status = 403
            raise MYE('No tiene permisos para esta accion')
        
        usuarios = Usuarios.objects.all()
        data = []
        for u in usuarios:
            model = u.to_dict()
            if 'dir' in permisos:
                # del model['nombre']
                del model['curp']
                del model['rfc']
                del model['fecha']
            data.append(model)
        
        response = {
            'usuarios': data,
        }
    except MYE as e:
        response = {
            'message': str(e),
        }
        status = 400 if status == 200 else status
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)


@api_view(['POST'])
def agregar_usuario(request):
    status = 200
    response = {}
    ahora = timezone.now()
    try:
        try:
            data = json.loads(request.body.decode('utf-8'))
        except:
            status = 400
            raise MYE('Los datos se deben de pasar por json')

        gestor, permisos = validar_token(request.headers, ahora)
        
        if not any(p in ('adm', 'add') for p in permisos):
            status = 403
            raise MYE('No tiene permisos para esta accion')
        
        usuario = Usuarios()
        usuario = upgrade_usuario(usuario, data, 'add')
        usuario.save()
        
        response = {
            'message': 'usuario guardado correctamente',
        }
        status = 201
    except MYE as e:
        response = {
            'message': str(e),
        }
        status = 400 if status == 200 else status
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)


@api_view(['POST', 'PUT', 'PATCH'])
def actualizar_usuario(request):
    status = 200
    response = {}
    ahora = timezone.now()
    try:
        try:
            data = json.loads(request.body.decode('utf-8'))
        except:
            status = 400
            raise MYE('Los datos se deben de pasar por json')

        gestor, permisos = validar_token(request.headers, ahora)
        
        if not any(p in ('adm', 'esc') for p in permisos):
            status = 403
            raise MYE('No tiene permisos para esta accion')

        try:
            usuario = Usuarios.objects.get(id = data['id'])
        except:
            raise MYE('El usuario no existe, asegurese que el id es correcto')

        if 'dir' in permisos:
            if 'nombre' in data: del data['nombre']
            if 'curp' in data: del data['curp']
            if 'rfc' in data: del data['rfc']
            if 'fecha' in data: del data['fecha']

        usuario = upgrade_usuario(usuario, data, 'upgrade')
        usuario.save()
        
        response = {
            'message': 'usuario actualizado correctamente',
        }
    except MYE as e:
        response = {
            'message': str(e),
        }
        status = 400 if status == 200 else status
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)


@api_view(['POST', 'DELETE'])
def eliminar_usuario(request):
    status = 200
    response = {}
    ahora = timezone.now()
    try:
        try:
            data = json.loads(request.body.decode('utf-8'))
        except:
            status = 400
            raise MYE('Los datos se deben de pasar por json')

        gestor, permisos = validar_token(request.headers, ahora)
        
        if 'adm' not in permisos:
            status = 403
            raise MYE('No tiene permisos para esta accion')

        try:
            usuario = Usuarios.objects.get(id = data['id'])
        except:
            raise MYE('El usuario no existe, asegurese que el id es correcto')

        usuario.delete()

        response = {
            'message': 'usuario eliminado correctamente',
        }
    except MYE as e:
        response = {
            'message': str(e),
        }
        status = 400 if status == 200 else status
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)


@api_view(['POST'])
def base_api(request):
    status = 200
    response = {}
    try:
        try:
            data = json.loads(request.body.decode('utf-8'))
        except:
            raise MYE('Sin datos por post')
    except MYE as e:
        response = {
            'message': str(e),
        }
        status = 400
    except Exception as e:
        error = ce.show_error(e)
        print(error)
        response = {
            'message': str(e),
        }
        status = 500
    return Response(response, status=status)
