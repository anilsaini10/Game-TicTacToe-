import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { render } from 'react-dom';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import Home from './home';


export default class App extends React.Component  {
 
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer : 1,
    });
  }

  gameWinner = () => {
    const NUM_TILES = 3;
    var arr =this.state.gameState;
    var sum;

    //row
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //col
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return -1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return -1; }
    else if (sum == -3) { return -1; }

    return 0;
  }

  newGame = () =>{
    this.initializeGame()
  }
  onTitlePress = (row, col) => {

    var value = this.state.gameState[row][col];
    if (value != 0) { return; }

    // present player
    var currentPlayer = this.state.currentPlayer;

    //set present title
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //next player
    var nextPlayer = (currentPlayer ==1) ? -1 :1;
    this.setState({currentPlayer:nextPlayer});


    //find winners
    var winner = this.gameWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is winner");
      this.initializeGame();
    }
    if (winner == -1) {
      Alert.alert("Player 2 is winner");
      this.initializeGame();
    }
    return 0;
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="close" style={styles.titleX} />;
      case -1: return <Icon name="circle-outline" style={styles.titleO} />;
      default: return <View />;
    }
  }

  render() {
    
    return (
      
     
      <View style={styles.container}>
        <View style ={styles.home}>
         <Home/>
      </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

          <TouchableOpacity onPress={() => this.onTitlePress(0, 0)} style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]} >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTitlePress(0, 1)} style={[styles.title, { borderTopWidth: 0 }]} >
          
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTitlePress(0, 2)} style={[styles.title, { borderTopWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity onPress={() => this.onTitlePress(1, 0)} style={[styles.title, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTitlePress(1, 1)} style={[styles.title, {}]} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTitlePress(1, 2)} style={[styles.title, { borderRightWidth: 0 }]} >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>

        </View>


        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 0)} style={[styles.title, { borderBottomWidth: 0, borderLeftWidth: 0 }]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 1)} style={[styles.title, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePress(2, 2)} style={[styles.title, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
        <Button  title="New Game" onPress = {this.newGame} />

        </View>
      </View>
    );
  
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'yellow',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'yellow'
  },
  title: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },
  titleX: {
    color: "red",
    fontSize: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  titleO: {
    color: 'blue',
    fontSize: 50,
    flex: 1,
    // alignItems:"center",
    // justifyContent:"center",
  },
 
});
