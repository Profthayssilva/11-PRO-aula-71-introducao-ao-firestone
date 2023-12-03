import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
//13- Biblioteca dos ícones
import Ionicons from "react-native-vector-icons/Ionicons"; 

import TransactionScreen from "../screens/Transaction";
import SearchScreen from "../screens/Search";

// 7- navegação na aba inferior foi criada nas aulas anteriores
const Tab = createBottomTabNavigator();

// 8- a classe BottomTabNavigator foi criada nas aulas anteriores
export default class BottomTabNavigator extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
        //  9- função screenOptions()
          screenOptions={({ route }) => ({
             //6- Personalizando o navegador de abas: com cores e ícones
            tabBarActiveTintColor: "#5653D4",
            tabBarInactiveTintColor: "black",
            // 10-definir o campo tabBarIcon
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              // 11-escrever código para retornar o ícone vazio quando a aba estiver ativa
              if (route.name === "Transação") {
                // 14- usar os ícones após importar a biblioteca
                iconName = "book";

              } else if (route.name === "Pesquisa") {
                // 14-usar os ícones após importar a biblioteca
                iconName = "search";
              }
              //retornar os ícones
              return (
                <Ionicons
                  name = {iconName}
                  size = {size}
                  color = {color}
                />
              );
            }
          })}
          // 15- definir as cores ativas e inativas
          // tabBarOptions={{
          //   activeTintColor: "#FFFFFF",
          //   inactiveTintColor: "black",
          //   style: {
          //     height: 130,
          //     borderTopWidth: 0,
          //     backgroundColor: "#5653d4"
          //   },
          //   labelStyle: {
          //     fontSize: 20,
          //     fontFamily: "Rajdhani_600SemiBold"
          //   },
          //   labelPosition: "beside-icon",
          //   tabStyle: {
          //     marginTop: 25,
          //     marginLeft: 10,
          //     marginRight: 10,
          //     borderRadius: 30,
          //     borderWidth: 2,
          //     alignItems: "center",
          //     justifyContent: "center",
          //     backgroundColor: "#5653d4"
          //   }
          // }}
          >
            <Tab.Screen name="Transação" component={TransactionScreen} />
            <Tab.Screen name="Pesquisa" component={SearchScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}