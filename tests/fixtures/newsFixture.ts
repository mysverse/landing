import type { NewsResponse } from "../../utils/news";

/**
 * Deterministic stand-in for the news worker payload.
 *
 * Items deliberately cover the shapes the real feed mixes: with and without
 * `Content`, with and without `AspectRatio`, and one square.
 */
export const NEWS_FIXTURE: NewsResponse = {
  NotifyCount: 3,
  Timestamp: "2026-08-01T20:09:58.554Z",
  LastUpdated: "1/8/2026",
  Notify: true,
  Announcements: [],
  News: [
    {
      Name: "Fixture One Wide",
      Image: "rbxassetid://1",
      Url: "https://r2.mysver.se/fixture-one.png"
    },
    {
      Name: "Fixture Two With Body",
      Image: "rbxassetid://2",
      Content: "A second fixture item that carries body copy.",
      Url: "https://r2.mysver.se/fixture-two.png",
      AspectRatio: 1.7777777777777777
    },
    {
      Name: "Fixture Three Square",
      Image: "rbxassetid://3",
      Url: "https://r2.mysver.se/fixture-three.png",
      AspectRatio: 1
    },
    {
      Name: "Fixture Four Wide",
      Image: "rbxassetid://4",
      Url: "https://r2.mysver.se/fixture-four.png"
    }
  ],
  Event: {
    Name: "Fixture Event",
    Date: "2026-03-20T16:00:00.000Z",
    BackgroundImage: "rbxassetid://5",
    EventImage: "rbxassetid://6"
  }
};

export const NEWS_FIXTURE_PORT = 4301;
export const NEWS_FIXTURE_URL = `http://127.0.0.1:${NEWS_FIXTURE_PORT}/`;
