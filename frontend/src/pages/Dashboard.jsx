import { Link } from "react-router-dom"
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  Package,
  ShoppingCart,
  User,
  BarChart,
  Settings,
  Bell,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">SAKURA</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-[#606c38]"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Package className="h-5 w-5" />
            My Programs
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Calendar className="h-5 w-5" />
            Meal Plans
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5" />
            Shop
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <BarChart className="h-5 w-5" />
            Progress
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <img src="https://placehold.co/32x32" alt="User avatar" className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="relative w-8 h-8 rounded-full overflow-hidden md:hidden">
                <img src="https://placehold.co/32x32" alt="User avatar" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="grid gap-6">
            {/* Welcome Card */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Welcome back, Sarah!</h2>
                    <p className="text-muted-foreground">
                      Your nutrition program is 65% complete. Keep up the good work!
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#606c38] h-2.5 rounded-full w-[65%]"></div>
                    </div>
                    <Button className="bg-[#606c38] hover:bg-[#4f5a2f]">Continue Program</Button>
                  </div>
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <img src="https://placehold.co/400x200" alt="Healthy meal" className="object-cover w-full h-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="meal-plan">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                <TabsTrigger value="supplements">Supplements</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Meal Plan Tab */}
              <TabsContent value="meal-plan" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Today's Meal Plan</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: "Breakfast", time: "8:00 AM", image: "https://placehold.co/150x150" },
                    { title: "Lunch", time: "12:30 PM", image: "https://placehold.co/150x150" },
                    { title: "Dinner", time: "7:00 PM", image: "https://placehold.co/150x150" },
                  ].map((meal, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{meal.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {meal.time}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="relative h-[120px] rounded-md overflow-hidden">
                          <img
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          View Recipe <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Full Meal Plan
                  </Button>
                </div>
              </TabsContent>

              {/* Supplements Tab */}
              <TabsContent value="supplements" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Your Supplements</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item}>
                      <CardContent className="p-4">
                        <div className="relative h-[120px] rounded-md overflow-hidden">
                          <img
                            src={`https://placehold.co/120x120`}
                            alt={`Supplement ${item}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h4 className="mt-3 font-medium">Premium Supplement {item}</h4>
                        <p className="text-sm text-muted-foreground">Take 1 capsule daily</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          Reorder <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Your Progress</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Weight Goal</h4>
                        <span className="text-sm text-[#606c38] font-medium">75% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#606c38] h-2.5 rounded-full w-[75%]"></div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <h4 className="font-medium">Nutrition Goal</h4>
                        <span className="text-sm text-[#606c38] font-medium">60% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#606c38] h-2.5 rounded-full w-[60%]"></div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <h4 className="font-medium">Hydration Goal</h4>
                        <span className="text-sm text-[#606c38] font-medium">80% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#606c38] h-2.5 rounded-full w-[80%]"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t">
                    <Button variant="outline" size="sm">
                      View Detailed Progress
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Orders */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <Button variant="link" size="sm" className="text-[#606c38]">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[
                      { id: "#ORD-1234", date: "Mar 2, 2025", status: "Delivered", amount: "$89.99" },
                      { id: "#ORD-1233", date: "Feb 25, 2025", status: "Shipped", amount: "$45.00" },
                      { id: "#ORD-1232", date: "Feb 15, 2025", status: "Delivered", amount: "$129.99" },
                    ].map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <p className="text-sm text-[#606c38]">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

