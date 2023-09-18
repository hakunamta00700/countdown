/**
 * CountdownTracker class: Represents an individual countdown unit (Days, Hours, Minutes, Seconds).
 */
class CountdownTracker {
  /**
   * @param {string} label - Label for the tracker (Days, Hours, Minutes, Seconds).
   * @param {number} value - Initial value for the tracker.
   */
  constructor(label, value) {
    this.el = this.createTrackerElement(label);
    this.currentValue = 99; // Default value
    this.update(value);
  }
  /**
   * Creates a tracker element.
   * @param {string} label - Label for the tracker.
   * @returns {HTMLElement} The created tracker element.
   */
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
  /**
   * Updates the tracker's value.
   * @param {number} val - The new value to update to.
   */
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

/**
 * Clock class: Represents the main countdown clock.
 */
class Clock {
  /**
   * @param {Object} config - Configuration object.
   * @param {Date} config.targetDate - The end time for the countdown.
   * @param {string} config.ElSelector - CSS selector for the parent element where the countdown will be appended.
   * @param {string} config.output - HTML structure for the countdown container.
   * @param {string} config.targetId - ID of the element where the countdown trackers will be appended.
   * @param {Function} [config.callback] - Callback function to execute when the countdown ends.
   */
  constructor(config) {
    this.targetDate = config.targetDate;
    this.parentEl = document.querySelector(config.ElSelector);

    // 직접 입력받은 output을 countdownContainer로 설정
    this.countdownContainer = this.createCountdownContainer(config.output);

    this.countdownDivId = config.targetId;
    this.countdownEl = this.countdownContainer.querySelector(
      `#${this.countdownDivId}`
    );
    this.countdownEl.className = "flip-clock";

    // countdownContainer를 상위 엘리먼트 바로 다음에 삽입
    this.parentEl.insertAdjacentElement("afterend", this.countdownContainer);

    // 콜백 저장
    this.callback = config.callback || function () {};

    this.trackers = this.initializeTrackers();
    setTimeout(this.updateClock.bind(this), 500);
  }
  /**
   * Creates the main countdown container.
   * @param {string} outputHTML - The HTML structure for the countdown container.
   * @returns {HTMLElement} The created countdown container.
   */
  createCountdownContainer(outputHTML) {
    const div = document.createElement("div");
    div.innerHTML = outputHTML;
    return div.firstChild; // 첫 번째 자식 요소를 반환 (입력된 output의 최상위 요소)
  }
  /**
   * Initializes the countdown trackers (Days, Hours, Minutes, Seconds).
   * @returns {Object} Object containing the created tracker instances.
   */
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
  /**
   * Calculates the remaining time for the countdown.
   * @param {Date} endtime - The end time for the countdown.
   * @returns {Object} Object with properties (Total, Days, Hours, Minutes, Seconds) representing the remaining time.
   */
  getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()) - 9 * 60 * 60 * 1000; // Subtracting 9 hours in milliseconds
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

/**
 * DateTimeConverter class: Utility class for date-time conversions.
 */
class DateTimeConverter {
  /**
   * Converts a string representation of date-time to a Date object.
   * @param {string} dateTimeString - String representation of date-time (e.g., "2023/09/22 15:00").
   * @returns {Date} The created Date object.
   */
  static convertStringToDate(dateTimeString) {
    const parts = dateTimeString
      .split(/[/ :]/)
      .map((part) => parseInt(part, 10));
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
  }
}

export { Clock, DateTimeConverter };
