import json
import requests
import mysql.connector


def fetch_product_list(api_url, headers, limit=10, offset=0):
    # Body для API
    payload = {
        "filter": {
            "status": ["ACTIVE"],
        },
        "limit": limit,
        "offset": offset
    }

    response = requests.post(api_url, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()


def fetch_product_attributes(api_url, headers, product_id):
    # Body для API
    payload = {
        "filter": {
            "product_id": [str(product_id)],
            "visibility": "ALL"
        },
        "limit": 1
    }

    response = requests.post(api_url, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()


def add_product_to_db(product):
    connection = None
    cursor = None
    try:
        # Подключение к БД
        connection = mysql.connector.connect(
            user="", # Логин от MySQL
            password="", # Пароль от MySQL 
            host="localhost", # Локальное использование
            database="ozon" # Название БД
        )
        cursor = connection.cursor()

        cursor.execute("SELECT COUNT(*) FROM products WHERE id = %s", (product["id"],))
        exists = cursor.fetchone()[0]

        if exists == 0:
            cursor.execute("""
                INSERT INTO products (id, offer_id, name, quantity)
                VALUES (%s, %s, %s, %s)
            """, (
                product["id"],
                product["offer_id"],
                product["name"],
                product["quantity"]
            ))
            print(f"Добавлен продукт: {product['name']}")

            product_id = product["id"]

            cursor.execute("""
                INSERT INTO product_descriptions (product_id, description)
                VALUES (%s, %s)
            """, (product_id, product["description"]))

            cursor.execute("""
                INSERT INTO product_images (product_id, image_url, is_primary)
                VALUES (%s, %s, %s)
            """, (product_id, product["image_url"], True))

        connection.commit()
    except Exception as e:
        print(f"Ошибка при добавлении продукта в БД: {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def main():
    product_list_url = "https://api-seller.ozon.ru/v3/product/list" # Список товаров
    product_info_url = "https://api-seller.ozon.ru/v4/product/info/attributes" # Получить описание хар-ик товара

    headers = {
        'Client-Id': '', # Айди от OzonAPI
        'Api-Key': '' # Ключ от OzonAPI
    }

    try:
        print("Получаем список товаров...")
        product_list = fetch_product_list(product_list_url, headers)

        products = product_list.get('result', {}).get('items', [])
        for product in products:
            product_id = product["product_id"]

            product_info = fetch_product_attributes(product_info_url, headers, product_id)
            attributes = product_info.get('result', [])

            if attributes and isinstance(attributes, list) and len(attributes) > 0:
                product_name = attributes[0].get("name", "Не указано")
                quantity = product.get("quants", [{}])[0].get("quant_size", 0) if product.get("quants") else 0
                description = attributes[0].get("attributes", [{}])[2].get("values", [{}])[0].get("value",
                                                                                                  "Нет описания")
                image_url = attributes[0].get("primary_image", "Нет изображения")
            else:
                product_name = "Не указано"
                quantity = 0
                description = "Нет описания"
                image_url = "Нет изображения"

            print(f"\nID товара: {product_id}")
            print(f"Название: {product_name}")
            print(f"Количество: {quantity}")
            print(f"Описание: {description}")
            print(f"Изображение: {image_url}")

            product_data = {
                "id": product_id,
                "offer_id": product["offer_id"],
                "name": product_name,
                "quantity": quantity,
                "description": description,
                "image_url": image_url
            }
            add_product_to_db(product_data)

    except Exception as e:
        print(f"Произошла ошибка: {str(e)}")


if __name__ == "__main__":
    main()
