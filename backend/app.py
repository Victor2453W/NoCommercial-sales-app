from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import json
import requests
from datetime import datetime
from functools import wraps
from config import Config


app = Flask(__name__)
app.config.from_object(Config)


# Декораторы для проверки прав доступа
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'client_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)

    return decorated_function

# Декоратор для проверки прав администратора
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        #Проверка, является ли администратором пользователь
        if session.get('role') != 'admin':
            flash('Доступ запрещён', 'error')
            return redirect(url_for('admin'))
        return f(*args, **kwargs)

    return decorated_function


# Работа с данными
def load_data(filename):
    try:
        with open(f'static/{filename}', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"products": [], "users": []}

# Сохранение данных
def save_data(filename, data):
    # Сохранение данных в json файле
    with open(f'static/{filename}', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# Маршруты
@app.route('/')
@login_required
def admin(): # Главная страница админ-панели
    products = load_data('products.json')['products'] # Загрузка продуктов
    products_total = sum(product['stock'] for product in products) # Подсчет общего кол-ва
    return render_template('admin.html', products=products, products_total=products_total)


# Вход в учетную запись
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        users = load_data('users.json')['users']
        user = next((u for u in users if u['client_id'] == request.form['client_id'] and u['api_key'] == request.form['api_key']), None)

        if user:
            session.update({
                'user_id': user['id'],
                'client_id': user['client_id'],
                'role': user['role']
            })
            return redirect(url_for('admin'))
        flash('Неверные учетные данные', 'error')
    return render_template('login.html')


# Выход из учетной записи
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))


# Загрузка общего кол-ва товара из файла
def load_total_stock():
    try:
        with open('static/total_stock.json', 'r', encoding='utf-8') as f:
            return json.load(f)['products_total']
    except FileNotFoundError:
        return 0


# Сохранение общего кол-ва товара в файл
def save_total_stock(total_stock):
    with open('static/total_stock.json', 'w', encoding='utf-8') as f:
        json.dump({"products_total": total_stock}, f, ensure_ascii=False, indent=2)


@app.route('/product/edit/<int:product_id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_product(product_id): #Редактирование товара
    products = load_data('products.json')['products']
    product = next((p for p in products if p['id'] == product_id), None)

    if not product:
        flash('Товар не найден', 'error')
        return redirect(url_for('admin'))

    if request.method == 'POST':
        # old_stock = product['stock']  # Сохраняем старое значение stock перед обновлением

        product.update({
            "name": request.form['name'],
            "description": request.form['description'],
            "category": request.form['category'],
            "age_rating": request.form['age_rating'],
            "price": float(request.form['price']),
            "stock": int(request.form['stock']),
            "status": "in_stock" if int(request.form['stock']) > 0 else "out_of_stock"
        })

        # total_stock = sum(product['stock'] for product in products) - old_stock + product['stock']
        # Персчет общего кол-ва товаров
        total_stock = sum(p['stock'] for p in products)
        save_total_stock(total_stock) # Сохранение нового кол-ва товаров

        save_data('products.json', {"products": products}) # Сохранение обновленных продуктов(товаров)
        flash('Изменения сохранены', 'success') # Сообщение о изменении товара

        # Обновление товара в mockAPI
        api_url = f"/{product_id}"  # Replace with your actual URL
        response = requests.put(api_url, json=product)

        # Проверка на успешность выполнения запроса (HTTP статус 200 означает "OK")
        if response.status_code == 200:
            flash('Изменения успешно отправлены в mockAPI', 'success')
        else:
            flash('Изменения сохранены, но не удалось отправить в mockAPI: ' + response.text, 'error')

        return redirect(url_for('admin')) # Перенаправление на админ-панель

    return render_template('edit_product.html', product=product) # Отображение формы редактирования товара


@app.route('/product/delete/<int:product_id>')
@login_required
@admin_required
def delete_product(product_id): # Удаление продукта
    products = load_data('products.json')['products']
    product_to_delete = next((p for p in products if p['id'] == product_id), None)

    if product_to_delete:
        # Удаление товара из локальных данных
        products = [p for p in products if p['id'] != product_id]

        total_stock = sum(product['stock'] for product in products)  # Обновляем общее количество
        save_total_stock(total_stock)

        save_data('products.json', {"products": products})
        flash('Товар удален', 'success') # Сообщение о удалении товара

        # Удаление товара из mockAPI
        api_url = f"/{product_id}"  # Вставка своего mockAPI
        response = requests.delete(api_url)

        if response.status_code == 204:
            flash('Товар удален из mockAPI', 'success')
        else:
            flash('Товар удален, но не удалось удалить из mockAPI: ' + response.text, 'error')
    else:
        flash('Не удалось найти товар для удаления', 'error')

    return redirect(url_for('admin'))



@app.route('/product/add', methods=['GET', 'POST'])
@login_required
@admin_required
def add_product(): #Добавление продукта
    if request.method == 'POST':
        # Загрузка уже существующих продуктов в файле
        products = load_data('products.json')['products']

        # Генерация id для нового товара
        new_id = max(p['id'] for p in products) + 1 if products else 1

        # Создание нового товара
        new_product = {
            "id": new_id,
            "name": request.form['name'],
            "description": request.form['description'],
            "category": request.form['category'],
            "age_rating": request.form['age_rating'],
            "price": float(request.form['price']),
            "stock": int(request.form['stock']),
            "status": "in_stock",
            "created_at": datetime.now().strftime("%Y-%m-%d")
        }

        # Добавление новый товар в список
        products.append(new_product)

        # Добавление нового товара в файл
        save_data('products.json', {"products": products})

        total_stock = sum(product['stock'] for product in products) + new_product['stock']
        save_total_stock(total_stock)

        # Отправка в mockAPI
        api_url = ""  # Замените на ваш URL
        response = requests.post(api_url, json=new_product)

        if response.status_code == 201:
            flash('Товар добавлен', 'success')
        else:
            flash('Товар добавлен, но не удалось отправить в mockAPI: ' + response.text, 'error')

        return redirect(url_for('admin'))

    return render_template('edit_product.html')

# Получить все товары
@app.route('/api/products', methods=['GET'])
def get_products():
    data = load_data('products.json')
    return jsonify(data['products'])


# Получить товар по ID
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    data = load_data('products.json') # Загрузка данных о продуктах
    product = next((p for p in data['products'] if p['id'] == product_id), None) #Поиск товара по ID
    return jsonify(product) if product else ('Not found', 404)



if __name__ == '__main__':
    app.run(debug=True) # Запуск приложения в режиме отладки