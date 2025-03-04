import { http, HttpResponse } from "msw"
import dependencies from "./dependencies"
import settings from "./settings"
import storage from "./storage"
import proxy from "./proxy"

export default Object.assign(
  http.get("/api/system", () => {
    return HttpResponse.json({ version: "test version", revision: "test revision" })
  }),
  { dependencies, settings, storage, proxy },
)
