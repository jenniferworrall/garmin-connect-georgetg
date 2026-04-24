import { GCActivityId } from './activity';

/**
 * setType for an `IExerciseSet`. Garmin annotates each logged set as either
 * a working set (`ACTIVE`) or rest period (`REST`).
 */
export type SetType = 'ACTIVE' | 'REST' | string;

/**
 * Known Garmin `exercises[].category` buckets. Captured from real payloads;
 * the list may grow — treat as open string for forward compatibility.
 */
export type ExerciseCategory =
    | 'UNKNOWN'
    | 'BENCH_PRESS'
    | 'CURL'
    | 'SHOULDER_PRESS'
    | 'ROW'
    | 'DEADLIFT'
    | 'SQUAT'
    | 'TRICEPS_EXTENSION'
    | 'PULL_UP'
    | 'LATERAL_RAISE'
    | 'SIT_UP'
    | 'CRUNCH'
    | 'PUSH_UP'
    | 'LUNGE'
    | 'CARDIO'
    | 'CORE'
    | 'CALF_RAISE'
    | 'HIP_RAISE'
    | 'PLANK'
    | 'RUN'
    | 'TOTAL_BODY'
    | 'WARM_UP'
    | string;

/**
 * Single ML prediction for a set. Garmin returns up to N predictions,
 * sorted descending by `probability` (0–100). The top entry is the
 * detected movement.
 */
export interface IExercisePrediction {
    category: ExerciseCategory;
    /** Specific exercise name when the watch/firmware identifies it (e.g. `BARBELL_DEADLIFT`). `null` when only the category is known. */
    name: string | null;
    /** 0–100. */
    probability: number;
}

/**
 * One logged set from a strength training activity.
 */
export interface IExerciseSet {
    /** Candidate predictions, sorted desc by `probability`. `exercises[0]` is the detected movement. */
    exercises: IExercisePrediction[];
    /** Seconds. Float. */
    duration: number;
    repetitionCount: number;
    /**
     * Weight value. Units are not explicitly declared by the API —
     * empirically appears to be grams for users with
     * `userData.measurementSystem === 'metric'`. Confirm before converting.
     */
    weight: number;
    setType: SetType;
    /** Local ISO8601 — no timezone offset. Align via the parent activity's `startTimeGMT`/`startTimeLocal`. */
    startTime: string;
    /** Index into the planned workout step when the set was performed as part of a structured workout. */
    wktStepIndex: number | null;
    /** Zero-based index within the activity's set list. */
    messageIndex: number;
}

/**
 * Response from `GET /activity-service/activity/{id}/exerciseSets`.
 */
export interface IActivityExerciseSets {
    activityId: GCActivityId;
    exerciseSets: IExerciseSet[];
}
