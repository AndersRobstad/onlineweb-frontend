import url from 'common/utils/urlHelper';

export const getFrontPageUrl = () => url`/`;
export const getArticleUrl = (articleId: number) => url`/articles/${{ articleId }}`;
export const getArticlesUrl = () => url`/articles`;
export const getAuthCallbackUrl = () => url`/auth/callback`;
export const getCareerOpportinityUrl = (opportunityId: number) => url`/career/${{ opportunityId }}`;
export const getCareerOpportunitiesUrl = () => url`/career`;
export const getCompaniesUrl = () => url`/companies`;
export const getCompanyUrl = (companyId: number) => url`/companies/${{ companyId }}`;
export const getContributionsUrl = () => url`/contribution`;
export const getEventUrl = (eventId: number) => url`/events/${{ eventId }}`;
export const getEventsUrl = () => url`/events`;
export const getHobbyGroupsUrl = () => url`/hobbygroups`;
export const getPaymentEventUrl = (eventId: number) => url`/payments/${{ eventId }}`;
export const getPaymentWalletUrl = () => url`/payments/wallet`;
export const getPaymentWebshopUrl = () => url`/payments/webshop`;
export const getMyProfileUrl = () => url`/profile`;
export const getPublicProfileUrl = (userId: number) => url`/profile/public/${{ userId }}`;
export const getProfileSettingsUrl = () => url`/profile/settings`;
export const getProfileSettingsAccessCardUrl = () => url`/profile/settings/access-card`;
export const getProfileSettingsMailUrl = () => url`/profile/settings/mail`;
export const getProfileSettingsNotificationsUrl = () => url`/profile/settings/notifications`;
export const getProfileSettingsPasswordUrl = () => url`/profile/settings/password`;
export const getProfileSettingsPenaltiesUrl = () => url`/profile/settings/penalties`;
export const getProfileSettingsPrivacyUrl = () => url`/profile/settings/privacy`;
export const getProfileAppConnectionsUrl = () => url`/profile/settings/apps`;
export const getProfileUserDataUrl = () => url`/profile/settings/userdata`;

export const getProfileStatisticsUrl = () => url`/profile/statistics`;



export const getProfileStatisticsEventsUrl = () => url`/profile/statistics/events`;
export const getProfileStatisticsOrdersUrl = () => url`/profile/statistics/orders`;
export const getProfileSearchUrl = () => url`/profile/search`;
export const getResourcesUrl = () => url`/resources`;
