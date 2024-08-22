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
            .setName('Frequency')
            // .setDesc(
            //     'Enter the frequency in minutes to sync wit',
            // )
            .addText((text) =>
                text
                    .setPlaceholder('Enter the frequency')
                    .setValue(this.plugin.settings.frequency.toString())
                    .onChange(async (value) => {
                        // validate frequency
                        const frequency = parseInt(value)
                        if (isNaN(frequency)) {
                            new Notice('Frequency must be a positive integer')
                            return
                        }
                        // save frequency
                        this.plugin.settings.frequency = frequency
                        await this.plugin.saveSettings()

                        // this.plugin.scheduleSync()
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

        containerEl.createEl('h3', { text: 'Discovering Connections in Notes' })

        containerEl.createEl('h3', { text: 'Chat with a Single Note or the Valut' })

    }
}

export interface MultiPropSettings {
    keepAt: string;
    omnivoreFolder: string;
    keepOnStart: boolean;
    frequency: number;
}