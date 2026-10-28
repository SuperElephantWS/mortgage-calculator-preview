export default function WeatherWidget() {
  return (
    <aside className="weather-toolbar" aria-label="Local weather">
      <details className="weather-widget">
        <summary className="weather-toggle">
          <i className="fas fa-cloud-sun" aria-hidden="true" />
          Weather
          <i className="fas fa-chevron-down weather-chevron" aria-hidden="true" />
        </summary>
        <div className="weather-panel">
          <iframe
            className="weather-frame"
            src="https://weather-app-sjqi.onrender.com/"
            allow="geolocation"
            title="City weather"
            loading="lazy"
          />
        </div>
      </details>
    </aside>
  );
}
