import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Modal,
  FlatList
} from "react-native";
import { useState } from "react";

export default function App() {
  const [listeEleve, setListeEleve] = useState([
    {
      id_etudiant: "00",
      nom: "Aucun étudiant sélectionné",
      session: "1",
      cours: [],
    },
    { id_etudiant: "01", nom: "Jean", session: "1", cours: ["Prog1"] },
    { id_etudiant: "02", nom: "Alice", session: "2", cours: ["Prog2"] },
  ]);

  const [etudiant, setEtudiant] = useState(0);
  const [confirmeSelection, setConfirmeSelection] = useState(
    "Selectioner un eleve"
  );
  const [session, setSession] = useState("");
  const [eleve, setEleve] = useState(listeEleve[0]);
  const [nouveauCour, setNouveauCour] = useState("");
  const [modalVisible,setModal] = useState(false);

  //Trouver l'etudiant
  function trouverIndex(value) {
    console.log("je suis ici" + listeEleve);
    let numeroEleve = listeEleve.findIndex(
      (element) => element.id_etudiant == value
    );
    setConfirmeSelection("Selectionner un eleve");
    setSession("");
    console.log(numeroEleve);
    if (numeroEleve > 0) {
      setEtudiant(numeroEleve);
      setEleve(listeEleve[numeroEleve]);
    } else {
      setEtudiant(0);
    }
  }

  function confirmerSelection() {
    console.log(etudiant);
    if (etudiant != 0) {
      setConfirmeSelection("Eleve selectionne.");
      setSession(eleve.session);
    }
  }
  function choisirSession(value) {
    if (confirmeSelection == "Eleve selectionne") {
      setSession(value);
    }
  }
  function ajoutCour(value) {
    setNouveauCour(value);
  }

  function verifierCourValide(cour) {
    if (
      listeEleve[etudiant].cours.length < 5 &&
      !listeEleve[etudiant].cours.includes(cour)
    ) {
      return true;
    } else {
      return false;
    }
  }
  function enregistrer() {
    console.log(`je suis eleve ${eleve}`);
    console.log(`je suis listeEleve: ${listeEleve}`);
    console.log(`Je suis le num etudiant ${etudiant}`);
    if (nouveauCour != "" || null || undefined) {
      /*  setEleve({cours:[...cours,nouveauCour]}) */

      let liste = listeEleve;
      /* setEleve({...eleve, cours:[...cours,nouveauCour]}) */
      let courValide = verifierCourValide(nouveauCour);
      if (courValide) {
        liste[etudiant].cours.push(nouveauCour);
        setListeEleve(liste);
      } else {
        console.log("impossible d'ajouter le cour");
      }

      if (session != listeEleve[etudiant].session) {
        liste[etudiant].session = session;
        setListeEleve(liste);
      }

      console.log(listeEleve);
    }
    setSession("");
    setNouveauCour("");
  }

  function afficher(){
  setModal(true);
  }

  function fermerModal(){
    setModal(false);
  }
  return (
    <View style={styles.container}>
      {/**
       * Session du haut fonctionnel
       */}
      <View>
    
        <Text>Inscription</Text>
        <Text>Id:</Text>
        <TextInput
          onChangeText={(value) => {
            trouverIndex(value);
          }}
        />
        <Text>{eleve.nom}</Text>
        <Pressable style={styles.button} onPress={confirmerSelection}>
          <Text>Choisir etudiant</Text>
        </Pressable>
        <Text>{confirmeSelection}</Text>
      </View>
      <View>
        <Text>Session : {session}</Text>
        <TextInput
          placeholder="Changer session"
          onChangeText={(value) => setSession(value)}
        />
        <Text>Ajout un cours</Text>
        <TextInput
          onChangeText={(value) => {
            ajoutCour(value);
          }}
        />
        <Pressable style={styles.button} onPress={enregistrer}>
          <Text>Enregistrer</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={afficher}
        >
          <Text>Afficher</Text>
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}>
          <View style={styles.modalView}>
            <Text>{eleve.nom},{eleve.id_etudiant}, a la session {eleve.session} prends les cours suuivant:</Text>
            <View style={styles.liste}>
            <FlatList  data={eleve.cours} renderItem={({item:c})=><Text>{c}</Text>} keyExtractor={(item)=>item}/>
            <Pressable style={styles.ok} onPress={fermerModal}><Text>Ok</Text></Pressable>
            </View>
            
          </View>
        </Modal>
      {/**
       * Session du bas fonctionnel a travailler mais la logique est bonne 
       */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    marginTop: 20,
  },
  modalView:{
    width:250,
    height:250,
    backgroundColor:'blue',
    alignSelf:'center',
    marginTop:'25%'
  },
  liste:{
    alignItems:"center"
  },
  ok:{
    
    backgroundColor:'grey',
    padding:5
  }
});
