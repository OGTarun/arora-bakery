export interface SignatureItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export const signatureItems: SignatureItem[] = [
  {
    id: "cakes",
    name: "Celebration Cakes",
    category: "Cakes",
    description:
      "Layered, hand-decorated and made for your most memorable moments.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80",
  },
  {
    id: "pastries",
    name: "Pastries",
    category: "Bakery",
    description:
      "Flaky, buttery and baked fresh every single morning.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    category: "Cakes",
    description:
      "Delicate little cakes crowned with silky, swirled frosting.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=80",
  },
  {
    id: "cookies",
    name: "Cookies",
    category: "Cookies",
    description:
      "Golden outside, chewy inside â€” perfect with a glass of milk.",
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=900&q=80",
  },
  {
    id: "bread",
    name: "Fresh Bread",
    category: "Bakery",
    description:
      "Artisan loaves with a crisp crust and an airy, tender crumb.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
  },
  {
    id: "pizza",
    name: "Pizza",
    category: "Savory",
    description:
      "Stone-baked pizzas with authentic, slow-simmered sauces.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80",
  },
  {
    id: "snacks",
    name: "Savoury Snacks",
    category: "Savory",
    description:
      "Crisp, warm treats made to be shared, any time of day.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900&q=80",
  },
];
