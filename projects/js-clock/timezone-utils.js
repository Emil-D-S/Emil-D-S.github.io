// ---- timezone utils ----
function getTZFromQuery(
  defaultTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
) {
  const tz = new URLSearchParams(location.search).get("tz");
  if (!tz) return defaultTZ;
  try {
    // Validate TZ; throws if unknown
    new Intl.DateTimeFormat("en-US", { timeZone: tz }).format(0);
    return tz;
  } catch {
    console.warn("Unknown timeZone:", tz, "— falling back to", defaultTZ);
    return defaultTZ;
  }
}

// Cache a formatter for performance
function makeFormatter(timeZone) {
  // fractionalSecondDigits is supported in modern browsers; we’ll fall back if not
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      fractionalSecondDigits: 3,
    });
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }
}

function getPartsInZone(fmt, now = new Date()) {
  const parts = fmt.formatToParts(now);
  const byType = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const h = Number(byType.hour);
  const m = Number(byType.minute);
  const s = Number(byType.second);
  // If fractionalSecondDigits is supported, part name is "fractionalSecond"
  const hasFrac = "fractionalSecond" in byType;
  const ms = hasFrac
    ? Number(byType.fractionalSecond.padEnd(3, "0"))
    : now.getMilliseconds();
  return { h, m, s, ms };
}
