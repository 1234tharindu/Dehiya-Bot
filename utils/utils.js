module.exports = {
    timeDifference: function (start, end) {
        let diff = end - start;

        let milliseconds = diff % 1000;
        diff = (diff - milliseconds) / 1000;

        let seconds = diff % 60;
        diff = (diff - seconds) / 60;

        let minutes = diff % 60;
        diff = (diff - minutes) / 60;

        let hours = diff % 24;
        let days = (diff - hours) / 24;

        return {
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        }
    },
    deleteDBItem: async function (array, item) {
        let idx = array.indexOf(item);
        if (idx > -1) {
            array.splice(idx, 1);
            return array;
        }
    }
};
module.exports = {
    timeDifference: function (start, end) {
        let diff = end - start;

        let milliseconds = diff % 1000;
        diff = (diff - milliseconds) / 1000;

        let seconds = diff % 60;
        diff = (diff - seconds) / 60;

        let minutes = diff % 60;
        diff = (diff - minutes) / 60;

        let hours = diff % 24;
        let days = (diff - hours) / 24;

        return {
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        }
    },
    deleteDBItem: async function (array, item) {
        let idx = array.indexOf(item);
        if (idx > -1) {
            array.splice(idx, 1);
            return array;
        }
    }
};
