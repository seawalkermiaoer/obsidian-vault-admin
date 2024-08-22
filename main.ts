import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon, WorkspaceLeaf, ViewCreator } from 'obsidian';

import t from 'src/l10n/locale';
import { VaultAdminSettingTab } from 'src/settings_tab';
import { VIEW_TYPE_VA_CHAT, VAChatView } from 'src/view/va_chat';
import { VIEW_TYPE_VA_DISCOVERY, VADiscoveryView } from 'src/view/va_discovery';

// Remember to rename these classes and interfaces!

interface VaultAdminPluginSettings {
	omnivoreFolder: string;
	keepAt: string;
	keepOnStart: boolean;
	frequency: number;

}

const DEFAULT_SETTINGS: VaultAdminPluginSettings = {
	omnivoreFolder: 'Omnivore',
	keepAt: '2023-05-01T00:00:00',
	keepOnStart: true,
	frequency: 1,
}




export default class VaultAdminPlugin extends Plugin {
	settings: VaultAdminPluginSettings;




	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_VA_CHAT,
			(leaf) => new VAChatView(leaf)
		);
		this.registerView(
			VIEW_TYPE_VA_DISCOVERY,
			(leaf) => new VADiscoveryView(leaf)
		);





		const iconId = 'VA:keep'
		// This creates an icon in the left ribbon.
		this.addRibbonIcon("book-marked", iconId, async (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			// 对目录里的所有内容进行tag整理。
			new Notice('start to clean the tags in Omnivore folder!');
		})


		const discoveryIcon = 'VA:discovery'
		this.addRibbonIcon("link-2", discoveryIcon, async (evt: MouseEvent) => {
			this.openDiscoveryView();
		});

		const chatIcon = 'VA:chat'
		this.addRibbonIcon("message-circle", chatIcon, async (evt: MouseEvent) => {
			this.openChatView();
		});


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new VaultAdminSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}


	async openChatView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_VA_CHAT);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getRightLeaf(false);
			if (leaf) {
				await leaf.setViewState({ type: VIEW_TYPE_VA_CHAT, active: true });
			} else {
				console.error('Failed to create a new leaf for the chat view.');
				return;
			}
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}


	async openDiscoveryView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_VA_DISCOVERY);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getRightLeaf(false);
			if (leaf) {
				await leaf.setViewState({ type: VIEW_TYPE_VA_DISCOVERY, active: true });
			} else {
				// 可以添加一些日志记录或者错误处理逻辑
				console.error('Leaf is null or undefined.');
				return;
			}
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

