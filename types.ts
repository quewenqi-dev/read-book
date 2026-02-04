
export interface Photo {
  id: string;
  url: string;
  date: string;
  location: string;
  alt: string;
  isFavorite?: boolean;
}

export interface Album {
  id: string;
  title: string;
  count: number;
  coverUrl: string;
  isFavorite?: boolean;
}

export interface Person {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Memory {
  id: string;
  title: string;
  category: string;
  coverUrl: string;
  isAiCurated?: boolean;
}
