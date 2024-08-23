import { ItemView, WorkspaceLeaf } from "obsidian";
import t from 'src/l10n/locale';

import { StrictMode } from "react";
import { Root, createRoot } from "react-dom/client";
import { ReactView } from "./components/TestView";

import {ItemList} from "./components/SearchListView";

import { AppContext } from "src/context";

export const VIEW_TYPE_VA_DISCOVERY = "va-discovery-view";

export class VADiscoveryView extends ItemView {
  root: Root | null = null;
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

      // const container = this.containerEl.children[1];
      // container.empty();
      // container.createEl("h4", { text: "VIEW_TYPE_VA_DISCOVERY view" });
      // TODO add view
      this.root = createRoot(this.containerEl.children[1]);
      this.root.render(
        <AppContext.Provider value={this.app}>
        <StrictMode>
            <ItemList
            app={this.app} />
        </StrictMode>
        </AppContext.Provider>
      );
    }

  async onClose() {
    this.root?.unmount();
  }
}