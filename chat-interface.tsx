'use client'

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUp, Send } from 'lucide-react'
import ModalExample from './components/modal-example'
import { Worker } from '@react-pdf-viewer/core'
import { cn } from "@/lib/utils"

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'

interface Message {
  sender: string;
  content: string;
  role?: string;
}

export default function ChatInterface() {
  const [message, setMessage] = React.useState("")
  const [direction, setDirection] = React.useState("")
  const [role, setRole] = React.useState("")
  const [exampleFile, setExampleFile] = useState<{ url: string; name: string } | null>(null)
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { sender: "Система", content: "Начало диалога. Пользователь \"Сергей Петрович\" подключился к системе. Роль «Финансовый аналитик»." },
    { sender: "Сергей Петрович", content: "какая доля рынка Норникеля в производстве металлов и динамику производственных показателей?" },
    { sender: "Система", content: "Подключаюсь к корпоративной базе документов. Выполняю поиск по ключевым словам \"Норникель\", \"доля рынка\", \"производство металлов\". Анализирую количественные показатели." },
    { sender: "Ассистент", content: "По результатам изучения документов, Норникель занимает следующие позиции: Палладий - 43% мирового производства (№1), Никель высокосортный - 17% (№1), Платина - 12% (№1), Родий - 8% (№1), Медь - 2% (№1), Кобальт - 2% (№1). Финансовые показатели: EBITDA - 6,9 млрд долл., Рентабельность EBITDA - 48%, CAPEX - 3,0 млрд долл., ЧОК - 3,1 млрд долл. Источник: \"Норникель_Внутрення_цена_на_углерод.pdf\", стр. 2. Автор документа ivanov@nornikel.ru" },
    { sender: "Система", content: "Логирование - время запроса: 14:25, изменение роли с \"Финансовый аналитик\" на \"Менеджер\", тип ответа: сокращен с детального технического анализа до управленческого обзора, статус: выполнено успешно." },
    { sender: "Сергей Петрович", content: "какая доля рынка Норникеля в производстве металлов и динамику производственных показателей?" },
    { sender: "Система", content: "Подключаюсь к корпоративной базе документов. Выполняю поиск по ключевым словам \"Норникель\", \"доля рынка\", \"производство металлов\". Анализирую количественные показатели и причины этих показателей." },
    { sender: "Ассистент", content: "По результатам изучения документов, Норникель занимает следующие позиции: Палладий - 43% мирового производства (№1), Никель высокосортный - 17% (№1), Платина - 12% (№1), Родий - 8% (№1), Медь - 2% (№1), Кобальт - 2% (№1). Финансовые показатели: EBITDA - 6,9 млрд долл., Рентабельность EBITDA - 48%, CAPEX - 3,0 млрд долл., ЧОК - 3,1 млрд долл. Источник: \"Норникель_Внутрення_цена_на_углерод.pdf\", стр. 2. Автор документа ivanov@nornikel.ru\n\nСнижение производства в 2023 году связано с переходом на новое горное оборудование и временным снижением объемов добычи руды. Однако к четвертому кварталу 2023 года рудники вышли на плановые показатели по добыче" },
  ])

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="flex h-screen max-h-screen gap-4 p-4">
        {/* Main Chat Area */}
        <div className="flex flex-col flex-1">
          <Card className="flex-1">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <CardContent className="p-4 space-y-4">
                {chatHistory.map((msg, index) => {
                  const isSystem = msg.sender === "Система"
                  const isUser = msg.sender === "Сергей Петрович"
                  const isAssistant = msg.sender === "Ассистент"
                  
                  return (
                    <div 
                      key={index} 
                      className={cn(
                        "flex",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[80%]",
                          isSystem ? "text-sm text-muted-foreground" : "",
                          isUser ? "bg-primary text-primary-foreground" : "",
                          isAssistant ? "bg-muted" : "",
                        )}
                      >
                        {!isUser && (
                          <div className="font-semibold mb-1">{msg.sender}</div>
                        )}
                        <div className={cn(
                          "whitespace-pre-wrap",
                          isSystem ? "text-xs" : ""
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </ScrollArea>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (message.trim()) {
                    setChatHistory([...chatHistory, { sender: "Сергей Петрович", content: message }])
                    setMessage("")
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Поле ввода запроса в чатбот"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить запрос
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Найденные источники</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Норникель: Внутренняя цена на углерод</h4>
                <ModalExample 
                  fileUrl="https://neuro-hub.ru/wp-content/uploads/2024/12/Норникель_Внутрення_цена_на_углерод.pdf"
                  fileName="Норникель_Внутрення_цена_на_углерод.pdf"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">ММК-2024</h4>
                <ModalExample 
                  fileUrl="https://neuro-hub.ru/wp-content/uploads/2024/12/ММК-2024.pdf"
                  fileName="ММК-2024.pdf"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings and Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue placeholder="Выбери направления" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ore">Руда</SelectItem>
                    <SelectItem value="enrichment">Обогащение</SelectItem>
                    <SelectItem value="production">Производство</SelectItem>
                    <SelectItem value="sales">Продажа</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Ваша роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="analyst">Аналитик производства</SelectItem>
                    <SelectItem value="it-analyst">Системный IT аналитик</SelectItem>
                    <SelectItem value="project-manager">Руководитель проекта</SelectItem>
                    <SelectItem value="top-manager">Топ-менеджер</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-medium">Получить ответ в виде файла</h3>
                <div className="flex flex-col items-center">
                  <FileUp className="w-12 h-12 text-primary" />
                  <Button 
                    variant="ghost" 
                    className="mt-2"
                    onClick={() => setExampleFile({
                      url: "https://neuro-hub.ru/wp-content/uploads/2024/12/example-response.pdf",
                      name: "example-response.pdf"
                    })}
                  >
                    Загрузить пример
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {exampleFile && (
            <ModalExample
              fileUrl={exampleFile.url}
              fileName={exampleFile.name}
            />
          )}
        </div>
      </div>
    </Worker>
  )
}

