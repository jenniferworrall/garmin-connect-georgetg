# garmin-connect

Unofficial Node.js / TypeScript client for the [Garmin Connect](https://connect.garmin.com/) API. Supports OAuth1/OAuth2, MFA, token reuse, and 60+ methods covering activities, health, wellness, workouts, badges, gear, social, and more.

## Install

```shell
npm install garmin-connect
```

## Quick start

```js
const { GarminConnect } = require('garmin-connect');

const GCClient = new GarminConnect({
    username: 'your-email@example.com',
    password: 'your-password'
});

await GCClient.login();

const profile = await GCClient.getUserProfile();
console.log('Hello,', profile.fullName);

const activities = await GCClient.getActivities(0, 5);
activities.forEach((a) => console.log(a.activityName, a.startTimeLocal));
```

## Token reuse

```js
// Save tokens after login
const tokens = GCClient.exportToken();
// { oauth1: {...}, oauth2: {...} }

// Restore on next run — no password needed
await GCClient.loadToken(tokens.oauth1, tokens.oauth2);
```

## MFA

```js
const { GarminMfaRequiredError } = require('garmin-connect');

try {
    await GCClient.login();
} catch (e) {
    if (e instanceof GarminMfaRequiredError) {
        const code = await promptUserForMfaCode(); // your own prompt
        await GCClient.resumeWithMfa(e.loginState, code);
    }
}
```

## Documentation

Full API reference, guides, and type definitions are in [docs/](docs/index.md):

| Section                                        | Contents                                                       |
| ---------------------------------------------- | -------------------------------------------------------------- |
| [Getting Started](docs/getting-started.md)     | Install, credentials, domain, TypeScript                       |
| [Authentication](docs/authentication.md)       | Login, MFA, token reuse                                        |
| [Activities](docs/api/activities.md)           | getActivities, uploadActivity, downloadOriginalActivityData, … |
| [Workouts](docs/api/workouts.md)               | getWorkouts, addWorkout, scheduleWorkout, …                    |
| [Health](docs/api/health.md)                   | Steps, sleep, weight, hydration, heart rate                    |
| [Wellness](docs/api/wellness.md)               | getUserSummary, HRV, stress, body battery, SpO2, …             |
| [Badges](docs/api/badges.md)                   | getBadgesEarned, getBadgesAvailable, getBadgeDetail            |
| [Gear](docs/api/gear.md)                       | getGear, linkGearToActivity, unlinkGearFromActivity            |
| [Golf](docs/api/golf.md)                       | getGolfSummary, getGolfScorecard                               |
| [Social & Devices](docs/api/social.md)         | getSocialConnections, getDeviceInfo, getNewsFeed               |
| [Custom Requests](docs/api/custom-requests.md) | get, post, put                                                 |
| [Type Reference](docs/types.md)                | All exported TypeScript interfaces and enums                   |

## Examples

Runnable scripts are in [examples/](examples/):

-   [basic-login.js](examples/basic-login.js) — login and token reuse
-   [activities.js](examples/activities.js) — list, download, update activities
-   [health-data.js](examples/health-data.js) — steps, sleep, heart rate, weight, hydration
-   [wellness.js](examples/wellness.js) — daily summary, HRV, stress, body battery
-   [workouts.js](examples/workouts.js) — list, create, schedule, delete workouts
-   [social.js](examples/social.js) — connections, devices, news feed, badges
-   [strength-probe.js](examples/strength-probe.js) — dump raw `exerciseSets` / `details` / `splits` payloads for strength training

## Debugging

Set `GARMIN_DEBUG=1` to log every HTTP GET to stderr and dump the full response to
`./.garmin-debug/<timestamp>_GET_<slug>.json`. Override the directory with
`GARMIN_DEBUG_DIR=/path/to/dumps`. Useful for capturing undocumented payload
shapes before writing types against them.

```bash
GARMIN_DEBUG=1 node examples/strength-probe.js
```

## Status

If something isn't working, check [connect.garmin.com/status](https://connect.garmin.com/status/) first.

Inspired by [garth](https://github.com/matin/garth). Many thanks.
