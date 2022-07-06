//  Register Dayjs plugin with Vue

import Vue from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

Object.defineProperties(Vue.prototype, {
    $date: {
        get() {
            return dayjs;
        }
    }
});