import json
import requests
import psycopg2

def fetch_data(api_url): # Получение данных из API
    response = requests.get(api_url)
    response.raise_for_status()
    return response.json()

def calculate_statistics(products): # Подсчет статистики по продуктам
    total_products = len(products)
    total_stock = sum(product["stock"] for product in products)
    total_value = sum(product["price"] * product["stock"] for product in products)

    # Возвращаются только необходимые поля
    statistics = {
        "total_products": total_products,
        "total_stock": total_stock,
        "total_value": total_value
    }

    return statistics

def save_statistics(statistics, filename): # Сохранение статистики в JSON файл (если нет файла, то создаст)
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(statistics, f, ensure_ascii=False, indent=4)
        print(f"Статистика сохранена в {filename}")
    except Exception as e:
        print(f"Ошибка при сохранении статистики: {e}")


def send_statistics(api_url, statistics): # Отправление статистики в API
    try:
        headers = {'Content-Type': 'application/json'}
        response = requests.post(api_url, json=statistics, headers=headers)
        response.raise_for_status()
        print("Статистика успешно отправлена в API")
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при отправке статистики: {e}")

def add_products_to_db(products): # Добавляем в БД продукты, если их там нет
    try:
        # Подключение к БД
        connection = psycopg2.connect(
            dbname="", # Название БД
            user="", # Логин в PostgreSQL
            password="", # Пароль от PostgreSQL
            host = "localhost" # Использование локально
        )
        cursor = connection.cursor()

        for product in products:
            # Проверяем, существует ли продукт в таблице
            cursor.execute("SELECT COUNT(*) FROM products WHERE id = %s", (product["id"],))
            exists = cursor.fetchone()[0]

            if exists == 0:
                # Если продукта нет в БД,то добавляем его
                cursor.execute("""
                    INSERT INTO products (id, name, description, price, stock, category)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (product["id"], product["name"], product["description"], product["price"], product["stock"], product["category"]))
                print(f"Добавлен продукт: {product['name']}")

        # Сохранение изменений
        connection.commit()
    except Exception as e:
        print(f"Ошибка при добавлении продуктов в БД: {e}")
    finally:
        cursor.close()
        connection.close()

def main():
    # URL исходного API и целевого API для статистики
    source_api_url = "" # URL mockAPI откуда берете данные
    statistics_api_url = "" # Куда сохранять статистику

    try:
        #1. Получение данных
        print("Получаем данные из исходного API...")
        source_data = fetch_data(source_api_url)

        #2. Делается подсчет статистики
        print("Делаем подсчет статистики...")
        statistics = calculate_statistics(source_data)
        print("Статистика:", statistics)

        #3. Сохранение статистики
        save_statistics(statistics, "statistics.json")

        #4. Добавляем продукты в БД
        add_products_to_db(source_data)

        #5. Отправляем статистики в API
        send_statistics(statistics_api_url, statistics)

        print("Данный процесс завершён успешно!")
    except Exception as e:
        print(f"Произошла ошибка: {str(e)}")

if __name__ == "__main__":
    main()
