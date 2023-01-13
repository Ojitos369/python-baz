# Python
import os

# Dajngo
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

# User
from api.models import Gestores, Permisos

class Command(BaseCommand):
    def handle(self, *args, **options):
        # Admin
        gestor = Gestores(nombre = 'admin', username = 'admin', password = make_password('admin'))
        gestor.save()
        permiso = Permisos(gestor = gestor, permiso = 'adm')
        permiso.save()

        # Solo Lectura
        gestor = Gestores(nombre = 'lectura', username = 'lectura', password = make_password('lectura'))
        gestor.save()
        permiso = Permisos(gestor = gestor, permiso = 'lec')
        permiso.save()
        
        # Lectura, escritura General
        gestor = Gestores(nombre = 'escritura', username = 'escritura', password = make_password('escritura'))
        gestor.save()
        permiso = Permisos(gestor = gestor, permiso = 'esc')
        permiso.save()
        permiso = Permisos(gestor = gestor, permiso = 'lec')
        permiso.save()

        # Lectura, escritura, direccion
        gestor = Gestores(nombre = 'direccion', username = 'direccion', password = make_password('direccion'))
        gestor.save()
        permiso = Permisos(gestor = gestor, permiso = 'esc')
        permiso.save()
        permiso = Permisos(gestor = gestor, permiso = 'lec')
        permiso.save()
        permiso = Permisos(gestor = gestor, permiso = 'dir')
        permiso.save()

