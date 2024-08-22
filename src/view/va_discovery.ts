import { ItemView, WorkspaceLeaf } from "obsidian";
import t from 'src/l10n/locale';

export const VIEW_TYPE_VA_DISCOVERY = "va-discovery-view";

export class VADiscoveryView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_VA_DISCOVERY;
  }

  getDisplayText() {
    return t("VA Discovery View");
  }

  async onOpen() {
    this.icon = "link-2";

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "VIEW_TYPE_VA_DISCOVERY view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}