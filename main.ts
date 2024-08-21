import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon } from 'obsidian';

import t from 'src/l10n/locale';
import { VaultAdminSettingTab } from 'src/settings_tab';

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

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});


		const iconId = 'VA:keep'
		// add icon
		addIcon(
		  iconId,
		  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M15.9 7.801c0 .507-.123 1.12-.248 1.656v.004l-.001.003a2.87 2.87 0 0 1-2.793 2.186h-.036c-1.625 0-2.649-1.334-2.649-2.828v-2.14l-1.21 1.794-.067.055a1.404 1.404 0 0 1-1.793 0l-.065-.053-1.248-1.82v4.414H4.6V6.268c0-.91 1.078-1.439 1.794-.802l.055.048 1.46 2.13a.21.21 0 0 0 .179 0l1.43-2.119.065-.054c.68-.567 1.78-.138 1.78.815v2.536c0 .971.619 1.638 1.46 1.638h.035c.78 0 1.45-.527 1.636-1.277.125-.534.216-1.026.216-1.378-.017-3.835-3.262-6.762-7.188-6.498-3.311.23-5.986 2.905-6.216 6.216A6.705 6.705 0 0 0 8 14.693v1.19a7.895 7.895 0 0 1-7.882-8.44C.39 3.536 3.536.39 7.44.118 12.017-.19 15.88 3.242 15.9 7.8z"/></svg>`,
		)
	
		// This creates an icon in the left ribbon.
		this.addRibbonIcon(iconId, iconId, async (evt: MouseEvent) => {
		  // Called when the user clicks the icon.
		  // 对目录里的所有内容进行tag整理。
		})

		this.addRibbonIcon(iconId, "VA: Discovery the connections", (evt: MouseEvent) => { 
			// this.open_view();
		 });
		this.addRibbonIcon(iconId, "VA: Chat", (evt: MouseEvent) => { 
			// this.open_chat(); 
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
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

