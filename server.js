require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT  ;
const client = new pg.Client(process.env.DATABASE_URL);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public')); 
app.set('view engine', 'ejs'); 
app.use(express.json());
////////////////////////
app.use('/',mainPage);
app.get('/search',searchHandler);
//app.get('/allcountries',allc);
///////////////////////
function mainPage(req,res){
    res.render('index');
}

function searchHandler(req,res){
   let title = req.query.country;
   let sDate = req.query.startD;
    let eDate = req.query.endD;
  let url =`https://api.covid19api.com/country/${title}/status/confirmed?from=${sDate}&to=${eDate}`;
  superagent.get(url)
  .then(data=>{
      alldata=data.body.map(i=>{
     return new Country(i);
      })
      res.render('./pages/spec',{total:alldata});
  })
}
/*function allc(req,res){

    let url=`https://api.covid19api.com/summary`
    superagent.get(url)
    .then(co=>{
        res.render('./pages/allco',{co:})
    })
}*/




function Country(value){
    this.date=value.Date;
    this.case=value.Cases;
}
    
   
        app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT}`)
        })
  
