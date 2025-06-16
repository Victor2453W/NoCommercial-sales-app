import Component from '@/components/TheAnalytics';
import SheetDemo from '@/components/OzonProduct';
import Image from 'next/image';
import { ArrowBigDown } from 'lucide-react';
import { ArrowBigUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'

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
        <section className='flex flex-col sm:flex-row justify-center items-center'>
          <Button className='my-4 sm:m-8 text-lg p-6 w-full sm:w-auto max-w-xs'>
            <Link href="/register">
              Зарегестрироваться
            </Link>
          </Button>
          <Button className='my-4 sm:m-8 text-lg p-6 w-full sm:w-auto max-w-xs'>
            <Link href="/login">
              Уже есть аккаунт?
            </Link>
          </Button>
        </section>
      </header>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <a href='#promotion'>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow cursor-pointer scroll-smooth">
            <Image
              src="/icons/3063989.png"
              alt="Ракета"
              width={64}
              height={64}
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Продвижение товаров</h3>
            <p className="text-gray-600">Оптимизация карточек, работа с рейтингами, запуск рекламы, увеличение продаж</p>
          </div>
        </a>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow cursor-pointer scroll-smooth">
          <a href='#analytics'>
            <Image
              src="/icons/3094843.png"
              alt="График"
              width={64}
              height={64}
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Аналитика продаж</h3>
            <p className="text-gray-600">Мониторинг позиций, прогнозирование спроса, анализ конкурентов</p>
          </a>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow cursor-pointer scroll-smooth">
          <a href='#automation'>
            <Image
              src="/icons/9684420.png"
              alt="Робот"
              width={64}
              height={64}
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Автоматизация</h3>
            <p className="text-gray-600">Интеграция с 1С, автоматическое обновление цен и остатков</p>
          </a>
        </div>
      </section>

      {/* Cases Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center" id="promotion">Наши кейсы</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 m-8 ml-0">
            <Component />
          </div>
          <div className="w-full md:w-1/2 m-8 ml-0">
            <p className="font-bold mb-4"><span className="text-green-600">+217%</span> прибыли меньше чем за полгода на <span className="text-blue-600">Ozon</span> и <span className="text-violet-600">Wildberries</span></p>
            <div>
              <Image
                src="/charts/Screenshot013721-min.png"
                alt="Ozon charts"
                width={600}
                height={600}
                className="w-auto h-auto mb-4 rounded-xl"
              />
            </div>
            <div>
              <Image
                src="/charts/Screenshot014633-min.png"
                alt="Wildberries charts"
                width={600}
                height={600}
                className="w-auto h-auto mb-4 rounded-xl "
              />
            </div>
          </div>
        </div>
      </section>

      <main className="p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8" id="analytics">Аналитика продаж</h1>
        <section className="flex flex-col 2xl:flex-row gap-8">
          {/* Ozon Section */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-600">Детские товары на Ozon</h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Первая карточка Ozon */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/ozon1.webp"
                    alt="Ozon product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent flex'>937 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent flex'>
                    <ArrowBigDown fill='gray' />
                    -157 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <b className='flex'>Малютка
                    <span className='m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgb(16, 196, 76)" d="M8 14c3.723 0 6-2.277 6-6s-2.277-6-6-6-6 2.277-6 6 2.277 6 6 6m1.293-7.707a1 1 0 0 1 1.414 1.414l-2.5 2.5a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414l.793.793z"></path></svg>
                    </span>
                  </b>
                  <b>Оригинал</b>
                </div>
                <p className='m-2 font-medium'>Молочная смесь Nutricia Малютка Комфорт...</p>
                <div className='flex'>
                  <span className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(255, 165, 0)" d="M8 2a1 1 0 0 1 .87.508l1.538 2.723 2.782.537a1 1 0 0 1 .538 1.667L11.711 9.58l.512 3.266A1 1 0 0 1 10.8 13.9L8 12.548 5.2 13.9a1 1 0 0 1-1.423-1.055l.512-3.266-2.017-2.144a1 1 0 0 1 .538-1.667l2.782-.537 1.537-2.723A1 1 0 0 1 8 2"></path></svg>
                    <span className=''>
                      4.7
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgba(0, 26, 52, 0.4)" d="M8.545 13C11.93 13 14 11.102 14 8s-2.07-5-5.455-5C5.161 3 3.091 4.897 3.091 8c0 1.202.31 2.223.889 3.023-.2.335-.42.643-.656.899-.494.539-.494 1.077.494 1.077.89 0 1.652-.15 2.308-.394.703.259 1.514.394 2.42.394"></path></svg>
                    <span className='text-blue-600'>
                      10 000+
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(0, 91, 255)" d="M8.999 6.994c-.704.196-1.13.728-1.042 1.073.09.345.715.585 1.418.388.704-.196 1.13-.728 1.042-1.073-.09-.345-.714-.585-1.418-.388"></path><path fill="currentColor" d="M14 8c0 3.723-2.277 6-6 6-2.73 0-4.683-1.225-5.53-3.346.261.15.57.214.878.161.855-.146 1.364-1.063 1.058-1.907-.226-.625-.859-1.005-1.492-.896-.38.065-.692.282-.894.578A9 9 0 0 1 2 8c0-3.723 2.277-6 6-6 2.672 0 4.6 1.173 5.475 3.213a.31.31 0 0 0-.291.001.34.34 0 0 0-.158.389l.274 1.065-2.017-.91-.02-.006c-.063-.013-.123.048-.105.118l.566 2.2.011.034a.32.32 0 0 0 .313.22.33.33 0 0 0 .293-.417l-.276-1.074 1.93.87Q14 7.85 14 8M8.834 6.354c-1.019.284-1.686 1.128-1.491 1.885s1.178 1.14 2.197.856 1.687-1.128 1.492-1.885-1.18-1.14-2.198-.856m-2.093.65-1.93.537-.032.011a.337.337 0 0 0-.169.459.32.32 0 0 0 .378.166l.858-.239-.863 2.206-.006.02c-.01.065.048.125.114.107l2.094-.584.034-.012a.34.34 0 0 0 .214-.33c-.014-.216-.21-.354-.4-.301l-1.046.291.862-2.204.006-.20c.011-.066-.048-.126-.114-.108"></path><path fill="currentColor" d="M3.853 9.314c-.065-.494-.557-.789-1-.6a.76.76 0 0 0-.443.798c.064.494.556.79 1 .601a.76.76 0 0 0 .443-.799"></path></svg>
                    <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                      Ozon
                    </span>
                  </span>
                </div>
                <SheetDemo />
              </div>
              
              {/* Вторая карточка Ozon */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                {/* Тот же контент что и в первой карточке */}
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/ozon1.webp"
                    alt="Ozon product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent flex'>937 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent flex'>
                    <ArrowBigDown fill='gray' />
                    -157 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <b className='flex'>Малютка
                    <span className='m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgb(16, 196, 76)" d="M8 14c3.723 0 6-2.277 6-6s-2.277-6-6-6-6 2.277-6 6 2.277 6 6 6m1.293-7.707a1 1 0 0 1 1.414 1.414l-2.5 2.5a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414l.793.793z"></path></svg>
                    </span>
                  </b>
                  <b>Оригинал</b>
                </div>
                <p className='m-2 font-medium'>Молочная смесь Nutricia Малютка Комфорт...</p>
                <div className='flex'>
                  <span className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(255, 165, 0)" d="M8 2a1 1 0 0 1 .87.508l1.538 2.723 2.782.537a1 1 0 0 1 .538 1.667L11.711 9.58l.512 3.266A1 1 0 0 1 10.8 13.9L8 12.548 5.2 13.9a1 1 0 0 1-1.423-1.055l.512-3.266-2.017-2.144a1 1 0 0 1 .538-1.667l2.782-.537 1.537-2.723A1 1 0 0 1 8 2"></path></svg>
                    <span className=''>
                      4.7
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgba(0, 26, 52, 0.4)" d="M8.545 13C11.93 13 14 11.102 14 8s-2.07-5-5.455-5C5.161 3 3.091 4.897 3.091 8c0 1.202.31 2.223.889 3.023-.2.335-.42.643-.656.899-.494.539-.494 1.077.494 1.077.89 0 1.652-.15 2.308-.394.703.259 1.514.394 2.42.394"></path></svg>
                    <span className='text-blue-600'>
                      10 000+
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(0, 91, 255)" d="M8.999 6.994c-.704.196-1.13.728-1.042 1.073.09.345.715.585 1.418.388.704-.196 1.13-.728 1.042-1.073-.09-.345-.714-.585-1.418-.388"></path><path fill="currentColor" d="M14 8c0 3.723-2.277 6-6 6-2.73 0-4.683-1.225-5.53-3.346.261.15.57.214.878.161.855-.146 1.364-1.063 1.058-1.907-.226-.625-.859-1.005-1.492-.896-.38.065-.692.282-.894.578A9 9 0 0 1 2 8c0-3.723 2.277-6 6-6 2.672 0 4.6 1.173 5.475 3.213a.31.31 0 0 0-.291.001.34.34 0 0 0-.158.389l.274 1.065-2.017-.91-.02-.006c-.063-.013-.123.048-.105.118l.566 2.2.011.034a.32.32 0 0 0 .313.22.33.33 0 0 0 .293-.417l-.276-1.074 1.93.87Q14 7.85 14 8M8.834 6.354c-1.019.284-1.686 1.128-1.491 1.885s1.178 1.14 2.197.856 1.687-1.128 1.492-1.885-1.18-1.14-2.198-.856m-2.093.65-1.93.537-.032.011a.337.337 0 0 0-.169.459.32.32 0 0 0 .378.166l.858-.239-.863 2.206-.006.02c-.01.065.048.125.114.107l2.094-.584.034-.012a.34.34 0 0 0 .214-.33c-.014-.216-.21-.354-.4-.301l-1.046.291.862-2.204.006-.20c.011-.066-.048-.126-.114-.108"></path><path fill="currentColor" d="M3.853 9.314c-.065-.494-.557-.789-1-.6a.76.76 0 0 0-.443.798c.064.494.556.79 1 .601a.76.76 0 0 0 .443-.799"></path></svg>
                    <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                      Ozon
                    </span>
                  </span>
                </div>
                <SheetDemo />
              </div>
              
              {/* Третья карточка Ozon */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                {/* Тот же контент что и в первой карточке */}
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/ozon1.webp"
                    alt="Ozon product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent flex'>937 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent flex'>
                    <ArrowBigDown fill='gray' />
                    -157 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <b className='flex'>Малютка
                    <span className='m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgb(16, 196, 76)" d="M8 14c3.723 0 6-2.277 6-6s-2.277-6-6-6-6 2.277-6 6 2.277 6 6 6m1.293-7.707a1 1 0 0 1 1.414 1.414l-2.5 2.5a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414l.793.793z"></path></svg>
                    </span>
                  </b>
                  <b>Оригинал</b>
                </div>
                <p className='m-2 font-medium'>Молочная смесь Nutricia Малютка Комфорт...</p>
                <div className='flex'>
                  <span className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(255, 165, 0)" d="M8 2a1 1 0 0 1 .87.508l1.538 2.723 2.782.537a1 1 0 0 1 .538 1.667L11.711 9.58l.512 3.266A1 1 0 0 1 10.8 13.9L8 12.548 5.2 13.9a1 1 0 0 1-1.423-1.055l.512-3.266-2.017-2.144a1 1 0 0 1 .538-1.667l2.782-.537 1.537-2.723A1 1 0 0 1 8 2"></path></svg>
                    <span className=''>
                      4.7
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgba(0, 26, 52, 0.4)" d="M8.545 13C11.93 13 14 11.102 14 8s-2.07-5-5.455-5C5.161 3 3.091 4.897 3.091 8c0 1.202.31 2.223.889 3.023-.2.335-.42.643-.656.899-.494.539-.494 1.077.494 1.077.89 0 1.652-.15 2.308-.394.703.259 1.514.394 2.42.394"></path></svg>
                    <span className='text-blue-600'>
                      10 000+
                    </span>
                  </span>
                  <span className='flex'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='m-1'><path fill="rgb(0, 91, 255)" d="M8.999 6.994c-.704.196-1.13.728-1.042 1.073.09.345.715.585 1.418.388.704-.196 1.13-.728 1.042-1.073-.09-.345-.714-.585-1.418-.388"></path><path fill="currentColor" d="M14 8c0 3.723-2.277 6-6 6-2.73 0-4.683-1.225-5.53-3.346.261.15.57.214.878.161.855-.146 1.364-1.063 1.058-1.907-.226-.625-.859-1.005-1.492-.896-.38.065-.692.282-.894.578A9 9 0 0 1 2 8c0-3.723 2.277-6 6-6 2.672 0 4.6 1.173 5.475 3.213a.31.31 0 0 0-.291.001.34.34 0 0 0-.158.389l.274 1.065-2.017-.91-.02-.006c-.063-.013-.123.048-.105.118l.566 2.2.011.034a.32.32 0 0 0 .313.22.33.33 0 0 0 .293-.417l-.276-1.074 1.93.87Q14 7.85 14 8M8.834 6.354c-1.019.284-1.686 1.128-1.491 1.885s1.178 1.14 2.197.856 1.687-1.128 1.492-1.885-1.18-1.14-2.198-.856m-2.093.65-1.93.537-.032.011a.337.337 0 0 0-.169.459.32.32 0 0 0 .378.166l.858-.239-.863 2.206-.006.02c-.01.065.048.125.114.107l2.094-.584.034-.012a.34.34 0 0 0 .214-.33c-.014-.216-.21-.354-.4-.301l-1.046.291.862-2.204.006-.20c.011-.066-.048-.126-.114-.108"></path><path fill="currentColor" d="M3.853 9.314c-.065-.494-.557-.789-1-.6a.76.76 0 0 0-.443.798c.064.494.556.79 1 .601a.76.76 0 0 0 .443-.799"></path></svg>
                    <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                      Ozon
                    </span>
                  </span>
                </div>
                <SheetDemo />
              </div>
            </div>
          </div>

          {/* Wildberries Section */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-violet-600">Детские товары на Wildberries</h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Первая карточка WB */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/wb1.webp"
                    alt="Wildberries product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex'>987 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent flex'>
                    <ArrowBigUp fill='gray' />
                    +50 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <div className='m-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path fill="#4584FF" d="M7.03.473a1.644 1.644 0 0 0-2.06 0l-.955.767a1.644 1.644 0 0 1-.672.324l-1.195.267A1.644 1.644 0 0 0 .863 3.443l.005 1.225c.001.251-.056.5-.166.726L.166 6.496a1.644 1.644 0 0 0 .459 2.01l.96.759c.198.156.357.355.465.583l.527 1.105a1.645 1.645 0 0 0 1.857.895l1.193-.278c.245-.057.5-.057.746 0l1.193.278a1.645 1.645 0 0 0 1.857-.895l.527-1.105c.108-.228.267-.427.465-.583l.96-.76c.606-.479.797-1.315.459-2.01l-.536-1.1a1.645 1.645 0 0 1-.166-.727l.005-1.225A1.644 1.644 0 0 0 9.852 1.83l-1.195-.267a1.644 1.644 0 0 1-.672-.324L7.031.473ZM8.95 4a.73.73 0 0 1 0 1.034L5.542 8.442a.73.73 0 0 1-1.035 0l-1.46-1.46A.731.731 0 1 1 4.08 5.947l.944.943 2.891-2.892A.73.73 0 0 1 8.95 4Z" /></svg>
                  </div>
                  <p className='text-1xl'>Малютка <span>/ Молочная смесь для дете...</span></p>
                </div>
              </div>
              
              {/* Вторая карточка WB */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                {/* Тот же контент что и в первой карточке */}
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/wb1.webp"
                    alt="Wildberries product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex'>987 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent flex'>
                    <ArrowBigUp fill='gray' />
                    +50 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <div className='m-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path fill="#4584FF" d="M7.03.473a1.644 1.644 0 0 0-2.06 0l-.955.767a1.644 1.644 0 0 1-.672.324l-1.195.267A1.644 1.644 0 0 0 .863 3.443l.005 1.225c.001.251-.056.5-.166.726L.166 6.496a1.644 1.644 0 0 0 .459 2.01l.96.759c.198.156.357.355.465.583l.527 1.105a1.645 1.645 0 0 0 1.857.895l1.193-.278c.245-.057.5-.057.746 0l1.193.278a1.645 1.645 0 0 0 1.857-.895l.527-1.105c.108-.228.267-.427.465-.583l.96-.76c.606-.479.797-1.315.459-2.01l-.536-1.1a1.645 1.645 0 0 1-.166-.727l.005-1.225A1.644 1.644 0 0 0 9.852 1.83l-1.195-.267a1.644 1.644 0 0 1-.672-.324L7.031.473ZM8.95 4a.73.73 0 0 1 0 1.034L5.542 8.442a.73.73 0 0 1-1.035 0l-1.46-1.46A.731.731 0 1 1 4.08 5.947l.944.943 2.891-2.892A.73.73 0 0 1 8.95 4Z" /></svg>
                  </div>
                  <p className='text-1xl'>Малютка <span>/ Молочная смесь для дете...</span></p>
                </div>
              </div>
              
              {/* Третья карточка WB */}
              <div className="w-full md:flex-1 border-2 border-solid rounded-lg p-2 md:p-4">
                {/* Тот же контент что и в первой карточке */}
                <div className="relative aspect-square">
                  <Image
                    src="/product-images/wb1.webp"
                    alt="Wildberries product"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <p className='m-2 text-2xl sm:text-1xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex'>987 ₽
                  <span className='ml-2 text-base sm:text-0xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent flex'>
                    <ArrowBigUp fill='gray' />
                    +50 ₽
                  </span>
                </p>
                <div className='m-2 flex'>
                  <div className='m-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"><path fill="#4584FF" d="M7.03.473a1.644 1.644 0 0 0-2.06 0l-.955.767a1.644 1.644 0 0 1-.672.324l-1.195.267A1.644 1.644 0 0 0 .863 3.443l.005 1.225c.001.251-.056.5-.166.726L.166 6.496a1.644 1.644 0 0 0 .459 2.01l.96.759c.198.156.357.355.465.583l.527 1.105a1.645 1.645 0 0 0 1.857.895l1.193-.278c.245-.057.5-.057.746 0l1.193.278a1.645 1.645 0 0 0 1.857-.895l.527-1.105c.108-.228.267-.427.465-.583l.96-.76c.606-.479.797-1.315.459-2.01l-.536-1.1a1.645 1.645 0 0 1-.166-.727l.005-1.225A1.644 1.644 0 0 0 9.852 1.83l-1.195-.267a1.644 1.644 0 0 1-.672-.324L7.031.473ZM8.95 4a.73.73 0 0 1 0 1.034L5.542 8.442a.73.73 0 0 1-1.035 0l-1.46-1.46A.731.731 0 1 1 4.08 5.947l.944.943 2.891-2.892A.73.73 0 0 1 8.95 4Z" /></svg>
                  </div>
                  <p className='text-1xl'>Малютка <span>/ Молочная смесь для дете...</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className='my-10 p-4'>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8" id="automation">Автоматизация</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Ozon Integration */}
          <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="relative aspect-video">
              <Image
                src="/others/Screenshott1.png"
                alt="Интеграция Ozon с 1С"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <h3 className="text-white text-lg font-semibold">
                Интеграция Ozon с 1С<br/>
                <span className="text-sm font-normal">Автоматическое обновление цен и остатков</span>
              </h3>
            </div>
          </div>

          {/* Wildberries Integration */}
          <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="relative aspect-video">
              <Image
                src="/others/Screenshott2.png"
                alt="Интеграция Wildberries с 1С"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <h3 className="text-white text-lg font-semibold">
                Интеграция Wildberries с 1С<br/>
                <span className="text-sm font-normal">Автоматическое обновление цен и остатков</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* <footer>
        <div>
          <h1>Руководство проетка</h1>
          <div>
            <h2>Сергей Дмитриевич Воложенин <span>(Product Manager)</span></h2>
            <Image
              src="/r8mmggzk7iek3dimoash.webp" 
              alt="Product Manager" 
              width={64}
              height={64}
              className="w-12 h-12 mb-4"
            />
          </div>
          <ul>
            <li>Оптимизация SEO-параметров</li>
            <li>Настройка рекламных кампаний</li>
            <li>Анализ ценовой политики</li>
          </ul>
        </div>
        <div>
          <div>
            <h2>Виктор Витальевич Сердюк <span>(Fullstack Developer)</span></h2>
            <Image
              src="/5eed97ff-c300-4086-8149-16eceb78063a123.wepb_11zon.jpg"
              alt="Fullstack Developer" 
              width={64}
              height={64}
              className="w-12 h-12 mb-4"
            />
          </div>
          <ul>
            <li>Разработка веб приложений с нуля до проды</li>
            <li>Продвижение в топ по количеству ответов поисковика благодаря самым свежим технологиям веба</li>
            <li>Создание легко масштабируемых веб приоложений</li>
          </ul>
        </div>
      </footer> */}
    </div>
  )
}