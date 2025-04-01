export interface NewsItem {
  Name: string;
  Image: string;
  Url: string;
  Content?: string;
  AspectRatio?: number;
}

export interface NewsResponse {
  NotifyCount: number;
  Timestamp: string;
  LastUpdated: string;
  Notify: boolean;
  Announcements: any[];
  News: NewsItem[];
  Event: {
    Name: string;
    Date: string;
    BackgroundImage: string;
    EventImage: string;
  };
}

export async function getNews() {
  const response = await fetch("https://mysverse-news.yan3321.workers.dev/");
  const data: NewsResponse = await response.json();
  return data;
}
