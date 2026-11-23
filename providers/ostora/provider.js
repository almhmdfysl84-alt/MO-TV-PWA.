/**
 * Ostora provider scaffold — intentionally disabled.
 *
 * No network requests are made by this module. Do not add guessed headers,
 * authentication bypasses, or protected stream extraction.
 * Enable only after receiving an authorized, documented API contract.
 */
export const ostoraProvider = Object.freeze({
  id: "ostora",
  label: "الأسطورة",
  enabled: false,

  async getCategories() {
    throw new Error(
      "Ostora provider is not configured: official API documentation and authorization are required."
    );
  },

  async getItems() {
    throw new Error(
      "Ostora provider is not configured: official API documentation and authorization are required."
    );
  }
});
