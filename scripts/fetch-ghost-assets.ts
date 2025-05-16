// scripts/fetch-external-assets.ts
import * as fs from "node:fs/promises";
import path from "node:path";
import { blogData } from "utils/ghost";

interface ExternalAsset {
  url: string;
  fileName: string;
  type: "js" | "css"; // More specific type
}

const baseUrl = blogData[0].externalUrl;

const externalAssets: ExternalAsset[] = [
  // Styles
  {
    url: `${baseUrl}/public/cards.min.css`,
    fileName: "cards.min.css",
    type: "css"
  },
  {
    url: `${baseUrl}/assets/built/source.js`,
    fileName: "source.js",
    type: "js"
  },
  //   {
  //     url: `${baseUrl}/assets/built/main.js`,
  //     fileName: "main.js",
  //     type: "js"
  //   },
  //   {
  //     url: `${baseUrl}/assets/built/dropdown.js`,
  //     fileName: "dropdown.js",
  //     type: "js"
  //   },
  {
    url: `${baseUrl}/public/cards.min.js`,
    fileName: "cards.min.js",
    type: "js"
  }
];

const targetDir = path.join(process.cwd(), "public", "external-assets");

async function fetchAssets(): Promise<void> {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    console.log(`Ensured directory exists: ${targetDir}`);

    for (const asset of externalAssets) {
      console.log(`Workspaceing ${asset.type.toUpperCase()}: ${asset.url}`);
      const response = await fetch(asset.url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${asset.url}: ${response.status} ${response.statusText}`
        );
      }

      const filePath = path.join(targetDir, asset.fileName);
      // Using fs.writeFile directly with the stream's ArrayBuffer can be simpler if files aren't excessively large
      // For very large files, streaming to disk is better (as in the JS example).
      // Node's fetch response.arrayBuffer() is a convenient way to get the data.
      const buffer = await response.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer)); // Convert ArrayBuffer to Node.js Buffer

      // If you prefer to stick to the streaming approach for consistency/large files:
      /*
      const fileHandle = await fs.open(filePath, 'w');
      const writableStream = fileHandle.createWriteStream();
      if (!response.body) {
        throw new Error(`Response body is null for ${asset.url}`);
      }
      await finished(Readable.fromWeb(response.body as any).pipe(writableStream)); // response.body needs ReadableStream<Uint8Array>
      */
      console.log(`Successfully downloaded and saved: ${filePath}`);
    }
    console.log("All external assets fetched successfully using TypeScript!");
  } catch (error) {
    console.error("Error fetching external assets:", (error as Error).message);
    process.exit(1);
  }
}

fetchAssets();
