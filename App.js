import React, { Component } from "react";

//2: Importação bibliotecas já instaladas - Fonte para personalizar 
import { Rajdhani_600SemiBold } from "@expo-google-fonts/rajdhani";
import * as Font from "expo-font";

import BottomTabNavigator from "./components/BottomTabNavigator";

export default class App extends Component {
  //3: Criação de uma variável  "fonteCarregada" (fontLoaded) para ser inicializada
  constructor() {
    super();
    this.state = {
      fontLoaded: false //Inicialmente falso, pois a fonte não carregou. 
    };
  }

  //4: Função da Fonte de personalização: async: Função assíncrona - A Fonte irá carregar e seu estado será verdadeiro
  async loadFonts() {
    await Font.loadAsync({
      Rajdhani_600SemiBold: Rajdhani_600SemiBold
    });
    this.setState({ fontLoaded: true });
  }

  //5: Chamada da função da fonte
  componentDidMount() {
    this.loadFonts();
  }

  render() {
    //6: Condição para garantir que as fontes sejam carregadas antes de renderizar qualquer coisa na tela
    const { fontLoaded } = this.state;
    if (fontLoaded) {
      return <BottomTabNavigator />;
    }
    return null;
  }
}