import Head from 'next/head'
import Featured from '../component/Featured'
import PizzaList from '../component/PizzaList'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { useState } from 'react'
import Add from '../component/Add'
import AddButton from '../component/AddButton'

export default function Home({ pizzaList, admin }) {

  const [close, setClose] = useState(true)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best PIZZA SHOP IN TOWN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  const res = await axios.get("https://restaurant-silk-xi.vercel.app/api/products");
  return{
    props:{
      pizzaList: res.data,
      admin
    }
  }
}
