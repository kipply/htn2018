import React, { Component } from 'react';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import logo from './logo.svg';
import './App.css';

var config = {
  apiKey: "AIzaSyANSvJICblrIw2xn735gVVefG6KeCj0elU",
  authDomain: "banana-a5779.firebaseapp.com",
  databaseURL: "https://banana-a5779.firebaseio.com",
  projectId: "banana-a5779",
  storageBucket: "banana-a5779.appspot.com",
  messagingSenderId: "39491740340"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: {}
    }
  }

  componentWillMount(){
    var database = firebase.database();
    var ref = firebase.database().ref('hackthenorth');
    ref.on('value', snapshot => {
      this.setState({ sentences: snapshot.val()});
    });
  }

  render() {
    return (
      <div className="App">
        {
          Object.keys(this.state.sentences).map(key => {
            return (
              <Card className="card">
                <CardContent>
                  {this.state.sentences[key].sentence}
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    );
  }
}

export default App;
