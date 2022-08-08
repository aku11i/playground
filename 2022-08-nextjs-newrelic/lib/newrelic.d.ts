declare module "newrelic" {
  // https://newrelic.github.io/node-newrelic/docs/API.html#getBrowserTimingHeader
  export function getBrowserTimingHeader(params?: {
    /** Nonce to inject into <script> header. */
    nonce?: string;
    /** Used to import agent script without <script> tag wrapper. */
    hasToRemoveScriptWrapper?: boolean;
  }): string;
}
