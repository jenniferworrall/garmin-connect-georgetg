import { GCBadgeId, GCWorkoutId, GarminDomain } from './types';
import { GCActivityId } from './types/activity';

export class UrlClass {
    private domain: GarminDomain;
    GC_MODERN: string;
    GARMIN_SSO_ORIGIN: string;
    GC_API: string;
    constructor(domain: GarminDomain = 'garmin.com') {
        this.domain = domain;
        this.GC_MODERN = `https://connect.${this.domain}/modern`;
        this.GARMIN_SSO_ORIGIN = `https://sso.${this.domain}`;
        this.GC_API = `https://connectapi.${this.domain}`;
    }
    get GARMIN_SSO() {
        return `${this.GARMIN_SSO_ORIGIN}/sso`;
    }
    get GARMIN_SSO_EMBED() {
        return `${this.GARMIN_SSO_ORIGIN}/sso/embed`;
    }
    get BASE_URL() {
        return `${this.GC_MODERN}/proxy`;
    }
    get SIGNIN_URL() {
        return `${this.GARMIN_SSO}/signin`;
    }
    get LOGIN_URL() {
        return `${this.GARMIN_SSO}/login`;
    }
    get OAUTH_URL() {
        return `${this.GC_API}/oauth-service/oauth`;
    }
    get USER_SETTINGS() {
        return `${this.GC_API}/userprofile-service/userprofile/user-settings/`;
    }
    get USER_PROFILE() {
        return `${this.GC_API}/userprofile-service/socialProfile`;
    }
    SOCIAL_CONNECTIONS(displayName: string) {
        return `${this.GC_API}/userprofile-service/socialProfile/connections/${displayName}`;
    }
    DEVICE_INFO(displayName: string) {
        return `${this.GC_API}/device-service/deviceservice/device-info/all/${displayName}`;
    }
    get NEWS_FEED() {
        return `${this.GC_API}/activitylist-service/activities/subscriptionFeed`;
    }
    get ACTIVITIES() {
        return `${this.GC_API}/activitylist-service/activities/search/activities`;
    }
    get ACTIVITY() {
        return `${this.GC_API}/activity-service/activity/`;
    }
    ACTIVITY_IMAGE(activityId: GCActivityId) {
        return `${this.GC_API}/activity-service/activity/${activityId}/image`;
    }
    ACTIVITY_IMAGE_DELETE(activityId: GCActivityId, imageId: string) {
        return `${this.GC_API}/activity-service/activity/${activityId}/image/${imageId}`;
    }
    get STAT_ACTIVITIES() {
        return `${this.GC_API}/fitnessstats-service/activity`;
    }
    get DOWNLOAD_ZIP() {
        return `${this.GC_API}/download-service/files/activity/`;
    }
    get DOWNLOAD_GPX() {
        return `${this.GC_API}/download-service/export/gpx/activity/`;
    }
    get DOWNLOAD_TCX() {
        return `${this.GC_API}/download-service/export/tcx/activity/`;
    }
    get DOWNLOAD_KML() {
        return `${this.GC_API}/download-service/export/kml/activity/`;
    }
    get UPLOAD() {
        return `${this.GC_API}/upload-service/upload/`;
    }
    get IMPORT_DATA() {
        return `${this.GC_API}/modern/import-data`;
    }
    get DAILY_STEPS() {
        return `${this.GC_API}/usersummary-service/stats/steps/daily/`;
    }
    get DAILY_SLEEP() {
        return `${this.GC_API}/sleep-service/sleep/dailySleepData`;
    }
    get DAILY_WEIGHT() {
        return `${this.GC_API}/weight-service/weight/dayview`;
    }
    get UPDATE_WEIGHT() {
        return `${this.GC_API}/weight-service/user-weight`;
    }
    get DAILY_HYDRATION() {
        return `${this.GC_API}/usersummary-service/usersummary/hydration/allData`;
    }
    get HYDRATION_LOG() {
        return `${this.GC_API}/usersummary-service/usersummary/hydration/log`;
    }
    get GOLF_SCORECARD_SUMMARY() {
        return `${this.GC_API}/gcs-golfcommunity/api/v2/scorecard/summary`;
    }
    get GOLF_SCORECARD_DETAIL() {
        return `${this.GC_API}/gcs-golfcommunity/api/v2/scorecard/detail`;
    }
    get DAILY_HEART_RATE() {
        return `${this.GC_API}/wellness-service/wellness/dailyHeartRate`;
    }
    get USER_SUMMARY() {
        return `${this.GC_API}/usersummary-service/usersummary/daily`;
    }
    get BODY_COMPOSITION() {
        return `${this.GC_API}/weight-service/weight/dateRange`;
    }
    get HRV() {
        return `${this.GC_API}/hrv-service/hrv`;
    }
    get DAILY_STRESS() {
        return `${this.GC_API}/wellness-service/wellness/dailyStress`;
    }
    get BODY_BATTERY() {
        return `${this.GC_API}/wellness-service/wellness/bodyBattery/reports/daily`;
    }
    get SPO2() {
        return `${this.GC_API}/wellness-service/wellness/daily/spo2`;
    }
    get FITNESS_AGE() {
        return `${this.GC_API}/fitnessage-service/fitnessage`;
    }
    get ENDURANCE_SCORE() {
        return `${this.GC_API}/metrics-service/metrics/endurancescore`;
    }
    get RESPIRATION() {
        return `${this.GC_API}/wellness-service/wellness/daily/respiration`;
    }
    get BADGES_EARNED() {
        return `${this.GC_API}/badge-service/badge/earned`;
    }
    get BADGES_AVAILABLE() {
        return `${this.GC_API}/badge-service/badge/available`;
    }
    BADGE_DETAIL(id: GCBadgeId) {
        return `${this.GC_API}/badge-service/badge/detail/v2/${id}`;
    }
    GEAR(userProfilePk: number) {
        return `${this.GC_API}/gear-service/gear/filterGear?userProfilePk=${userProfilePk}`;
    }
    LINK_GEAR(gearUuid: string, activityId: GCActivityId) {
        return `${this.GC_API}/gear-service/gear/link/${gearUuid}/activity/${activityId}`;
    }
    UNLINK_GEAR(gearUuid: string, activityId: GCActivityId) {
        return `${this.GC_API}/gear-service/gear/unlink/${gearUuid}/activity/${activityId}`;
    }
    WORKOUT(id?: GCWorkoutId) {
        if (id) {
            return `${this.GC_API}/workout-service/workout/${id}`;
        }
        return `${this.GC_API}/workout-service/workout`;
    }
    get WORKOUTS() {
        return `${this.GC_API}/workout-service/workouts`;
    }
}
