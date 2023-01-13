import os
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        command = ""
        command += "pip freeze > requirements.txt\n"
        command += "sed -i 's/==/>=/g' requirements.txt\n"
        command += "pip install -r requirements.txt --upgrade\n"
        command += "pip freeze > requirements.txt\n"

        os.system(command)


"""
pip freeze > requirements.txt
sed -i 's/==/>=/g' requirements.txt
pip install -r requirements.txt --upgrade
pip freeze > requirements.txt

"""