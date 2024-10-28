import react from "@vitejs/plugin-react"
import { config } from "dotenv"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { defineConfig } from "vite"

// Load .env file
config({ path: ".env" })

function getFile(...paths: Array<string | undefined>) {
  for (const p of paths) {
    if (p && fs.existsSync(p)) {
      return fs.readFileSync(p)
    }
  }
  return null
}

// Default paths in home directory if env vars aren't set
const defaultCertFilePath = path.join(os.homedir(), ".certs", "localhost.pem")
const defaultKeyFilePath = path.join(os.homedir(), ".certs", "localhost-key.pem")

const certFile = getFile(process.env.LOCALHOST_CERTFILE, defaultCertFilePath)
const keyFile = getFile(process.env.LOCALHOST_KEYFILE, defaultKeyFilePath)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: +(process.env.PORT ?? 8592), // Also allow port configuration from .env
    https:
      process.env.HTTP === "true" || certFile === null || keyFile === null
        ? undefined
        : {
            cert: certFile,
            key: keyFile,
          },
  },
})
