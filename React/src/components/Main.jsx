/* import PropTypes from 'prop-types'; */

function Main() {
  return (
    <main className="main">
      <div className="flexMain">
        <img
          className="foodPic"
          src="https://i.blogs.es/8c3360/pollo_curry/1366_2000.jpg"
          alt="Pollo al Curry"
        />
        {/* la lista ingredientes seguramente será un comp */}
        <section className="ingredientListSection">
          <ul className="ingredientList">
            <li className="ingredient">Pechuga de pollo</li>
            <li className="ingredient">Cebolleta</li>
            <li className="ingredient">Jengibre fresco</li>
            <li className="ingredient">Dientes de ajo</li>
            <li className="ingredient">Guindilla pequeña</li>
          </ul>
        </section>
      </div>
      <section className="preparationSection">
        <p className="preparation">
          Lo primero es tener preparados todos los ingredientes. Cortar el pollo
          en piezas de un bocado. Picar la cebolleta y muy fino el diente de
          ajo, el jengibre y la guindilla sin las semillas, si la usamos. Si
          usamos cebolla troceada congelada ahorraremos aún más tiempo. Calentar
          un poco de aceite en una sartén o cazuela y freír la cebolleta 2
          minutos. Agregar el ajo, el jengibre y la guindilla, dar unas vueltas
          e incorporar el tomate. Pasado 1 minuto, agregar todas las especias y
          remover bien. Incorporar el pollo, salpimentar y mezclar. Cocinar a
          fuego fuerte unos pocos minutos, hasta que esté dorado por todas
          partes. Cubrir con la leche de coco o nata y dejar reducir
          ligeramente. Servir con perejil o cilantro fresco picado.{" "}
        </p>
      </section>
    </main>
  );
}

/* Main.propTypes = {
}; */

export default Main;
