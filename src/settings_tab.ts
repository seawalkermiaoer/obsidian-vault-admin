import { PluginSettingTab, App, Setting, Notice } from "obsidian";
import t from 'src/l10n/locale';
import VaultAdminPlugin from "../main";


export class VaultAdminSettingTab extends PluginSettingTab {
    plugin: VaultAdminPlugin;

    constructor(app: App, plugin: VaultAdminPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        /**
        *  Omnivore Options, such as folder location, last time, etc.
        **/
        containerEl.createEl('h3', { text: t('Omnivore Settings') })

        new Setting(containerEl)
            .setName(t('Omnivore Folder'))
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.omnivoreFolder)
                .onChange(async (value) => {
                    this.plugin.settings.omnivoreFolder = value;
                    await this.plugin.saveSettings();
                }));


        new Setting(containerEl)
            .setName(t('Omnivore TagAmender On Startup'))
            // .setDesc(
            //     'Check this box if you want to sync with Omnivore when the app is loaded',
            // )
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.amendOnStart)
                    .onChange(async (value) => {
                        this.plugin.settings.amendOnStart = value
                        await this.plugin.saveSettings()
                    }),
            )

        new Setting(containerEl)
            .setName(t('Omnivore Tag Last Amend'))
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder('Last Sync')
                    .setValue(this.plugin.settings.amendAt)
                    .setDefaultFormat("yyyy-MM-dd'T'HH:mm:ss")
                    .onChange(async (value) => {
                        this.plugin.settings.amendAt = value
                        await this.plugin.saveSettings()
                    }),
            )

        containerEl.createEl('h3', { text: t('Dify Settings') })

        new Setting(containerEl)
        .setName(t('Dify BaseUrl'))
        .addText(text => text
            .setValue(this.plugin.settings.difyBaseUrl)
            .onChange(async (value) => {
                this.plugin.settings.difyBaseUrl = value;
                await this.plugin.saveSettings();
            }));

        containerEl.createEl('h2', { text: t('Sync Notes To Dify') })

        new Setting(containerEl)
            .setName(t('Dify Dataset ID'))
            .addText(text => text
                .setPlaceholder('dataset id')
                .setValue(this.plugin.settings.difyDatasetId)
                .onChange(async (value) => {
                    this.plugin.settings.difyDatasetId = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(t('Dify Dataset API Secret'))
            .addText(text => text
                .setPlaceholder('api secret')
                .setValue(this.plugin.settings.difyDatasetApiSecret)
                .onChange(async (value) => {
                    this.plugin.settings.difyDatasetApiSecret = value;
                    await this.plugin.saveSettings();
                }));


        new Setting(containerEl)
            .setName(t('Obsidian Notes Dir'))
            .addText(text => text
                .setPlaceholder('default the total vault')
                .setValue(this.plugin.settings.obsidianSyncFolder)
                .onChange(async (value) => {
                    this.plugin.settings.obsidianSyncFolder = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(t('Sync On Start'))
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.syncOnStart)
                    .onChange(async (value) => {
                        this.plugin.settings.syncOnStart = value
                        await this.plugin.saveSettings()
                    }),
            )

        new Setting(containerEl)
            .setName(t('Last Sync Time'))
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder('Last Sync')
                    .setValue(this.plugin.settings.lastSyncAt)
                    .setDefaultFormat("yyyy-MM-dd'T'HH:mm:ss")
                    .onChange(async (value) => {
                        this.plugin.settings.lastSyncAt = value
                        await this.plugin.saveSettings()
                    }),
            )

        containerEl.createEl('h2', { text: t('Discovering Connections in Notes') })

        new Setting(containerEl)
            .setName(t('Similar Notes Search Workflow API Secret'))
            
            .addText(text => text
                .setValue(this.plugin.settings.wfSearchApiSecret)
                .onChange(async (value) => {
                    this.plugin.settings.wfSearchApiSecret = value;
                    await this.plugin.saveSettings();
                }));



        containerEl.createEl('h2', { text: t('Chat with the Notes') })
        new Setting(containerEl)
            .setName(t('Chat Workflow URL'))
            .addText(text => text
                .setValue(this.plugin.settings.wfChatUrl)
                .setPlaceholder('chat workflow url')
                .onChange(async (value) => {
                    this.plugin.settings.wfChatUrl = value;
                    await this.plugin.saveSettings();
                }));

    }
}

export interface MultiPropSettings {
    keepAt: string;
    omnivoreFolder: string;
    keepOnStart: boolean;
    frequency: number;
}