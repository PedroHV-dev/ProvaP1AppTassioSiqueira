import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import CameraComponente from './src/components/Camera';

export default function App() {

  const [cidade, setCidade] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [modal, setModal] = useState(false);

  function notificar() {
    if(cidade != null && bairro != null && rua != null && numero != null && descricao != null) {
      setModal(true)
    } else {
      Alert.alert("Todos os campos são obrigatórios")
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.contentForm}>
        <View style={styles.form}>
          <Text style={styles.text}>Informe a Cidade:</Text>
          <Picker style={styles.selectInput} cidade={cidade} onValueChange={(itemValue, itemIndex) => setCidade(itemValue)}> 
            <Picker.Item label="Vassouras" value="Vassouras"  />
            <Picker.Item label="Barra do Piraí" value="Barra do Piraí"  />
            <Picker.Item label="Mendes" value="Mendes"  />
            <Picker.Item label="Três Rios" value="Três Rios"  />
            <Picker.Item label="Paraíba do Sul" value="Paraíba do Sul"  />
            <Picker.Item label="Miguel Pereira" value="Miguel Pereira"  />
            <Picker.Item label="Valença" value="Valença"  />
            <Picker.Item label="Rio das Flores" value="Rio das Flores"  />
          </Picker>

          <Text style={styles.text}>Informe o bairro:</Text>
          <TextInput style={styles.textInput} onChangeText={setBairro} value={bairro} />

          <Text style={styles.text}>Informe a rua:</Text>
          <TextInput style={styles.textInput} onChangeText={setRua} value={rua} />

          <Text style={styles.text}>Informe o número:</Text>
          <TextInput style={styles.textInput} onChangeText={setNumero} value={numero} />

          <Text style={styles.text}>Descrição:</Text>
          <TextInput style={styles.textInput} onChangeText={setDescricao} value={descricao} />

          <TouchableOpacity style={styles.button} onPress={ () => notificar()}>
              <Text style={styles.buttonText}>
                Notificar
              </Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={modal}>
            <CameraComponente
              cidade={cidade} 
              bairro={bairro} 
              rua={rua} 
              numero={numero}
              descricao={descricao}
            />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  contentForm: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ddd',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 50,
    elevation: 5
  },
  form: {
    width: "100%",
    height: "auto",
    marginTop: 20,
    padding: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold", 
    padding: 5,
  },
  textInput: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#FFF",
    color: "#000",
    borderRadius: 6,
    margin: 5,
    padding: 5,
  },
  selectInput: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#FFF",
    color: "#F7E2E2",
    borderRadius: 6,
    margin: 5,
    padding: 5,
    fontWeight: "bold"
  },
  button: {
    margin: 10,
    backgroundColor: "green",
    alignItems: "center",
    padding: 10,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 24,
    color: "#DEEBF7",
  },
});
