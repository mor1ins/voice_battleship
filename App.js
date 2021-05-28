import React, {Component} from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import Push from 'appcenter-push';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSaga from 'redux-saga';

import Game from './app/components/Game';
import reducer from './app/redux/reducers';
import getInitialState from './app/utils/mockState';
import {gameCompleted} from './app/redux/sagas';

import Tts from 'react-native-tts';
Tts.setDefaultLanguage('ru-RU');

const styles = StyleSheet.create({
  view: {
    height: '100%',
    justifyContent: 'center',
  },
});

type Props = {};
type State = {
  recognized: string,
  pitch: string,
  error: string,
  end: string,
  started: string,
  results: string[],
  partialResults: string[],
};

const saga = createSaga();
const store = createStore(reducer, getInitialState(), applyMiddleware(saga));
// Push.setListener({
//   onPushNotificationReceived({message, title}) {
//     Alert.alert(title, message);
//   },
// });
saga.run(gameCompleted);

Tts.speak('Игра начинается. Ходи как только будешь готов');

class App extends Component<Props, State> {
  render() {
    // return (
    //   <Provider store={store}>
    //     <Game />
    //   </Provider>
    // );
    return (
      <View style={styles.view}>
        <Provider store={store}>
          <Game store={store} />
        </Provider>
      </View>
    );
    {
      /*<Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>*/
    }
    {
      /*<Text*/
    }
    {
      /*  style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>*/
    }
    {
      /*<Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>*/
    }
    {
      /*<Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>*/
    }
    {
      /*<Text style={styles.stat}>Results</Text>*/
    }
    {
      /*<Text key={'result-1'} style={styles.stat}>*/
    }
    {
      /*  {this.state.results}*/
    }
    {
      /*</Text>*/
    }
    {
      /*{this.state.results.map((result, index) => {*/
    }
    {
      /*  return (*/
    }
    {
      /*    <Text key={`result-${index}`} style={styles.stat}>*/
    }
    {
      /*      {result}*/
    }
    {
      /*    </Text>*/
    }
    {
      /*  );*/
    }
    {
      /*})}*/
    }
    {
      /*<Text style={styles.stat}>Partial Results</Text>*/
    }
    {
      /*{this.state.partialResults.map((result, index) => {*/
    }
    {
      /*  return (*/
    }
    {
      /*    <Text key={`partial-result-${index}`} style={styles.stat}>*/
    }
    {
      /*      {result}*/
    }
    {
      /*    </Text>*/
    }
    {
      /*  );*/
    }
    {
      /*})}*/
    }
    {
      /*<Text style={styles.stat}>{`End: ${this.state.end}`}</Text>*/
    }
    {
      /*<TouchableHighlight onPress={this._startRecognizing}>*/
    }
    {
      /*  <Image style={styles.button} source={require('./button.png')} />*/
    }
    {
      /*</TouchableHighlight>*/
    }
    {
      /*<TouchableHighlight onPress={this._stopRecognizing}>*/
    }
    {
      /*  <Text style={styles.action}>Stop Recognizing</Text>*/
    }
    {
      /*</TouchableHighlight>*/
    }
    {
      /*<TouchableHighlight onPress={this._cancelRecognizing}>*/
    }
    {
      /*  <Text style={styles.action}>Cancel</Text>*/
    }
    {
      /*</TouchableHighlight>*/
    }
    {
      /*<TouchableHighlight onPress={this._destroyRecognizer}>*/
    }
    {
      /*  <Text style={styles.action}>Destroy</Text>*/
    }
    {
      /*</TouchableHighlight>*/
    }
    //    </View>
    // );
  }
}

export default App;
