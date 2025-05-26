import { Button } from "@/components/ui/button"
import Component from "@/components/OzonProductChart"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="m-2 mt-4" variant="outline">Подробнее</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="m-2">Молочная смесь Nutricia Малютка Комфорт, с рождения, 600 г (Ozon)</SheetTitle>
          <SheetDescription className="m-2">
            Динамика цены и продаж за последние 6 месяцев
          </SheetDescription>
        </SheetHeader>
        <div className="m-4">
          <Component />
        </div>
        <a className="m-4 text-blue-600 underline" target="blank" href="https://www.ozon.ru/product/molochnaya-smes-nutricia-malyutka-komfort-s-rozhdeniya-600-g-281279512/?at=LZtlDEr8xcXJL3XGT2y63XSqQvxL7iJmXAZc6DP8By">Посмотреть страницу товара</a>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Закрыть</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SheetDemo;