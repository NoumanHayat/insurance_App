// important times
const WARNING_TIME = 30000; // 30 seconds before the inactive time final timeut
// const INTERVAL = WARNING_TIME; // 30s, development
const INTERVAL = 240000; // every 4m allowing an extra 30s for warning
// const TIMER = 270000; // 4m30s, development allowing 30s for warning
// const TIMER = 90000; // 1m30s, development allowing 30s for warning
const TIMER = 990000; // 16m30s

const REFRESH_INTERVAL = INTERVAL;
const MAX_INACTIVITY_TIME = TIMER;
const WILL_EXPIRE_ZONE = Math.max(MAX_INACTIVITY_TIME - WARNING_TIME, 0); // wilire iin 30s

export { WARNING_TIME, REFRESH_INTERVAL, MAX_INACTIVITY_TIME, WILL_EXPIRE_ZONE };


/** Let me try to explain SW's code:
 *  - MAX_INACTIVITY_TIME = WILL_EXPIRE_ZONE + WARNING_TIME
 *  From 0 seconds up until the point of being warned (WARNING_TIME) is called the "WILL_EXPIRE_ZONE"
 *  The REFRESH_INTERVAL is how long the system will wait before requesting a new access token
 */