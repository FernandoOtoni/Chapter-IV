// import { PrismicRichText } from "@prismicio/react"
import { GetStaticProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { getPrismicClient } from "../../../services/prismic"
import * as prismicH from '@prismicio/helpers'

import styles from '../post.module.scss'
import Link from "next/link"

interface PostPreviewProps{
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function PostPreview({post}: PostPreviewProps){
  return(
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}>
          </div>

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={"/"}>
              <a href="">Subscribe now 🤗</a>
            </Link>  
            
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID<any>('publication', String(slug), {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}