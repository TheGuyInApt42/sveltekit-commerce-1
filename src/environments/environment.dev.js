import { EnvironmentName } from '$lib/enums/environment-name';
import { EnvironmentType } from '$lib/enums/environment-type';
import {
	SveltekitDataEndpointsDev,
	SveltekitSearchEndpointsDev,
} from '$lib/enums/sveltekit-endpoint.dev.enum';


export const environment = {
	name: EnvironmentName.DEVELOPMENT,
	environmentType: EnvironmentType.DEV,
	production: true,
	isDebugMode: false,
	launchURL: import.meta.env.SVELTEKIT_STARTER_BASE_URL,
	apiUrls: {
		CHUCK_NORRIS: import.meta.env.SVELTEKIT_STARTER_CHUCK_NORRIS_API_URL,
		IN_MEMORY: '',
		GITHUB: import.meta.env.SVELTEKIT_STARTER_GITHUB_API_URL,
	},
	chuckNorriesAPIConfig: {
		defaultAPILang: import.meta.env.SVELTEKIT_STARTER_CHUCK_NORRIS_API_LANG
			? import.meta.env.SVELTEKIT_STARTER_CHUCK_NORRIS_API_LANG
			: 'en-US',
		endPoints: {
			SEARCH: SveltekitSearchEndpointsDev.SEARCH,
			SERVICE: SveltekitDataEndpointsDev.SERVICE,
		},
	},
	twitterConfig: {
		TWITTER_API_KEY: import.meta.env.SVELTEKIT_STARTER_TWITTER_API_KEY,
		TWITTER_TWEETS_ENDPOINT: import.meta.env.SVELTEKIT_STARTER_TWITTER_TWEETS_ENDPOINT,
		TWITTER_SEARCH_URL: import.meta.env.SVELTEKIT_STARTER_TWITTER_SEARCH_URL,
	},
	gitHubConfig: {
		GITHUB_API_URL: import.meta.env.SVELTEKIT_STARTER_GITHUB_API_URL,
	},
};