import React, { useState } from 'react';

function App() {
  // Variables d'état
  const [nombreAleatoire] = useState(genererNombreAleatoire());
  const [essai, setEssai] = useState('');
  const [tentativesRestantes, setTentativesRestantes] = useState(5);
  const [partieTerminee, setPartieTerminee] = useState(false);
  const [messageComparaison, setMessageComparaison] = useState('');
  const [nombresEntres, setNombresEntres] = useState([]);

  // Fonction pour générer un nombre aléatoire entre 1 et 100
  function genererNombreAleatoire() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Fonction pour gérer la soumission du formulaire de devinette
  function gererSoumission(event) {
    event.preventDefault();
    const essaiUtilisateur = parseInt(essai, 10);
    setNombresEntres([...nombresEntres, essaiUtilisateur]);

    if (essaiUtilisateur === nombreAleatoire) {
      setMessageComparaison('Félicitations ! Vous avez deviné le bon nombre.');
      setPartieTerminee(true);
    } else {
      const message = essaiUtilisateur < nombreAleatoire ? `Le nombre aléatoire est plus grand que ${essaiUtilisateur}.` : `Le nombre aléatoire est plus petit que ${essaiUtilisateur}.`;
      setMessageComparaison(message);
      setTentativesRestantes(prevTentatives => prevTentatives - 1);

      if (tentativesRestantes === 1) {
        setPartieTerminee(true);
        setMessageComparaison(`Désolé, vous avez épuisé vos essais. Le nombre était ${nombreAleatoire}.`);
      }
    }
  }

  // Fonction pour recommencer le jeu
  function recommencerJeu() {
    setEssai('');
    setTentativesRestantes(5);
    setPartieTerminee(false);
    setMessageComparaison('');
    setNombresEntres([]);
  }

  return (
    <div className="App">
      <h1>Devine-moi</h1>
      <p>Choisissez un nombre entre 1 et 100.</p>
      { tentativesRestantes !== 5 && !partieTerminee && <p>Essais restants : {tentativesRestantes}</p> }
      {messageComparaison && <p>{messageComparaison}</p>}
      {nombresEntres.length > 0 && (
        <p>Nombres entrés : {nombresEntres.join(', ')}</p>
      )}
      {!partieTerminee && (
        <form onSubmit={gererSoumission}>
          <div className="input-container"> 
            <input type="number" value={essai} onChange={(event) => setEssai(event.target.value)} min="1" max="100" required/>
            <button type="submit">Entrer chiffre</button>
          </div>
        </form>
      )}
      {partieTerminee && (
        <div>
          <p>La partie est terminée.</p>
          <button onClick={recommencerJeu}>Recommencer</button>
          {messageComparaison.includes("épuisé") && <p><b>Reessayez!</b></p>}
          <i className="fas fa-heart-broken"></i>
        </div>
      )}
    </div>
  );
}

export default App;
