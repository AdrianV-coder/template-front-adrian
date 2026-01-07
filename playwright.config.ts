import { defineConfig, devices } from "@playwright/test";
 
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    permissions: ["clipboard-read", "clipboard-write"],
    extraHTTPHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
 
  projects: [
    // Chromium "relajado"
    {
      name: "Chromium (relaxed)",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--disable-web-security"],
        },
      },
    },
 
    // ✅ Edge "relajado": igual que Chromium pero usando el canal msedge
    {
      name: "Edge (relaxed)",
      use: {
        ...devices["Desktop Chrome"],
        channel: "msedge",
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
    },
 
    // ⚠️ Firefox: relaja CSP y algunas políticas vía prefs,
    // pero no existe un flag equivalente a --disable-web-security.
    {
      name: "Firefox (relaxed CSP)",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: {
          firefoxUserPrefs: {
            // Desactiva CSP (además del bypassCSP del contexto)
            "security.csp.enable": false,
            // Evita bloqueos de contenido mixto/HTTPS estricto
            "security.mixed_content.block_active_content": false,
            "dom.security.https_only_mode": false,
            // Relaja la política estricta en orígenes file:// (si aplica)
            "security.fileuri.strict_origin_policy": false,
          },
        },
      },
    },
  ],
 
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});