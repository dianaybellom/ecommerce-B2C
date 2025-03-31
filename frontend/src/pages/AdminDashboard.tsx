import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00" },
  { name: "William Kim", email: "will@email.com", amount: "$99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
]

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Saludo y Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-md bg-black text-white text-sm font-medium shadow hover:bg-gray-800 transition">
            Overview
          </button>
          <button className="px-4 py-1.5 rounded-md bg-gray-200 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed">
            Analytics
          </button>
        </div>
      </div>

      {/* Métricas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$45,231.89</p>
            <p className="text-sm text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">+12,234</p>
            <p className="text-sm text-muted-foreground">+19% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      {/* Ventas recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas recientes</CardTitle>
          <p className="text-sm text-muted-foreground">Se realizaron 265 ventas este mes.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {sales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">
                  {sale.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{sale.name}</p>
                  <p className="text-sm text-muted-foreground">{sale.email}</p>
                </div>
              </div>
              <p className="text-sm font-semibold">{sale.amount}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
