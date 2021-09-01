import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContents from "./components/ReadContents";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';

const express = require("express");
const mysql = require("mysql");
const db = require("./db/index.js");

const app = express();

app.set('port', 3000);

app.get("/nic_name", (req, res) => {
    db.connection.query( `SELECT * FROM nic_name`, (err, results)=>{
        if(err)
          console.log(err);
        res.send(results);
    });
});

app.get("/id", (req, res) => {
    db.connection.query( `SELECT * FROM id`, (err, results)=>{
        if(err)
          console.log(err);
        res.send(results);
    });
});

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide Web!'},
      welcome:{title:'welcome', desc:'Hello, React!!'},
      Contents:[
        {di:1, title:'HTML', desc:'HTML is HyperText Markup Language'},
        {di:2, title:'CSS', desc:'CSS is ...'},
        {di:3, title:'JavaScript', desc:'JavaScript is...'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _this = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _contents = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id+1
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }

    render () {
      return (
      <div className="App">
        <Subject 
        title={this.state.subject.title}
        sub={this.state.subject.sub}
        onClickPage = {function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
        >
        </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number (id)
          });
        }.vind(this)} 
        data={this.state.Contents}
        ></TOC>
       <Control onChangeMode={function(_mode){
         if(_mode === 'delete'){
          if(window.confirm('삭제하시겠습니까?')){
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while(i < _contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i = i + 1;
            }
            this.setState({
              mode:'welcome',
              contents:_contents
            })
          }
         } else {
           this.setState({
             mode:_mode
            }) 
         }
       }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;