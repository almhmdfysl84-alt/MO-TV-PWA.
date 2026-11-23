# Ostora provider (scaffold only)

Status: **disabled / not connected**.

This folder records findings from static inspection of the user's Ostora APK and provides a safe integration boundary. The findings below are not proof of a supported public API or authorization to consume the service. The scaffold deliberately makes no network requests and does not extract protected playback URLs.

## Findings extracted from the APK

These are literal strings and structures observed during static inspection:

- Host string: `v56.ostora-tv.com`
- Main listing path: `/api/v6.2/main?page=`
- Category path prefix: `/api/v6.2/category/`
- Matches path: `/api/v6.2/matches/`
- Observed response access pattern: `data.items[]`
- Observed item fields: `id`, `cat`, `name`, `image`, `adp`
- Pagination field observed: `data.pagination.pages`
- Navigation item types observed: `link`, `category`, `sub_category`, `stream`
- Stream navigation was observed passing a URL together with `agent` and `player` values to an external player.
- Brightcove-related identifiers/strings observed: `BrightcoveHelper`, `BRIGHTCOVE_API_URL`, and `brightcove|`.

**Not established:** a verified API key/token, required request headers, a complete authentication flow, a documented public API contract, permission to consume the service, or stable playable stream URLs. The Brightcove references do not establish that MO TV is authorized to retrieve or relay those videos.

The APK also contains Firebase-related components, but the inspected evidence did not establish Firebase as the channel catalogue API. A DNS TXT lookup path was associated with notification payloads, not channel listings; it must not be treated as a source of channels.

## Required before activation

Obtain official API documentation or written authorization that specifies:
- the permitted API base URL and endpoints;
- authentication and required headers (store secrets server-side only);
- category and item response schemas;
- permitted playback URL handling and content rights.

The current MO TV Supabase catalog remains the active source. Do not enable this provider, make requests to the extracted endpoints, or put credentials in browser code until the contract and authorization are verified.
