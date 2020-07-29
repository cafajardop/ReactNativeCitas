import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  // mostrar ventanas adminsitrado de citas
  const [mostrarForm, guardarMostrarForm] = useState(false);

  //Definir el state de citas
  const [citas, setCitas] = useState([]);

  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  //Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado = () =>{
      Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo} >Administrador de Citas</Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}> {mostrarForm ? 'Cancelar Crear Cita': 'Crear Nueva Cita'} </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
              <>
                <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'} </Text>
                <FlatList style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;