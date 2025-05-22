import requests

# Делаем запрос к API (пример)
response = requests.get('https://682c6350d29df7a95be6d211.mockapi.io/products/products')
data = response.json()  # Автоматический парсинг JSON

# Обработка данных
products = data  # Достаем список товаров

for product in products:
    print(f"{product['id']} - {product['price']}Р")