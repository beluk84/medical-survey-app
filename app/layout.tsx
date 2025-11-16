export const metadata = {
  title: 'Медицинская анкета - Survey Creator',
  description: 'Конструктор медицинских анкет для клиник Китая',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
