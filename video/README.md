# Video

Download videos from YouTube and other supported sites, upload to Maneos storage, and share the link.

## Features

- **Multi-site support**: Download from YouTube and other yt-dlp compatible sites
- **Optimized download**: Uses best video + best audio format
- **Auto upload**: Upload to maneos.net storage after download
- **Queued processing**: Downloads run in a queue to prevent resource contention
- **Automatic cleanup**: Temporary files removed after upload

## Requirements

- `yt-dlp` installed on the system
- `cookies.txt` file in the project root (required for YouTube downloads)

## Usage

```
!video https://youtube.com/watch?v=...
```

The bot will:
1. Download the video using yt-dlp
2. Upload to maneos.net
3. Reply with the download link

## Configuration

No plugin-specific configuration required. The upload URL is hardcoded to `https://maneos.net/upload`.

### YouTube Cookies

For YouTube downloads, create a `cookies.txt` file in the project root with your YouTube cookies. This helps bypass age restrictions and rate limits.

## Dependencies

- `yt-dlp` - Video downloader (system dependency)
- `cookies.txt` - YouTube authentication cookies (file in project root)

## Localization

Available in:
- English (`locale/en.json`)
- Portuguese (`locale/pt.json`)
- Spanish (`locale/es.json`)

