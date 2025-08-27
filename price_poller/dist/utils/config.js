"use strict";
/*
//TODO: use cron job , but why this is not enough , what is wrong in this
//TODO: axios request can fail , how do we add reties logic ?

import axios from "axios";

setInterval(async ()=>{
  const date = Math.floor(Date.now() / 1000);
  const startTime = date - (1 * 60);
  const endTime=date ;
  try{
    const res = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1m&startTime=${startTime}&endTime=${endTime}`);
  console.log(res.data);
  }catch(err){
  console.log(err);
  }
},1000 * 60);


setInterval(async ()=>{
  const date = Math.floor(Date.now() / 1000);
  const startTime = date - (3 * 60);
  const endTime=date ;
  try{
    const res = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1m&startTime=${startTime}&endTime=${endTime}`);
  console.log(res.data);
  }catch(err){
  console.log(err);
  }
},1000 * 60 * 3);


setInterval(async ()=>{
  const date = Math.floor(Date.now() / 1000);
  const startTime = date - (5 * 60);
  const endTime=date ;
  try{
    const res = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1m&startTime=${startTime}&endTime=${endTime}`);
  console.log(res.data);
  }catch(err){
  console.log(err);
  }
},1000 * 60 * 5);



setInterval(async ()=>{
  const date = Math.floor(Date.now() / 1000);
  const startTime = date - (15 * 60);
  const endTime=date ;
  try{
    const res = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1m&startTime=${startTime}&endTime=${endTime}`);
  console.log(res.data);
  }catch(err){
  console.log(err);
  }
},1000 * 60 * 15);



setInterval(async ()=>{
  const date = Math.floor(Date.now() / 1000);
  const startTime = date - (1 * 60);
  const endTime=date ;
  try{
    const res = await axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1m&startTime=${startTime}&endTime=${endTime}`);
  console.log(res.data);
  }catch(err){
  console.log(err);
  }
},1000 * 60);
 */
