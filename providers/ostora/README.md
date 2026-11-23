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


## Second static inspection (uploaded APK)

A fresh inspection was performed on the uploaded file `v7.0.0(3)(2).apk`.

- SHA-256: `f1661051c949c2867be4c66d5ac9d4a62d7fd1925f5bb0e6a0912c04a5666d7e`
- APK size: 10,498,954 bytes.
- DEX contains the same three API route strings listed above.
- DEX contains class identifiers `com.t4w.ostora516.utils.SecureEncryptor` and `MainActivity`, plus the `AppSettings` preference name and `website` field label.
- Generic networking-library strings such as `Authorization`, `Bearer `, and `User-Agent` are present. Static string presence alone does **not** prove that the app uses any particular authorization header or token value for the Ostora API.
- No literal API-key-shaped value matching the common Firebase `AIza...` format was found in the DEX printable strings. No literal Firebase database hostname was found there either.
- The Brightcove playback URL template is present, but no complete video playback URL was established.

### Updated conclusion

This APK does not expose a confirmed, reusable Ostora API key or token as a plain printable DEX string. The inspection confirms that the app has an encrypted-settings component and a runtime `website` setting, but does not establish the exact decrypted value, request-signing algorithm, required API headers, or an authorized public integration contract.

Accordingly, keep the provider disabled. Do not treat generic library constants (`Authorization`, `Bearer`, `User-Agent`) as discovered credentials, and do not infer a secret from the class name `SecureEncryptor`.


## Third static inspection (DEX call sites and native library)

The DEX was parsed at the method-reference level, and the packaged native libraries were inspected for exported JNI symbol strings:

- `SecureEncryptor.decrypt` is declared as a native method in the DEX (rather than having a Java bytecode body).
- The APK packages `libcrypto_jni.so` for `arm64-v8a`, `armeabi-v7a`, `x86`, and `x86_64`.
- The native library contains JNI symbol names for `SecureEncryptor.encrypt` and `SecureEncryptor.decrypt`, and references OpenSSL EVP AES-256-CBC routines (`EVP_aes_256_cbc`, `EVP_DecryptInit_ex`, `EVP_DecryptUpdate`, `EVP_DecryptFinal_ex`).
- DEX call-site inspection shows an obfuscated app method reading the `AppSettings` SharedPreferences entry, passing the stored value to the native decrypt method, parsing the result as JSON, and reading a `website` property.
- The category, main-listing, and matches request-building code paths also instantiate `SecureEncryptor` and read device/app settings before building requests.

**What this does not establish:** the AES key/IV source, the exact plaintext settings JSON, the full request-signing/header algorithm, server-side authorization, or permission to reuse the API. The presence of AES-256-CBC routines does not make the encrypted configuration or API contract public. No decryption key was recovered, and no live endpoint was contacted.

### Updated conclusion

We now have stronger evidence for the configuration flow: a stored `AppSettings` value is decrypted through native JNI code using an AES-256-CBC implementation, then interpreted as JSON with a `website` property. This narrows the technical picture but still does not provide a safe or authorized basis to activate the provider. Keep it disabled until official API documentation/authorization is supplied.
