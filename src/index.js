class CountdownTracker {
    constructor(label, value) {
        this.el = this.createTrackerElement(label);
        this.currentValue = 99;
        this.update(value);
    }

    createTrackerElement(label) {
        const el = document.createElement("span");
        el.className = "flip-clock__piece";
        el.innerHTML = `
            <b class="flip-clock__card card">
                <b class="card__top"></b>
                <b class="card__bottom"></b>
                <b class="card__back">
                    <b class="card__bottom"></b>
                </b>
            </b>
            <span class="flip-clock__slot">${label.toUpperCase()}</span>`;
        return el;
    }

    update(val) {
        const top = this.el.querySelector(".card__top"),
            bottom = this.el.querySelector(".card__bottom"),
            back = this.el.querySelector(".card__back"),
            backBottom = this.el.querySelector(".card__back .card__bottom");

        val = ("0" + val).slice(-2);

        if (val !== this.currentValue) {
            if (this.currentValue >= 0) {
                back.setAttribute("data-value", this.currentValue);
                bottom.setAttribute("data-value", this.currentValue);
            }
            this.currentValue = val;
            top.innerText = this.currentValue;
            backBottom.setAttribute("data-value", this.currentValue);

            this.el.classList.remove("flip");
            void this.el.offsetWidth;
            this.el.classList.add("flip");
        }
    }
}

class Clock {
    constructor(config) {
        this.targetDate = config.targetDate;
        this.parentEl = document.querySelector(config.ElSelector);

        // 직접 입력받은 output을 countdownContainer로 설정
        this.countdownContainer = this.createCountdownContainer(config.output);

        this.countdownDivId = config.targetId;
        this.countdownEl = this.countdownContainer.querySelector(`#${this.countdownDivId}`);
        this.countdownEl.className = "flip-clock";

        // countdownContainer를 상위 엘리먼트 바로 다음에 삽입
        this.parentEl.insertAdjacentElement("afterend", this.countdownContainer);

        // 콜백 저장
        this.callback = config.callback || function () { };

        this.trackers = this.initializeTrackers();
        setTimeout(this.updateClock.bind(this), 500);
    }

    createCountdownContainer(outputHTML) {
        const div = document.createElement("div");
        div.innerHTML = outputHTML;
        return div.firstChild; // 첫 번째 자식 요소를 반환 (입력된 output의 최상위 요소)
    }

    initializeTrackers() {
        const trackers = {};
        const time = this.getTimeRemaining(this.targetDate);
        for (let key in time) {
            if (key !== "Total") {
                trackers[key] = new CountdownTracker(key, time[key]);
                this.countdownEl.appendChild(trackers[key].el);
            }
        }
        return trackers;
    }

    getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()) - (9 * 60 * 60 * 1000); // Subtracting 9 hours in milliseconds
        return {
            Total: t,
            Days: Math.max(0, Math.floor(t / (1000 * 60 * 60 * 24))),
            Hours: Math.max(0, Math.floor((t / (1000 * 60 * 60)) % 24)),
            Minutes: Math.max(0, Math.floor((t / 1000 / 60) % 60)),
            Seconds: Math.max(0, Math.floor((t / 1000) % 60))
        };
    }

    updateClock() {
        const timeinterval = requestAnimationFrame(this.updateClock.bind(this));

        // 'i'를 'this.frameCount'로 변경
        if (this.frameCount++ % 10) return;

        const time = this.getTimeRemaining(this.targetDate);
        if (time.Total < 0) {
            cancelAnimationFrame(timeinterval);
            for (let key in this.trackers) {
                this.trackers[key].update(0);
            }
            this.callback && this.callback();
            return;
        }
        for (let key in this.trackers) {
            this.trackers[key].update(time[key]);
        }
    }
}

class DateTimeConverter {
    static convertStringToDate(dateTimeString) {
        const parts = dateTimeString.split(/[/ :]/).map(part => parseInt(part, 10));
        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
    }
}

export { Clock, DateTimeConverter };
