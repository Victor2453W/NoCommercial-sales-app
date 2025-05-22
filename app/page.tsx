// import { type ChartConfig } from "@/components/ui/chart"
 
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans">
      {/* Hero Section */}
      <header className="text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Увеличиваем продажи на маркетплейсах
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Автоматизация, аналитика и продвижение ваших товаров на Wildberries, Ozon и Яндекс.Маркет
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition-colors">
          Бесплатная консультация
        </button>
      </header>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3063/3063989.png" 
            alt="Ракета" 
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-bold mb-4">Продвижение товаров</h3>
          <p className="text-gray-600">Оптимизация карточек, работа с рейтингами, запуск рекламы</p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3094/3094843.png" 
            alt="График" 
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-bold mb-4">Аналитика продаж</h3>
          <p className="text-gray-600">Мониторинг позиций, прогнозирование спроса, анализ конкурентов</p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/9684/9684420.png" 
            alt="Робот" 
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-bold mb-4">Автоматизация</h3>
          <p className="text-gray-600">Интеграция с 1С, автоматическое обновление цен и остатков</p>
        </div>
      </section>

      {/* Cases Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Наши кейсы</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 h-64">
            
          </div>
          <div className="md:w-1/2">
            <p className="text-blue-600 font-bold mb-4">+217% за 3 месяца</p>
            <h3 className="text-2xl font-bold mb-4">Детские товары на Wildberries</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Оптимизация SEO-параметров</li>
              <li>Настройка рекламных кампаний</li>
              <li>Анализ ценовой политики</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Остальные секции остаются без изменений */}
    </div>
  )
}