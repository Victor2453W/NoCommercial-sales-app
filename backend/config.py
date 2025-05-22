import os

class Config:
    # Получаем secret_key из переменной окружения
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key')  # Значение по умолчанию для локальной разработки
