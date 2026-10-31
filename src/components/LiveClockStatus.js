import React, { useState, useEffect } from "react";

// Cache formatters globally to eliminate repetitive GC memory allocations every second
let istTimeFormatter;
let istHourFormatter;

try {
  istTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  istHourFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  });
} catch {
  // Fallback for older JS engines
}

export default function LiveClockStatus() {
  const [timeStr, setTimeStr] = useState("");
  const [isWorkingHour, setIsWorkingHour] = useState(true);

  useEffect(() => {
    let intervalId = null;

    const updateTime = () => {
      try {
        const now = new Date();
        if (istTimeFormatter && istHourFormatter) {
          setTimeStr(istTimeFormatter.format(now));
          const currentHour = parseInt(istHourFormatter.format(now), 10);
          setIsWorkingHour(currentHour >= 9 && currentHour <= 23);
        } else {
          setTimeStr(now.toLocaleTimeString());
        }
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    intervalId = setInterval(updateTime, 1000);

    // Performance: Pause interval when tab is in background
    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        updateTime();
        intervalId = setInterval(updateTime, 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="live-clock-pill" title="Current local time in Ahmedabad, Gujarat, India">
      <div className="live-clock-badge">
        <span className={`live-beacon ${isWorkingHour ? "beacon-active" : "beacon-sleep"}`}></span>
        <span className="live-status-label">
          {isWorkingHour ? "Active & Available" : "Available · Replying Soon"}
        </span>
      </div>

      <div className="live-clock-time">
        <span className="live-clock-loc">Ahmedabad (IST)</span>
        <span className="live-clock-digit">{timeStr || "Loading..."}</span>
      </div>
    </div>
  );
}
