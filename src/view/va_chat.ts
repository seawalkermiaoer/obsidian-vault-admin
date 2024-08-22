import { ItemView, WorkspaceLeaf } from "obsidian";
import t from 'src/l10n/locale';

export const VIEW_TYPE_VA_CHAT = "va-chat-view";

export class VAChatView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_VA_CHAT;
  }

  getDisplayText() {
    return t("VA Chat View");
  }

  async onOpen() {
    this.icon = "message-circle";
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "VA CHAT view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}