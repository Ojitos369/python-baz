# Django
from django.db import models
from django.utils import dateformat
from django.forms.models import model_to_dict

# Create your models here.

class Gestores(models.Model):
    nombre = models.CharField(max_length=250, default=None, null=True, blank=True)
    username = models.CharField(max_length=250, default=None, null=True, blank=True)
    password = models.CharField(max_length=250, default=None, null=True, blank=True)

    def to_dict(self):
        model = model_to_dict(self)
        del model['password']
        return model

    class Meta:
        db_table = 'baz_gestores'


class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, default=None, null=True, blank=True)
    curp = models.CharField(max_length=250, default=None, null=True, blank=True)
    cp = models.IntegerField(default=None, null=True, blank=True)
    rfc = models.CharField(max_length=250, default=None, null=True, blank=True)
    telefono = models.IntegerField(default=None, null=True, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)
    
    def to_dict(self):
        model = model_to_dict(self)
        model['fecha'] = dateformat.format(self.fecha, 'd-m-Y')
        return model
        
    class Meta:
        db_table = 'baz_usuarios'


class Permisos(models.Model):
    gestor = models.ForeignKey(Gestores, models.DO_NOTHING, default=None, null=True, blank=True)
    permiso = models.CharField(max_length=250, default=None, null=True, blank=True)
    
    def to_dict(self):
        gestor = self.gestor
        self.gestor = None
        model = model_to_dict(self)
        if gestor:
            gestor = model_to_dict(gestor)
            del gestor['password']
            model['gestor'] = gestor
        return model

    class Meta:
        db_table = 'baz_permisos'


class Tokens(models.Model):
    gestor = models.ForeignKey(Gestores, models.DO_NOTHING, default=None, null=True, blank=True)
    token = models.CharField(max_length=250, default=None, null=True, blank=True)
    inicio = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'baz_tokens'