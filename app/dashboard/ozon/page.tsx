'use client';

import { useState, useEffect, useCallback } from 'react'
import { useOzonAPIContext } from '@/context/OzonAPIContext'
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
import { Search, Filter, Download, ChevronDown, Eye } from "lucide-react"
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
import DialogOzonAPI from '@/components/ConnectOzonDialog';

// Define explicit status types
// type ProductStatus = 'active' | 'inactive' | 'moderation' | 'rejected' | 'archived';

interface OzonProduct {
  id: number;
  barcode: string;
  barcodes: string[];
  name: string;
  offer_id: string;
  height: number;
  width: number;
  depth: number;
  weight: number;
  images: string[];
  primary_image: string;
  description_category_id: number;
  weight_unit: string;
  dimension_unit: string;
  sku: number;
  type_id: number;
  model_info: {
    model_id: number;
    count: number;
  };
}

// interface OzonApiResponse {
//   result: OzonProduct[];
//   total: number;
//   last_id: string;
// }

export default function OzonPage() {
  const { clientId, apiKey } = useOzonAPIContext();
  const [products, setProducts] = useState<OzonProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products from Ozon API
  const fetchProducts = useCallback(async () => {
    if (!clientId || !apiKey) {
      setError('Необходимо ввести Client ID и API Key');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const url = 'https://api-seller.ozon.ru/v4/product/info/attributes';
      const headers = {
        'Client-Id': clientId,
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      };
      
      const body = JSON.stringify({
        filter: { visibility: "ALL" },
        limit: 100,
        sort_dir: "ASC"
      });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.result || []);
    } catch (error) {
      console.log(error)
      setError('Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  }, [clientId, apiKey]);

  useEffect(() => {
    if (clientId && apiKey) {
      fetchProducts();
    }
  }, [clientId, apiKey, fetchProducts]);

  const { clearOzonAPIData } = useOzonAPIContext();
  // Filter and paginate products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all';
    return matchesSearch && matchesStatus;
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render status badge
  // const renderStatus = (status: string) => {
  //   const statusConfig: Record<string, { text: string; color: string }> = {
  //     active: { text: 'Активный', color: 'bg-green-100 text-green-800' },
  //     inactive: { text: 'Неактивный', color: 'bg-yellow-100 text-yellow-800' },
  //     moderation: { text: 'На модерации', color: 'bg-blue-100 text-blue-800' },
  //     rejected: { text: 'Отклонён', color: 'bg-red-100 text-red-800' },
  //     archived: { text: 'В архиве', color: 'bg-gray-100 text-gray-800' },
  //   };
    
  //   return (
  //     <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
  //       {statusConfig[status]?.text || status}
  //     </span>
  //   );
  // };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Товары Ozon</h1>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button 
            onClick={clearOzonAPIData}
            className="w-full sm:w-auto"
          >
            Очистить Client Id и Api Key
          </Button>
          
          <div className="w-full sm:w-auto">
            <DialogOzonAPI />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
          
          <Button className="w-full sm:w-auto">
            Добавить товар
          </Button>
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
              <h3 className="text-lg font-medium text-gray-900">{error}</h3>
              <p className="mt-2 text-sm text-gray-500">
                Не удалось загрузить данные с сервера Ozon
              </p>
              <Button className="mt-4" onClick={fetchProducts}>
                Попробовать снова
              </Button>
              <p className="m-4 text-sm text-gray-500">
                Или
              </p>
              <DialogOzonAPI />
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
                <Eye className="text-2xl"></Eye>
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
                    <TableHead>Offer ID</TableHead>
                    <TableHead>Баркод</TableHead>
                    <TableHead>Размеры</TableHead>
                    <TableHead>Вес</TableHead>
                    <TableHead>Изображения</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {product.primary_image && (
                            <div className="relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={product.primary_image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono">{product.offer_id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono">
                          {product.barcode || (product.barcodes.length > 0 ? product.barcodes[0] : 'N/A')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.width}×{product.height}×{product.depth} {product.dimension_unit}
                      </TableCell>
                      <TableCell>
                        {product.weight} {product.weight_unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {product.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="relative h-10 w-10">
                              <Image
                                src={img}
                                alt={`Изображение ${idx + 1}`}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          ))}
                          {product.images.length > 3 && (
                            <div className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded text-xs">
                              +{product.images.length - 3}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      size="default"
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                    let pageNum: number;
                    if (pageCount <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pageCount - 2) {
                      pageNum = pageCount - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          size="default"
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
                      size="default"
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < pageCount) setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}