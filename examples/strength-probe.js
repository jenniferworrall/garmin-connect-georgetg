/**
 * Strength training schema probe.
 *
 * Run with GARMIN_DEBUG=1 to dump full JSON responses into ./.garmin-debug/
 * so you can inspect the exact shape of exerciseSets / details / splits
 * returned by Garmin Connect for a strength activity.
 *
 *   GARMIN_DEBUG=1 node examples/strength-probe.js
 */
const { GarminConnect, ActivitySubType } = require('garmin-connect');

const main = async () => {
    const GCClient = new GarminConnect({
        username: process.env.GARMIN_USER || 'your-email@example.com',
        password: process.env.GARMIN_PASS || 'your-password'
    });
    await GCClient.login();

    // Pull the most recent strength training activity
    const activities = await GCClient.getActivities(
        0,
        5,
        undefined,
        ActivitySubType.StrengthTraining
    );
    if (!activities.length) {
        console.log('No strength training activities found');
        return;
    }
    const [latest] = activities;
    console.log(
        `Probing activity ${latest.activityId} — ${latest.activityName}`
    );

    // Three calls — each one dumps full response under .garmin-debug/
    try {
        const sets = await GCClient.getActivityExerciseSets(latest.activityId);
        console.log('exerciseSets keys:', Object.keys(sets || {}).slice(0, 20));
    } catch (e) {
        console.error('exerciseSets failed:', e.message);
    }

    try {
        const details = await GCClient.getActivityDetails(latest.activityId);
        console.log('details keys:', Object.keys(details || {}).slice(0, 20));
    } catch (e) {
        console.error('details failed:', e.message);
    }

    try {
        const splits = await GCClient.getActivitySplits(latest.activityId);
        console.log('splits keys:', Object.keys(splits || {}).slice(0, 20));
    } catch (e) {
        console.error('splits failed:', e.message);
    }
};

main().catch(console.error);
