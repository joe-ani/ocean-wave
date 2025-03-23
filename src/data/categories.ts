export interface Category {
  id: string;
  name: string;
  icon: string;
  imageSrc: string;
}

export const CATEGORIES: Category[] = [
  { id: "straight-hair", name: "Straight Hair", icon: "🌟", imageSrc: "/icons/spa-bed.png" },
  { id: "wavy-hair", name: "Wavy Hair", icon: "🌊", imageSrc: "/icons/barber-chair.png" },
  { id: "curly-hair", name: "Curly Hair", icon: "💫", imageSrc: "/icons/hot-stone.png" },
  { id: "kinky-hair", name: "Kinky Hair", icon: "✨", imageSrc: "/icons/nails.png" },
  { id: "wigs", name: "Wigs", icon: "👑", imageSrc: "/icons/hairdryer.png" },
  { id: "extensions", name: "Extensions", icon: "💁‍♀️", imageSrc: "/icons/slim.png" }
];
