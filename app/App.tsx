import { useState } from "react";
import { House, Search, Heart, User, Bell, Plus, ShoppingBag, Compass } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

const categories = [
  { id: 1, name: "All", icon: Compass },
  { id: 2, name: "Trending", icon: Heart },
  { id: 3, name: "Food", icon: ShoppingBag },
  { id: 4, name: "Cafes", icon: Plus },
];

const items = [
  {
    id: 1,
    title: "Modern Cafe Experience",
    description: "A cozy place to work and relax",
    image: "https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlfGVufDF8fHx8MTc2NzAzNjcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$4.50",
    rating: "4.8",
    likes: 234,
  },
  {
    id: 2,
    title: "Gourmet Delights",
    description: "Fresh ingredients, amazing taste",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzaHxlbnwxfHx8fDE3NjcwMzY3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$12.99",
    rating: "4.9",
    likes: 567,
  },
  {
    id: 3,
    title: "Elegant Dining",
    description: "Perfect ambiance for special occasions",
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY3MDE0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$25.00",
    rating: "4.7",
    likes: 892,
  },
  {
    id: 4,
    title: "Artisan Coffee",
    description: "Handcrafted with premium beans",
    image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjY5NTYwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "$5.50",
    rating: "4.6",
    likes: 345,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-gray-500 text-xs">Welcome back,</p>
              <h2>John Doe</h2>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for food, cafes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="flex-shrink-0 gap-2"
                size="sm"
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h3>Popular Near You</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-20">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-0 shadow-sm">
              <div className="relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => toggleLike(item.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedItems.has(item.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
                <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-900 hover:bg-white">
                  ⭐ {item.rating}
                </Badge>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h4>{item.title}</h4>
                  <span className="text-blue-600">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {item.likes} likes
                  </span>
                  <Button size="sm" className="rounded-full">
                    Order Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeTab === "home" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <House className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeTab === "search" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("search")}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeTab === "favorites" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs">Favorites</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeTab === "profile" ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
