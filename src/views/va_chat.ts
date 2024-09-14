import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import t from 'src/l10n/locale';

export const VIEW_TYPE_VA_CHAT = "va-chat-view";
import { VaultAdminPluginSettings } from 'src/models/pluginSettings';

export class VAChatView extends ItemView {
  root: Root | null = null;
  settings: VaultAdminPluginSettings;
  
  constructor(leaf: WorkspaceLeaf, settings: VaultAdminPluginSettings ) {
    super(leaf);
    this.settings = settings;
  }

  getViewType() {
    return VIEW_TYPE_VA_CHAT;
  }

  getDisplayText() {
    return t("VA Chat View");
  }

  async onOpen() {
    this.icon = "message-circle";
    const container = this.containerEl.children[1]; // 获取视图的容器元素

    // 创建并嵌入 iframe
    const iframe = document.createElement('iframe');
    iframe.src = this.settings.wfChatUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '700px';
    iframe.allow = "microphone";

    container.appendChild(iframe);
  }

  async onClose() {
    // Nothing to clean up.
  }
}