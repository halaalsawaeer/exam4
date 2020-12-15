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
app.get('/',mainPage);
app.post('/search',searchHandler2);
app.get('/allcon',allcon);
//app.get('/allcountries',allc);
///////////////////////
function mainPage(req,res){
    res.render('index');
}

function searchHandler(req,res){
   let title = req.query.country;
   console.log('hi');
   let sDate = req.query.startD;
   console.log(req.query.startD);
    let eDate = req.query.endD;
  let url =`https://api.covid19api.com/country/${title}/status/confirmed?from=${sDate}&to=${eDate}`;
  superagent.get(url)
  .then(data=>{
      console.log(data.body)
      alldata=data.body.map(i=>{
     return new Country(i);
      })
      res.render('./pages/spec',{total:alldata});
  })
}

function searchHandler2(req,res){
    console.log('hi');
}
/*function allc(req,res){

    let url=`https://api.covid19api.com/summary`
    superagent.get(url)
    .then(co=>{
        res.render('./pages/allco',{co:})
    })
}*/

function allcon(req,res){
    let url=`https://api.covid19api.com/summary`
    superagent.get(url)
    .then(()=>{
        res.render('./pages/allco',)
    })
}


function Country(value){
    this.date=value.Date;
    this.case=value.Cases;
}
    function AllCount(val){
        this.totalCon=val.TotalConfirmed;
        this.totalD=val.TotalDeaths;
        this.totalRC=val.TotalRecovered
    }
   

    client.connect()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT}`)
        })
       
    })   
  
       
  
