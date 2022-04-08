import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function CameraComponente(props) {
    const ref = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [captured, setCaptured] = useState(null);
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [message, setMessage] = useState(false)

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
        (async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
        (async () => {
            const { statusLoc } = await Location.requestForegroundPermissionsAsync();
            if (statusLoc !== 'granted') {
                setErrorMsg('Permissão negada!');
        }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso a câmera</Text>;
    }

    async function armazenarLocalizacao() {
        
        let actualLocation = await Location.getCurrentPositionAsync({});
        setLocation(actualLocation.coords);
        
        if (errorMsg) {
        text = errorMsg;
        } else if (location) {
        text = JSON.stringify(location);
        }
    }

    async function tirarFoto() {
        if (ref) {
          const opt = {
            quality: 0.8,
            base64: true,
            flexOrientation: true,
            forceUpOrientation: true,
          }
          armazenarLocalizacao();
          const data =  await ref.current.takePictureAsync(opt);
          await MediaLibrary.saveToLibraryAsync(data.uri);
          setCaptured(data.uri);
          setOpen(true);
          console.log(location)
        }
    }

    async function confirmarEnvioFoto() {
        const opt = {
            quality: 0.8,
            base64: true,
            flexOrientation: true,
            forceUpOrientation: true,
        }
        armazenarLocalizacao();
        const data =  await ref.current.takePictureAsync(opt);
        await MediaLibrary.saveToLibraryAsync(data.uri);
        setMessage(true);
        console.log('Localização: ', location)
        console.log('Diretório da foto: ', data.uri)
        if (props.cidade != null && props.bairro != null && props.rua != null && props.numero != null && props.descricao != null) {
            console.log(`Informações vindas do Form: ${props.cidade}_${props.bairro}_${props.rua}_${props.numero}_${props.descricao}`) 
        }
    }

    return (
        <SafeAreaView>
            <Camera style={styles.camera} ref={ref}>
             <View style={styles.buttonContainer}>
               <TouchableOpacity
                 style={styles.buttonTake}
                 onPress={tirarFoto}>
                 <Text style={styles.text}> Take </Text>
               </TouchableOpacity>
             </View>
           </Camera>
           <Modal transparent={true} visible={open}>
             <View style={styles.contentPhoto}>
               <Image style={styles.img} source={{uri: captured}} />
               <View style={styles.contentButtons}>
                <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
                    <Text style={styles.text}> Rep </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonEnviar} onPress={confirmarEnvioFoto}>
                    <Text style={styles.text}> Ok </Text>
                </TouchableOpacity>
               </View>
             </View>
             <Modal transparent={true} visible={message}>
                <View style={styles.contentMessage}>
                <Text style={styles.message}>Muito obrigado por relatar essa situação</Text>
                </View>
            </Modal>
           </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    }, 
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTake: {
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        height: 50,
        borderRadius: 50,
    },
    contentPhoto: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    img: {
        width: '75%',
        height: '65%',
    },
    contentButtons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonClose: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    buttonEnviar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    text: {
        color: '#FFF'
    },
    contentMessage: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    message: {
        color: '#000',
        fontSize: 23,
        fontWeight: 'bold'
    }
});