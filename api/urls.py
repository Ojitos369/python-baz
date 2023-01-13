from django.urls import path

from api.api import login, obtener_usuarios, agregar_usuario, actualizar_usuario, eliminar_usuario

app_name = 'api'
urlpatterns = [
    path('login/', login, name='login'),
    path('obtener_usuarios/', obtener_usuarios, name='obtener_usuarios'),
    path('actualizar_usuario/', actualizar_usuario, name='actualizar_usuario'),
    path('agregar_usuario/', agregar_usuario, name='agregar_usuario'),
    path('eliminar_usuario/', eliminar_usuario, name='eliminar_usuario'),
]