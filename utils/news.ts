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
  Announcements: unknown[];
  News: NewsItem[];
  Event: {
    Name: string;
    Date: string;
    BackgroundImage: string;
    EventImage: string;
  };
}

const NEWS_ENDPOINT = "https://mysverse-news.yan3321.workers.dev/";

export async function getNews(): Promise<NewsResponse | null> {
  try {
    // Awaited above <Header> in the locale layout, so an upstream failure has to
    // degrade rather than throw. The layout is statically generated, hence the
    // revalidate — without it news would be baked in at build time forever.
    const response = await fetch(NEWS_ENDPOINT, { next: { revalidate: 300 } });
    if (!response.ok) return null;
    return (await response.json()) as NewsResponse;
  } catch {
    return null;
  }
}
