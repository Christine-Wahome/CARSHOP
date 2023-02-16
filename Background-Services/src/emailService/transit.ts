import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import sendMail from '../helpers'
import mssql from 'mssql'
import { sqlConfig } from '../config'
dotenv.config({ path: path.resolve(__dirname, '../.env') })


interface Order{
    id:string,
    userName:string,
    carId:string,
    email:string,
    carName:string,
    carPrice:number,
    isDelete:string
  }
const sendTransitEmail = async () => {
  const pool = await mssql.connect(sqlConfig)
  const users:Order[] = await(await pool.request().execute(' SpSendTransitEmail')).recordset
  // console.log(users);
  for(let user of users){


    ejs.renderFile('templates/inTransit.ejs',{userName:user.userName}, async (error, html) => {
        
        //message configuration
      const message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "NodeMailer",
        html
      };
      //  console.log(html);
       
        //sending email
      try {
        await sendMail(message)
        await pool.request()
        .execute(` SpSendTransitEmail`)
      } catch (error:any) {
        console.log(error.message);
        
      }
    
    })
    }
}



export default sendTransitEmail