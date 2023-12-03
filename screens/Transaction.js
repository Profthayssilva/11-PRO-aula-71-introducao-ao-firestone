/*Aula 70: Personalização da tela de Transação
    Inserção de Imagem de Fundo e imagens de ícones
    Inserção do formulário de entrada para receber o ID Livro com um botão lateral de scanner */

    import React, { Component } from "react";
    import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image } from "react-native";
    import { Camera } from 'expo-camera';
    
    import { BarCodeScanner } from "expo-barcode-scanner";
    // 10- importar firebase.firestore() como db.
    import db from '../config';

//17: Adicionar as imagens (logotipo, fundo e nomeApp)
const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");


export default class TransactionScreen extends Component {
  //Aula 69: Definir os estados iniciais em nosso App:
  constructor(props){
    super(props);
    this.state = {
      //18- Adicionar 2 novos estados: identificação do aluno e do livro
      bookId: "",
      studentId: "",
      domState: "normal", //Estado do modo: Modo Digitalizar ou Modo Digitalizado
      hasCameraPermissions: null, //Estado de permissões: Se o usuário deu ou não permissão 
      scanned: false, //Estado Digitalizado: Digitalização foi concluída ou não.
    };
  }

  //Aula 69: Criar a função para solicitar permissão para a câmera
  getCameraPermissions = async (domState) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({
      /*status === "granted" é true (verdadeiro) se o usuário concedeu permissão
        status === "granted" é false (falso) se o usuário não concedeu permissão
      */
        hasCameraPermissions: status === "granted",
        domState: domState,
        scanned: false,
    });
  };

  //Aula 69: Criar função para digitalização concluída
  //19- Após o scanner é necessário saber qual QRCode foi lido - Separar bookId e studentId
  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;

    if (domState === "bookId") {
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    } else if (domState === "studentId") {
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    }
  };
  // 4-criar uma função handleTransaction() (vazia)
  handleTransaction = () => {
    // 12-código para obter os dados do documento com o mesmo id do bookId
    var { bookId } = this.state; //Obtem os dados de dentro do documento
    db.collection("books") //db.collection("nome da coleção").doc(id_documento).get -> vai agir assim que o doc for recebido
      .doc(bookId)
      .get()
      .then(doc => { //Com o documento recebido, chama-se then para ler os dados do doc
        console.log(doc.data())
        var book = doc.data();

        // escrever uma condição if-else
        if (book.is_book_available) { //Separando as transações: SE O livro está disponível 
          this.initiateBookIssue(); //Função abstrata: Iniciar retirada do livro
        } else {
          this.initiateBookReturn(); //Função abstrata: Iniciar devolução do livro
        }
      });
  }

  // 14-escrever funções abstratas de emprestimo e devolução dos livros:
  initiateBookIssue = () => {
    console.log("Livro entregue para o aluno!");
  };

  initiateBookReturn = () => {
    console.log("Livro devolvido à biblioteca!");
  };

  render() {
    //Aula 69: Chamar os estados iniciais
    //21- Atualizar os estados iniciais
    const { bookId, studentId, domState, scanned } = this.state;
    
    //Aula 69: Condição para análise de "domState" para ação de scanear
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    //16-Inserir o formulário de entrada para receber o ID Aluno  com um botão lateral de scanner
    //Na sequencia, criar um botão de envio das informações inseridas
    return (
      <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Image source={appName} style={styles.appName} />
        </View>
        <View style={styles.lowerContainer}>
          <View style={[styles.textinputContainer, { marginTop: 25 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={"ID do Livro"}
              placeholderTextColor={"#FFFFFF"}
              value={bookId}
            />
            <TouchableOpacity
              style={styles.scanbutton}
              // 20- chamar a função getCameraPermissions()
              onPress={() => this.getCameraPermissions("bookId")}
            >
              <Text style={styles.scanbuttonText}>Digitalizar</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.textinputContainer, { marginTop: 10 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={"ID do Estudante"}
                placeholderTextColor={"#FFFFFF"}
                value={studentId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                // 20- chamar a função getCameraPermissions()
                onPress={() => this.getCameraPermissions("studentId")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>

            {/* 1- criar o botão Enviar */}

            <TouchableOpacity
              style={[styles.button, {marginTop: 25}]}
              // 3-chamar this.handleTransaction handleTransaction() 
              onPress={this.handleTransaction}
            >
              <Text style={styles.buttonText}> ENVIAR </Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 180,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 20,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  // 2-estilizar botão Enviar.
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Rajdhani_600SemiBold"
  }
});