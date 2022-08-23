import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { GetStaticProps } from 'next'

import styles from './home.module.scss'
import { stripe } from '../services/stripe'

interface HomeProps { //Tipagem da variavel 'product'
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home ig.news</title> //Config da pagina
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}> 
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all publications <br />
            <span>for {product.amount} month</span>          
          </p>

          <SubscribeButton priceId={product.priceId} /> 
          {/* Passa price.id como propriedade para o subscribeButton.jsx */}
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => { 
  // Coleta informação da api e passa para price
  const price = await stripe.prices.retrieve('price_1LOJv0L8ECkrXDf8E4SbwNI5')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100) //Salvar em centavos de dolares
  }
  
  return{
    props: {
      product, //Retorna produto da const 'product'
    },
    revalidate: 60 * 60 * 24 //Tempo que a pagina sera recriada para o usuario
  } 
}