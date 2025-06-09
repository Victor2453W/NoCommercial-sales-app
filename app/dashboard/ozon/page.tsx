'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, ChevronDown } from "lucide-react"
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"

// Define explicit status types
type ProductStatus = 'active' | 'inactive' | 'moderation' | 'rejected' | 'archived';

interface OzonProduct {
  id: number;
  name: string;
  status: ProductStatus;
  price: number;
  old_price?: number;
  discount?: number;
  barcode: string;
  sales_count: number;
}

export default function OzonPage() {
  const [products, setProducts] = useState<OzonProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products from Ozon API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create array of valid statuses
      const statuses: ProductStatus[] = ['active', 'inactive', 'moderation', 'rejected', 'archived'];
      
      const mockProducts: OzonProduct[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Товар ${i + 1} - ${['Смартфон', 'Ноутбук', 'Наушники', 'Часы', 'Книга'][i % 5]}`,
        status: statuses[i % 5],
        price: Math.floor(Math.random() * 50000) + 1000,
        old_price: Math.random() > 0.7 ? Math.floor(Math.random() * 60000) + 1500 : undefined,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 5 : undefined,
        barcode: `1234567890${i}`,
        sales_count: Math.floor(Math.random() * 1000),
      }));
      
      setProducts(mockProducts);
    } catch (err) {
      setError('Ошибка при загрузке данных. Проверьте подключение к интернету и попробуйте снова.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and paginate products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render status badge
  const renderStatus = (status: string) => {
    const statusConfig: Record<string, { text: string; color: string }> = {
      active: { text: 'Активный', color: 'bg-green-100 text-green-800' },
      inactive: { text: 'Неактивный', color: 'bg-yellow-100 text-yellow-800' },
      moderation: { text: 'На модерации', color: 'bg-blue-100 text-blue-800' },
      rejected: { text: 'Отклонён', color: 'bg-red-100 text-red-800' },
      archived: { text: 'В архиве', color: 'bg-gray-100 text-gray-800' },
    };
    
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
        {statusConfig[status]?.text || status}
      </span>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Товары Ozon</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
          <Button>Добавить товар</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по товарам..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Статус: {statusFilter === 'all' ? 'Все' : 
                      statusFilter === 'active' ? 'Активные' :
                      statusFilter === 'inactive' ? 'Неактивные' :
                      statusFilter === 'moderation' ? 'На модерации' :
                      statusFilter === 'rejected' ? 'Отклонённые' : 'В архиве'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>Все</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>Активные</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Неактивные</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('moderation')}>На модерации</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>Отклонённые</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('archived')}>В архиве</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-red-100 p-4">
                <div className="text-2xl text-red-600">⚠️</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{error}</h3>
              <p className="mt-2 text-sm text-gray-500">
                Не удалось загрузить данные с сервера Ozon
              </p>
              <Button className="mt-4" onClick={fetchProducts}>
                Попробовать снова
              </Button>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <div className="text-2xl">🔍</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Товары не найдены</h3>
              <p className="mt-2 text-sm text-gray-500">
                Попробуйте изменить условия поиска или фильтры
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Цена и продажи</TableHead>
                    <TableHead>Скидка</TableHead>
                    <TableHead>Цена до скидки</TableHead>
                    <TableHead>Штрихкод</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={"/icons/9684420.png"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderStatus(product.status)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{product.price.toLocaleString('ru-RU')} ₽</div>
                        <div className="text-sm text-muted-foreground">
                          Продано: {product.sales_count} шт
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.discount ? (
                          <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            -{product.discount}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.old_price ? (
                          <div>
                            <span className="text-muted-foreground line-through">
                              {product.old_price.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-mono">{product.barcode}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {pageCount > 1 && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                      let pageNum = i + 1;
                      if (currentPage > 3 && currentPage < pageCount - 2) {
                        pageNum = currentPage - 2 + i;
                      } else if (currentPage >= pageCount - 2) {
                        pageNum = pageCount - 4 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < pageCount) setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}