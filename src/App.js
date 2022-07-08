import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { CreateContainer, Header, MainContainer } from './components/index'
import { useStateValue } from './Context/StateProvider'
import { actionType } from './Context/reducer'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestore } from './firebase/firebase'


function App() {

  const scrollbar = useRef()
  const [color, setColor] = useState('')
  const [{ foodItems } , dispatch] = useStateValue()

  const collectionRef = collection(firestore , 'foodItems')
  const q = query(collectionRef , orderBy('id' , 'desc'))

  const memoizeFoodItems = useCallback(() => {
    // Differently from getDocs() , onSnapShot() listens datas and when any changes have happened datas will be fetched again 
    // that's why I think onSnapShot() is more useful than getDocs() .
    onSnapshot(q , (snap) => {  
      const data = snap.docs.map((item) => {
        return {...item.data() , id: item.id}
      })
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })

  } , [foodItems])

  const memoizeScrollbarPosition = useMemo(() => {
    scrollbar?.current?.addEventListener("scroll", () => {
      if (scrollbar.current.scrollTop > 50) {
        setColor('bg-primary')
      } else {
        setColor('')
      }
    })
  } , [scrollbar?.current?.scrollTop])

  useEffect(() => {
    memoizeFoodItems()
    return memoizeScrollbarPosition
  }, [])
  
  return (
    <AnimatePresence exitBeforeEnter>
        <div ref={scrollbar} className='w-screen h-screen flex flex-col bg-primary scrollbar scrollbar-width-y-2
        scrollbar-thumb-radius-lg scrollbar-track-inherit overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500'>
            <Header headerColor={color} />
            <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
                <Routes>
                    <Route path='/*' element={<MainContainer />} />
                    <Route path='/createItem' element={<CreateContainer />} />
                </Routes>
            </main>
        </div>
    </AnimatePresence>
  )
}

export default App