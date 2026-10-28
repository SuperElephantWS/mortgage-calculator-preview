export default function WeatherWidget() {
  return (
    <section
      aria-labelledby="weather-heading"
      style={{ maxWidth: '900px', margin: '32px auto', padding: '0 16px' }}
    >
      <h2 id="weather-heading">Explore the weather</h2>
      <iframe
        src="https://weather-app-sjqi.onrender.com/"
        allow="geolocation"
        title="City weather"
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: '600px',
          border: 0,
          borderRadius: '16px',
        }}
      />
    </section>
  );
}
