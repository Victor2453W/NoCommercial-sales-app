import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeRussianRuble } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Новые заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <BadgeRussianRuble className="mr-1 h-3 w-3" />
              128,560
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">В обработке</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <BadgeRussianRuble className="mr-1 h-3 w-3" />
              95,320
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Согласован, нуждается в отправке
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <BadgeRussianRuble className="mr-1 h-3 w-3" />
              42,800
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Последние заказы</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID заказа</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>#WB-{i + 2345}</TableCell>
                  <TableCell>
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      {i % 3 === 0 ? 'Новый' : i % 3 === 1 ? 'В обработке' : 'Готов к отправке'}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <BadgeRussianRuble className="mr-1 h-3 w-3" />
                    {Math.floor(Math.random() * 5000) + 2500}
                  </TableCell>
                  <TableCell>{new Date().toLocaleDateString('ru-RU')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
