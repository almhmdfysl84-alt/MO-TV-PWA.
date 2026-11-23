/**
 * Offline normalizer for the response shape observed during static APK review.
 * This module does not perform HTTP requests or resolve playback URLs.
 *
 * IMPORTANT: Field meanings beyond the observed labels are not assumed.
 */
export function normalizeObservedItems(payload) {
  const items = payload?.data?.items;
  if (!Array.isArray(items)) {
    throw new TypeError("Expected an array at data.items");
  }

  return items.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new TypeError(`Invalid item at index ${index}`);
    }

    return {
      sourceId: item.id == null ? null : String(item.id),
      name: typeof item.name === "string" ? item.name : "",
      categoryId: item.cat == null ? null : String(item.cat),
      image: typeof item.image === "string" ? item.image : null,
      // Preserve the observed field without guessing what it represents.
      adp: item.adp ?? null
    };
  });
}

export function readObservedPageCount(payload) {
  const pages = Number(payload?.data?.pagination?.pages);
  return Number.isInteger(pages) && pages >= 0 ? pages : null;
}

/**
 * Stream records intentionally remain metadata-only. No stream_url is emitted:
 * static APK strings do not establish a permitted, stable playback URL.
 */
export const ostoraIntegrationStatus = Object.freeze({
  enabled: false,
  networkEnabled: false,
  playbackEnabled: false,
  reason: "Requires an authorized API contract and verified playback permissions."
});
