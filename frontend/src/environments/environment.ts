import { APP_VERSION, APP_BUILT_AT } from './version.generated';
import { applyRuntimeConfig as applyPatch } from './runtime-config';
import type { AppRuntimeConfigPatch } from './runtime-config';

export type { AppRuntimeConfigPatch } from './runtime-config';

export const environment = {
  production: true,
  apiUrl: 'https://associated-shandee-soualann-ea9b33c9.koyeb.app/api',
  wsUrl: 'https://associated-shandee-soualann-ea9b33c9.koyeb.app',
  version: APP_VERSION,
  builtAt: APP_BUILT_AT,
  /** Intervalo de polling para nova versão (ms). 0 = desabilitado. */
  versionCheckIntervalMs: 5 * 60 * 1000,
};

export function applyRuntimeConfig(patch: AppRuntimeConfigPatch): void {
  applyPatch(environment, patch);
}
