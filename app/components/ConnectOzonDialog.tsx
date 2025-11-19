'use client';

import { useRef } from 'react';
import { useOzonAPIContext } from '@/app/context/OzonAPIContext';
import { Button } from "@/app/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"
import { Input } from "@/app/ui/input"
import { Label } from "@/app/ui/label"

export function DialogOzonAPI() {
  const clientIdRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);
  const { setOzonAPIData } = useOzonAPIContext();
  
  const handleSubmit = () => {
    if (clientIdRef.current && apiKeyRef.current) {
      setOzonAPIData(clientIdRef.current.value, apiKeyRef.current.value);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Подключить/Изменить Ozon Seller API</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ozon Seller API</DialogTitle>
            <DialogDescription>
              Возьмите Cliend-Id и Api-Key из своего личного кабинета в Ozon.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Cliend-Id</Label>
              <Input id="Client-Id-1" ref={clientIdRef} name="Client-Id" defaultValue="" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Api-Key</Label>
              <Input id="Api-Key-1" ref={apiKeyRef} name="Api-Key" defaultValue="" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit">Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogOzonAPI;