import React, {Component} from 'react';

import {Fire, Hit, MAKE_HIT, Turn} from '../redux/actions';
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';

const startButton = require('../assets/button.png');

class SpeechRecognizer {
  constructor({time, store}) {
    this.store = store;
    this.time = time;
    this.recognizedText = '';
    this.timer = null;
    this.running = false;
  }

  start(text, cb) {
    this.recognizedText = text;
    this.timer = setTimeout(async () => {
      await cb();
      console.log('running ' + this.running);
      if (this.running) {
        this.running = false;
        console.log('running set ' + this.running);
      } else {
        this.running = true;
        console.log('running set ' + this.running);
        this.recognize(this.recognizedText);
      }
    }, this.time);
  }

  update(text, cb) {
    clearTimeout(this.timer);
    this.start(text, cb);
  }

  wordToNumber(word) {
    switch (word.slice(0, 2)) {
      case 'но':
        return 0;
      case 'од':
        return 1;
      case 'дв':
        return 2;
      case 'тр':
        return 3;
      case 'че':
        return 4;
      case 'пя':
        return 5;
      case 'ше':
        return 6;
      case 'се':
        return 7;
      case 'во':
        return 8;
      case 'де':
        return 9;
    }
  }

  charToNumber(char) {
    switch (char.slice(0, 1)) {
      case 'А':
        return 0;
      case 'Б':
        return 1;
      case 'В':
        return 2;
      case 'Г':
        return 3;
      case 'Д':
        return 4;
      case 'Е':
        return 5;
      case 'Ж':
        return 6;
      case 'З':
        return 7;
      case 'И':
        return 8;
      case 'К':
        return 9;
    }
  }

  recognize(text) {
    const wordsToPosition = (x, y) => [
      this.wordToNumber(x),
      this.charToNumber(y),
    ];
    const isValid = v => v !== undefined && v > -1 && v < 10;

    let words = text.split(' ');
    console.log(text, words);
    words = words.filter(s => s !== 'Мимо');

    if (words && words.length === 1) {
      if (words[0] === 'Попал') {
        this.store.dispatch(Hit());
        this.store.dispatch(
          Turn([
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
          ]),
        );
      }
    } else if (words && words.length > 1) {
      const [x, y] = wordsToPosition(words[1], words[0]);
      console.log(`Position: x=${x}, y=${y}`);
      if (isValid(x) && isValid(y)) {
        this.store.dispatch(Fire([x, y]));
      } else {
        console.log('not valid', typeof x, x);
      }
    }
  }
}

class StartGameButton extends Component<Props, State> {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: '',
    partialResults: [],
    skip: 0,
  };

  constructor(props: Props) {
    super(props);

    this.timer = new SpeechRecognizer({time: 1500, store: props.store});
    this.store = props.store;

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onEnemyTurn;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  componentDidMount() {
    this._startRecognizing();
  }

  onSpeechStart = (e: any) => {
    // console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onEnemyTurn = (e: SpeechRecognizedEvent) => {
    console.log('EnemyTurn onSpeechRecognized: ', e);
    if (!e.isFinal) {
      this.timer.update(this.state.results, async () => {
        this.setState({skip: this.state.results.length});
        this._stopRecognizing();
        this._startRecognizing();
      });
    }

    this.setState({
      recognized: '√',
    });
  };

  onOwnTurn = (e: SpeechRecognizedEvent) => {
    console.log('OwnTurn onSpeechRecognized: ', e);
  };

  onSpeechEnd = (e: any) => {
    // console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    // console.log('onSpeechError: ', e);

    if (e.error.code === 'recognition_fail') {
      this._startRecognizing();
    }

    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value[0] !== this.state.results) {
      // console.log('onSpeechResults: ', e);

      this.setState({
        results: e.value[0].slice(this.state.skip),
      });
    }
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    // console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    // console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: '',
      partialResults: [],
      end: '',
      skip: 0,
    });

    try {
      await Voice.start('ru-RU');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: '',
      partialResults: [],
      end: '',
      skip: 0,
    });
  };

  render() {
    return (
      <View>
        {/*<Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>*/}
        {/*<Text*/}
        {/*  style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>*/}
        {/*<Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>*/}
        {/*<Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>*/}
        {/*<Text style={styles.stat}>Results</Text>*/}
        {/*<Text key={'result-1'} style={styles.stat}>*/}
        {/*  {this.state.results}*/}
        {/*</Text>*/}
        {/*{this.state.results.map((result, index) => {*/}
        {/*  return (*/}
        {/*    <Text key={`result-${index}`} style={styles.stat}>*/}
        {/*      {result}*/}
        {/*    </Text>*/}
        {/*  );*/}
        {/*})}*/}
        {/*<Text style={styles.stat}>Partial Results</Text>*/}
        {/*{this.state.partialResults.map((result, index) => {*/}
        {/*  return (*/}
        {/*    <Text key={`partial-result-${index}`} style={styles.stat}>*/}
        {/*      {result}*/}
        {/*    </Text>*/}
        {/*  );*/}
        {/*})}*/}
        {/*<Text style={styles.stat}>{`End: ${this.state.end}`}</Text>*/}
        {/*<TouchableHighlight onPress={this._startRecognizing}>*/}
        {/*  <Image style={styles.button} source={startButton} />*/}
        {/*</TouchableHighlight>*/}
        {/*<TouchableHighlight onPress={this._stopRecognizing}>*/}
        {/*  <Text style={styles.action}>Stop Recognizing</Text>*/}
        {/*</TouchableHighlight>*/}
        {/*<TouchableHighlight onPress={this._cancelRecognizing}>*/}
        {/*  <Text style={styles.action}>Cancel</Text>*/}
        {/*</TouchableHighlight>*/}
        {/*<TouchableHighlight onPress={this._destroyRecognizer}>*/}
        {/*  <Text style={styles.action}>Destroy</Text>*/}
        {/*</TouchableHighlight>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  provider: {
    padding: '48px',
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default StartGameButton;
