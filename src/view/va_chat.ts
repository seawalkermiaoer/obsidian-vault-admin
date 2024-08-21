import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_VA_CHAT = "va-chat-view";

export class VAChatView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_VA_CHAT;
  }

  getDisplayText() {
    return "VA_CHAT view";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "VA CHAT view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}