"use client"

import * as React from "react"
import {
  // AudioWaveform,
  Box,
  ChartLine,
  Rocket,
  UserRoundPen,
  // Command,
  Truck,
  ShoppingBasket,
  GalleryVerticalEnd,
  House,
  Tally1,
  Tally2,
  MessageCircleMore,
  Monitor,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Личный кабинет",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Главная",
      url: "#",
      icon: House,
      items: [
        {
          title: "Перейти на главную",
          url: "#",
        }
      ],
    },
    {
      title: "Заказы",
      url: "#",
      icon: ShoppingBasket,
      items: [
        {
          title: "Все заказы",
          url: "#",
        },
        {
          title: "Отгрузки",
          url: "#",
        },
        {
          title: "Задачи",
          url: "#",
        },
      ],
    },
    {
      title: "Товары",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Каталог товаров",
          url: "#",
        },
        {
          title: "Импорт/Экспорт",
          url: "#",
        },
        {
          title: "Цены и остатки",
          url: "#",
        },
        {
          title: "Товарные выгрузки",
          url: "#",
        },
        {
          title: "Отзывы",
          url: "#",
        },
      ],
    },
    {
      title: "Доставка",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Посмотреть доставку",
          url: "#",
        },
      ],
    },
    {
      title: "Аналитика",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Сводка",
          url: "#",
        },
        {
          title: "Отчёты",
          url: "#",
        },
        {
          title: "Поиск наши WB",
          url: "#",
        },
      ],
    },
    {
      title: "Продвижение",
      url: "#",
      icon: Rocket,
      items: [
        {
          title: "Каналы",
          url: "#",
        },
        {
          title: "Брошенные корзины",
          url: "#",
        },
      ],
    },
    {
      title: "Клиенты",
      url: "#",
      icon: UserRoundPen,
      items: [
        {
          title: "Все клиенты",
          url: "#",
        },
        {
          title: "Скидки",
          url: "#",
        },
      ],
    },
    {
      title: "Диалоги",
      url: "#",
      icon: MessageCircleMore,
      items: [
        {
          title: "Сообщения",
          url: "#",
        },
        {
          title: "Отзывы",
          url: "#",
        },
        {
          title: "Вопросы",
          url: "#",
        },
        {
          title: "Каналы",
          url: "#",
        },
        {
          title: "Шаблоны",
          url: "#",
        },
        {
          title: "Виджет чата",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Сайт",
      url: "#",
      icon: Monitor,
    },
    {
      name: "Wildberries",
      url: "#",
      icon: Tally1,
    },
    {
      name: "OZON",
      url: "#",
      icon: Tally2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
