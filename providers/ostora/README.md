# Ostora provider (scaffold only)

Status: **disabled / not connected**.

This folder is an integration boundary for a future, authorized Ostora feed. The APK inspection identified route names and a possible JSON shape, but did not establish a supported public API contract, required request headers, authentication, or permission to consume the service. Therefore this scaffold deliberately makes no requests and does not extract protected playback URLs.

## Required before activation

Obtain official API documentation or written authorization that specifies:
- the permitted API base URL and endpoints;
- authentication and required headers (store secrets server-side only);
- category and item response schemas;
- permitted playback URL handling and content rights.

The current MO TV Supabase catalog remains the active source. Do not enable this provider or put credentials in browser code until the contract is verified.
