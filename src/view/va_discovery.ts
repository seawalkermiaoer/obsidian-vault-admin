import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_VA_DISCOVERY = "va-discovery-view";

export class VADiscoveryView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_VA_DISCOVERY;
  }

  getDisplayText() {
    return "VIEW_TYPE_VA_DISCOVERY view";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "VIEW_TYPE_VA_DISCOVERY view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}