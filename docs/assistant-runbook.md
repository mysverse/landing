# Ask MYSverse operations

Ask MYSverse is a source-grounded assistant hosted by this Next.js app. Its public knowledge is stored in one OpenAI vector store shared with the MYSverse Wiki. Visitor transcripts are not written to MYSverse storage.

## Runtime configuration

Configure these values in Vercel for Production and Preview as appropriate:

- `OPENAI_API_KEY`: project-scoped runtime key with Responses, Moderation, Files, and Vector Stores access.
- `OPENAI_VECTOR_STORE_ID`: the shared public-knowledge vector store.
- `OPENAI_ASSISTANT_MODEL`: `gpt-5.6-luna`.
- `ASSISTANT_SESSION_SECRET`: at least 32 random characters. Rotating it expires all anonymous sessions.
- `ASSISTANT_ENABLED`: `false` for initial deployment and emergency rollback; `true` enables session creation and chat.
- `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile keys restricted to the MYSverse hosts.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: Redis used only for expiring hashed counters.

Add a coarse Vercel WAF rate-limit rule for `/api/assistant/*`. The application quotas remain authoritative. Never add prompt or answer bodies to logs, analytics, error metadata, or Redis.

## Bootstrap

Create a project-scoped ingestion key, then run once:

```bash
OPENAI_INGEST_API_KEY=... node scripts/sync-assistant-knowledge.mjs --bootstrap
```

Save the printed ID as `OPENAI_VECTOR_STORE_ID` in Vercel and as a GitHub Actions secret in both `mysverse/landing` and `mysverse/wiki`. Save the ingestion key as `OPENAI_INGEST_API_KEY` in both repositories. Keep runtime and ingestion credentials separate.

Preview a reconciliation without changing OpenAI:

```bash
OPENAI_INGEST_API_KEY=... OPENAI_VECTOR_STORE_ID=... node scripts/sync-assistant-knowledge.mjs --dry-run
```

Validate the local manifest without credentials or network access:

```bash
node scripts/sync-assistant-knowledge.mjs --validate
```

Run without `--dry-run` for a manual sync. The script uploads and waits for every replacement before deleting superseded files. It touches only files whose `source_repo` is `landing`.

## Routine operation and recovery

The `Sync assistant knowledge` workflow runs verification, then reconciles curated localized messages and legal pages after changes reach `main`. Ghost blog/news, source code, generated builds, private data, and external websites are excluded.

If indexing fails, rerun the workflow. Old indexed files remain available because deletion happens only after replacements finish. For a bad but completed publication, revert the source commit and rerun. Use `--dry-run` to inspect drift before manual recovery. Do not delete the vector store to recover one repository: the Wiki shares it and reconciles its own namespace independently.

Before production enablement, complete owner/legal review of all four localized privacy policies and terms, verify Turnstile host restrictions, run the multilingual evaluation set, and test on Vercel Preview. Enable the landing surface first, then the Wiki host. Set `ASSISTANT_ENABLED=false` for immediate server-side rollback.
