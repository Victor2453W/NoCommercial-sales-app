import { Card, CardContent } from "@/app/ui/card"
import { Button } from "@/app/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table"
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "@/app/ui/input"
import { Badge } from "@/app/ui/badge"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function OrdersPage() {
    type OrderStatus = 'new' | 'processing' | 'ready_to_ship' | 'shipped' | 'delivered' | 'cancelled';
    type PaymentStatus = 'paid' | 'pending' | 'refunded';
    type DeliveryStatus = 'processing' | 'preparing' | 'ready' | 'in_transit' | 'delivered' | 'cancelled';
    const orders = [
    {
      id: "WB-12345",
      createdAt: new Date(2025, 5, 15),
      deliverBy: new Date(2025, 5, 20),
      amount: 12850,
      recipient: "Иванов Иван Иванович",
      status: "new",
      paymentStatus: "paid",
      deliveryStatus: "processing",
    },
    {
      id: "WB-12346",
      createdAt: new Date(2025, 5, 14),
      deliverBy: new Date(2025, 5, 19),
      amount: 8900,
      recipient: "Петрова Анна Сергеевна",
      status: "processing",
      paymentStatus: "paid",
      deliveryStatus: "preparing",
    },
    {
      id: "WB-12347",
      createdAt: new Date(2025, 5, 13),
      deliverBy: new Date(2025, 5, 18),
      amount: 21500,
      recipient: "Сидоров Алексей Петрович",
      status: "ready_to_ship",
      paymentStatus: "paid",
      deliveryStatus: "ready",
    },
    {
      id: "WB-12348",
      createdAt: new Date(2025, 5, 12),
      deliverBy: new Date(2025, 5, 17),
      amount: 7600,
      recipient: "Козлова Екатерина Владимировна",
      status: "shipped",
      paymentStatus: "paid",
      deliveryStatus: "in_transit",
    },
    {
      id: "WB-12349",
      createdAt: new Date(2025, 5, 11),
      deliverBy: new Date(2025, 5, 16),
      amount: 15300,
      recipient: "Николаев Дмитрий Олегович",
      status: "delivered",
      paymentStatus: "paid",
      deliveryStatus: "delivered",
    },
    {
      id: "WB-12350",
      createdAt: new Date(2025, 5, 10),
      deliverBy: new Date(2025, 5, 15),
      amount: 9800,
      recipient: "Федорова Мария Игоревна",
      status: "cancelled",
      paymentStatus: "refunded",
      deliveryStatus: "cancelled",
    },
  ]

    // Status configuration
    const statusConfig: Record<OrderStatus, { text: string; color: string }> = {
    new: { text: "Новый", color: "bg-blue-100 text-blue-800" },
    processing: { text: "В обработке", color: "bg-yellow-100 text-yellow-800" },
    ready_to_ship: { text: "Готов к отправке", color: "bg-green-100 text-green-800" },
    shipped: { text: "Отправлен", color: "bg-purple-100 text-purple-800" },
    delivered: { text: "Доставлен", color: "bg-gray-100 text-gray-800" },
    cancelled: { text: "Отменен", color: "bg-red-100 text-red-800" },
    };

    const paymentStatusConfig: Record<PaymentStatus, { text: string; color: string }> = {
    paid: { text: "Оплачено", color: "bg-green-100 text-green-800" },
    pending: { text: "Ожидает оплаты", color: "bg-yellow-100 text-yellow-800" },
    refunded: { text: "Возврат", color: "bg-red-100 text-red-800" },
    };

    const deliveryStatusConfig: Record<DeliveryStatus, { text: string; color: string }> = {
    processing: { text: "Обработка", color: "bg-blue-100 text-blue-800" },
    preparing: { text: "Подготовка", color: "bg-yellow-100 text-yellow-800" },
    ready: { text: "Готов к отправке", color: "bg-green-100 text-green-800" },
    in_transit: { text: "В пути", color: "bg-purple-100 text-purple-800" },
    delivered: { text: "Доставлено", color: "bg-gray-100 text-gray-800" },
    cancelled: { text: "Отменено", color: "bg-red-100 text-red-800" },
    };

    // Helper function to safely get status config
    const getStatusConfig = (status: string, config: Record<string, { text: string; color: string }>) => {
    return config[status as keyof typeof config] || { text: status, color: "bg-gray-100 text-gray-800" };
    };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Заказы</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Заказ
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="open">Открытые</TabsTrigger>
            <TabsTrigger value="closed">Закрытые</TabsTrigger>
            <TabsTrigger value="deleted">Удалённые</TabsTrigger>
            <TabsTrigger value="types">Виды заказов</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по заказам..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">№</TableHead>
                    <TableHead>Создан</TableHead>
                    <TableHead>Доставить</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>ФИО получателя</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Оплата</TableHead>
                    <TableHead>Доставка</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {format(order.createdAt, "dd.MM.yyyy", { locale: ru })}
                      </TableCell>
                      <TableCell>
                        {format(order.deliverBy, "dd.MM.yyyy", { locale: ru })}
                      </TableCell>
                      <TableCell>
                        {order.amount.toLocaleString("ru-RU")} ₽
                      </TableCell>
                      <TableCell>{order.recipient}</TableCell>
                      <TableCell>
                        <Badge
                            className={`${getStatusConfig(order.status, statusConfig).color}`}
                            variant="outline"
                        >
                            {getStatusConfig(order.status, statusConfig).text}
                        </Badge>
                        </TableCell>

                        <TableCell>
                        <Badge
                            className={`${getStatusConfig(order.paymentStatus, paymentStatusConfig).color}`}
                            variant="outline"
                        >
                            {getStatusConfig(order.paymentStatus, paymentStatusConfig).text}
                        </Badge>
                        </TableCell>

                        <TableCell>
                        <Badge
                            className={`${getStatusConfig(order.deliveryStatus, deliveryStatusConfig).color}`}
                            variant="outline"
                        >
                            {getStatusConfig(order.deliveryStatus, deliveryStatusConfig).text}
                        </Badge>
                        </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Показано 6 из 128 заказов
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Назад
          </Button>
          <Button variant="outline" size="sm">
            Вперед
          </Button>
        </div>
      </div>
    </div>
  )
}