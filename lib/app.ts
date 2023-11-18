import { MSGraphClient } from "@/lib/ms-graph/client";

export class HFApp {
  public static initialized: boolean = false;

  public static ensureInitialized() {
    if (!this.initialized) {
      HFApp.init();
    }
  }

  public static init() {
    require("dotenv").config();
    void new MSGraphClient();
    HFApp.initialized = true;
  }
}
