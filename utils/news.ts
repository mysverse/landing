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

/** What the header and the modal actually consume. `Event` and `Announcements`
 * are deliberately left out: the event's only images are `rbxassetid://` refs,
 * which aren't fetchable from the web. */
export interface NewsFeed {
  items: NewsItem[];
  /** ISO `Timestamp`, not the ambiguous d/m/y `LastUpdated` string. */
  updatedAt: string | null;
  notifyCount: number;
  notify: boolean;
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

export function toNewsFeed(response: NewsResponse | null): NewsFeed {
  return {
    items: response?.News ?? [],
    updatedAt: response?.Timestamp ?? null,
    notifyCount: response?.NotifyCount ?? 0,
    notify: response?.Notify ?? false
  };
}
