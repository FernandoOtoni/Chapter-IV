import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, SessionProvider, signOut } from 'next-auth/react'

import styles from "./styles.module.scss"

export function SingInButton(){
 const {data: session} = useSession()  // Verifica se o usuario está logado


  return session ? ( // Se o usuario está logado acontece isso
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
      >
        <FaGithub color='#04d361'/>
        {session.user.name}
        <FiX className={styles.closeIcon} color='#737380'/>
    </button>
  ) : (
    (
      <button  // Se o usuario nao está logado acontece isso
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
      >
        <FaGithub color='#eba417'/>
        Sign in with Github
      </button>
    )
  )
}