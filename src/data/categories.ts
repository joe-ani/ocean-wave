export interface Category {
  id: string;
  name: string;
  icon: string;
  imageSrc: string;
}

export const CATEGORIES: Category[] = [
  { id: "straight-hair", name: "Straight Hair", icon: "🌟", imageSrc: "/images/categ1.png" },
  { id: "wavy-hair", name: "Wavy Hair", icon: "🌊", imageSrc: "/images/categ2.png" },
  { id: "curly-hair", name: "Curly Hair", icon: "💫", imageSrc: "/images/categ3.png" },
  { id: "kinky-hair", name: "Kinky Hair", icon: "✨", imageSrc: "/images/categ4.png" },
  { id: "wigs", name: "Wigs", icon: "👑", imageSrc: "/images/categ5.png" },
  { id: "extensions", name: "Extensions", icon: "💁‍♀️", imageSrc: "/images/categ6.png" }
];
