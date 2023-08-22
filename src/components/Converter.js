import {React, useEffect, useState} from 'react';
import { Button, Card, Form, Input, Select} from 'antd';
import { RiCoinsLine} from "react-icons/ri";


function Converter() {


const defaultFirstSelectValue = "Bitcoin";
const defaultSecondSelectValue = "Ether";


 const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates'
const [cryptoList, setCryptoList] =useState([]);
const [inputValue, setInputvalue] = useState("0");
const [firstSelect, setFirstSelect] =useState(defaultFirstSelectValue);
const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue)
const [result, setResult] = useState("0");


//  const names = [ {
//   value: 'jack',
//   label: 'Jack (100)',
// },
// {
//   value: 'lucy',
//   label: 'Lucy (101)',
// },
// {
//   value: 'disabled',
//   label:'disabled',
// },
// ]

useEffect (() => {
fetchData();

}, []);


async function fetchData(){
  const response = await fetch(apiUrl);
  const jsonData = await response.json();



  const data = jsonData.rates;
  // const tempArray = [];

  // Object.entries(data).forEach(item => {
  //   const tempObj = {
  //     value: item[1].name,
  //     label: item[1].name,
  //     rate: item[1].value
  //   }
  //   tempArray.push(tempObj);
  // })

  const tempArray = Object.entries(data).map(item => {
    return{
      value: item[1].name,
      label: item[1].name,
      rate: item[1].value
    }
  })



  setCryptoList(tempArray);
}


useEffect(() => {

  if(cryptoList.length  == 0) return;

const firstSelectRate = cryptoList.find((item) => {
  return item.value === firstSelect
}).rate;

const secondSelectRate = cryptoList.find((item) => {
  return item.value === secondSelect
}).rate;

const result = (inputValue * secondSelectRate) / firstSelectRate;


setResult(result.toFixed(4));

}, [inputValue, firstSelect, secondSelect ]);

  return (
    <div className={"container"} >
      <Card className="crypto-card" title={<h1> <RiCoinsLine/> Crypto Converter</h1>}>
       <Form size='large' >
<Form.Item>

  <Input onChange={(event) => setInputvalue(event.target.value)} />
</Form.Item>

       </Form>
       <div className={"maintain-box"} >
        
<Select 
style={{width: '160px'}} 
defaultValue = {defaultFirstSelectValue}
 options= {cryptoList}
 onChange = {(value) => setFirstSelect(value)}

 />
<Select
 style={{width: '160px'}} 
defaultValue = {defaultSecondSelectValue}
 options= {cryptoList} 
 onChange = {(value) => setSecondSelect(value)}

 />
       </div>
       <p>{inputValue} {firstSelect} = {result} {secondSelect} </p>
      </Card>
    </div>
  )
}

export default Converter;