import React from 'react'
import RenderComponent from './RenderComponent'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ListItems = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Item = styled(motion.div)`
  flex: 1 auto auto;
  min-width: 0;
`

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const items = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const List = ({ listItems }) => {
  return (
    <ListItems variants={container} initial='hidden' animate='show'>
      {listItems.map((item) => {
        return (
          <Item variants={items} key={item._id}>
            <RenderComponent component={item} />
          </Item>
        )
      })}
    </ListItems>
  )
}

export default List
