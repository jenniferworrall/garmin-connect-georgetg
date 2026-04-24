# Activities

## getActivities

Retrieves a paginated list of activities.

```typescript
getActivities(start?: number, limit?: number, activityType?: ActivityType, subActivityType?: ActivitySubType): Promise<IActivity[]>
```

| Parameter         | Type            | Required | Description                      |
| ----------------- | --------------- | -------- | -------------------------------- |
| `start`           | number          | No       | Index to start from (pagination) |
| `limit`           | number          | No       | Number of activities to return   |
| `activityType`    | ActivityType    | No       | Filter by activity type          |
| `subActivityType` | ActivitySubType | No       | Filter by sub-type               |

```js
// Last 10 activities
const activities = await GCClient.getActivities(0, 10);

// Filter by type
import { ActivityType } from 'garmin-connect';
const runs = await GCClient.getActivities(0, 20, ActivityType.Running);
```

**ActivityType values:** `Cycling`, `FitnessEquipment`, `Walking`, `Hiking`, `Other`, `WaterSport`, `Running`

**ActivitySubType values:** `IndoorCardio`, `StrengthTraining`, `HIIT`, `Yoga`, `IndoorCycling`, `Breathwork`, `Surfing`, `StreetRunning`, `TrailRunning`, `IndoorRunning`

---

## getActivity

Get details for a single activity.

```typescript
getActivity(activity: { activityId: GCActivityId }): Promise<IActivity>
```

```js
const [latest] = await GCClient.getActivities(0, 1);
const details = await GCClient.getActivity({ activityId: latest.activityId });
```

---

## getActivityExerciseSets

For strength training activities, returns the per-set detail: repetitions,
weight, rest periods, and Garmin's ML predictions for the movement
performed in each set.

```typescript
getActivityExerciseSets(activityId: GCActivityId): Promise<IActivityExerciseSets>
```

```js
const [latest] = await GCClient.getActivities(
    0,
    1,
    undefined,
    ActivitySubType.StrengthTraining
);
const { exerciseSets } = await GCClient.getActivityExerciseSets(
    latest.activityId
);

const working = exerciseSets.filter((s) => s.setType === 'ACTIVE');
for (const set of working) {
    const top = set.exercises[0]; // highest-probability prediction
    console.log(
        `${top.name ?? top.category} — ${set.repetitionCount} reps @ ${
            set.weight
        }g`
    );
}
```

Each `exerciseSets[i].exercises` array is sorted descending by `probability`
(0–100). `exercises[0]` is the detected movement; remaining entries are
lower-confidence candidates. `category` values include `BENCH_PRESS`,
`CURL`, `DEADLIFT`, `SHOULDER_PRESS`, `ROW`, `SQUAT`, `PULL_UP`,
`TRICEPS_EXTENSION`, `LATERAL_RAISE`, `SIT_UP`, `CRUNCH`, `PUSH_UP`, and
`UNKNOWN` — the watch may add more as firmware updates.

---

## getActivityDetails

Returns the full activity details DTO: metric descriptors, per-sample
metrics, heart-rate series, geo polyline (for outdoor activities), and
pending-data flags. Currently typed as `unknown` — run with
`GARMIN_DEBUG=1` to capture real payloads before writing against it.

```typescript
getActivityDetails(activityId: GCActivityId): Promise<unknown>
```

---

## getActivitySplits

Per-split / per-lap data. For strength activities, each `lapDTO` roughly
corresponds to a set. Currently typed as `unknown`.

```typescript
getActivitySplits(activityId: GCActivityId): Promise<unknown>
```

---

## countActivities

Get the lifetime count of activities.

```typescript
countActivities(): Promise<ICountActivities>
```

```js
const { countOfActivities } = await GCClient.countActivities();
console.log(`Total activities: ${countOfActivities}`);
```

---

## updateActivity

Update an existing activity (e.g. rename it).

```typescript
updateActivity(activity: IActivity): Promise<IActivity>
```

```js
const [activity] = await GCClient.getActivities(0, 1);
activity.activityName = 'Morning Run';
await GCClient.updateActivity(activity);
```

---

## deleteActivity

Delete an activity permanently.

```typescript
deleteActivity(activity: { activityId: GCActivityId }): Promise<void>
```

```js
const [activity] = await GCClient.getActivities(0, 1);
await GCClient.deleteActivity(activity);
```

---

## downloadOriginalActivityData

Download raw activity data as a file.

```typescript
downloadOriginalActivityData(activity: { activityId: GCActivityId }, dir: string, type?: ExportFileTypeValue): Promise<void>
```

| Parameter  | Type                                     | Default | Description                |
| ---------- | ---------------------------------------- | ------- | -------------------------- |
| `activity` | object                                   | —       | Object with `activityId`   |
| `dir`      | string                                   | —       | Directory to save the file |
| `type`     | `'zip'` \| `'gpx'` \| `'tcx'` \| `'kml'` | `'zip'` | Export format              |

```js
const [activity] = await GCClient.getActivities(0, 1);
await GCClient.downloadOriginalActivityData(activity, './downloads', 'gpx');
```

---

## uploadActivity

Upload an activity file (FIT, GPX, or TCX).

```typescript
uploadActivity(file: string, format?: UploadFileTypeTypeValue): Promise<any>
```

| Parameter | Type                          | Default | Description      |
| --------- | ----------------------------- | ------- | ---------------- |
| `file`    | string                        | —       | Path to the file |
| `format`  | `'fit'` \| `'gpx'` \| `'tcx'` | `'fit'` | File format      |

```js
const result = await GCClient.uploadActivity('./run.fit');
```

---

## uploadImage

Upload an image to an activity.

```typescript
uploadImage(activity: { activityId: GCActivityId }, file: string): Promise<any>
```

```js
const [activity] = await GCClient.getActivities(0, 1);
await GCClient.uploadImage(activity, './photo.jpg');
```

---

## deleteImage

Delete an image from an activity.

```typescript
deleteImage(activity: { activityId: GCActivityId }, imageId: string): Promise<void>
```

```js
await GCClient.deleteImage(activity, 'image-id-here');
```
