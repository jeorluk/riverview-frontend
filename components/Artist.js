import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import styled from 'styled-components'

const ArtistStyles = styled.div`
  margin: 5px;
  background-color: white;
  border: 2px solid red;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    /* height: 400px; */
    object-fit: cover;
  }
  h2 {
    padding: 0 1.5rem;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
`
class Artist extends Component {
  static propTypes = {
    artist: PropTypes.object.isRequired,
  }
  render() {
    const { artist } = this.props
    return (
      <ArtistStyles
        onClick={() => {
          Router.push({
            pathname: '/artist',
            query: { id: artist.id },
          })
        }}
      >
        <img src={artist.largeImage} alt='Photo' />
        <h2>{artist.name} </h2>
        {/* <p>{artist.bio}</p> */}
      </ArtistStyles>
    )
  }
}

export default Artist

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Link from 'next/link';
// import Title from './styles/Title';
// import ItemStyles from './styles/ItemStyles';
// import PriceTag from './styles/PriceTag';
// import formatMoney from '../lib/formatMoney';
// import DeleteItem from './DeleteItem';
// import AddToCart from './AddToCart';

// export default class Item extends Component {
//   static propTypes = {
//     item: PropTypes.object.isRequired,
//   };

//   render() {
//     const { item } = this.props;
//     return (
//       <ItemStyles>
//         {item.image && <img src={item.image} alt={item.title} />}

//         <Title>
//           <Link
//             href={{
//               pathname: '/item',
//               query: { id: item.id },
//             }}
//           >
//             <a>{item.title}</a>
//           </Link>
//         </Title>
//         <PriceTag>{formatMoney(item.price)}</PriceTag>
//         <p>{item.description}</p>

//         <div className="buttonList">
//           <Link
//             href={{
//               pathname: 'update',
//               query: { id: item.id },
//             }}
//           >
//             <a>Edit ✏️</a>
//           </Link>
//           <AddToCart id={item.id} />
//           <DeleteItem id={item.id}>Delete This Item</DeleteItem>
//         </div>
//       </ItemStyles>
//     );
//   }
// }
