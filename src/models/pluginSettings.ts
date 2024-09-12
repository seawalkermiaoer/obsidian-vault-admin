export interface VaultAdminPluginSettings {
	omnivoreFolder: string;
	amendAt: string;
	amendOnStart: boolean,

	difyBaseUrl: string,
	difyDatasetId: string,
	difyDatasetApiSecret: string,
	obsidianSyncFolder: string,
	syncOnStart: boolean,
	lastSyncAt: string,
	wfSearchApiSecret: string,
	wfChatUrl: string,
}

export const DEFAULT_SETTINGS: VaultAdminPluginSettings = {
	omnivoreFolder: 'Omnivore',
	amendAt: '2000-01-01T00:00:00',
	amendOnStart: false,

	difyBaseUrl: "http://localhost/v1",
	difyDatasetId: "",
	difyDatasetApiSecret: "",
	obsidianSyncFolder: 'Omnivore',
	syncOnStart: false,
	lastSyncAt: '2000-01-01T00:00:00',
	wfSearchApiSecret: '',
	wfChatUrl: '',
}