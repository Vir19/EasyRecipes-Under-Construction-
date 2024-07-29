/* import PropTypes from 'prop-types'; */

function Main() {
  return (
    <main className="name">
      <img
        src="https://i.blogs.es/8c3360/pollo_curry/1366_2000.jpg"
        alt="Pollo al Curry"
      />
      {/* la lista ingredientes seguramente será un comp */}
      <section>
        <ul>
          <li>Pechuga de pollo</li>
          <li>Cebolleta</li>
          <li>Dientes de ajo</li>
          <li>Jengibre fresco</li>
          <li>Guindilla pequeña</li>
        </ul>
      </section>
      <section>
        <p></p>
      </section>
    </main>
  );
}

/* Main.propTypes = {
}; */

export default Main;
