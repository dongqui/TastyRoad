import React from 'react';

const NavItem = function(props) {
  let name ='';
  if (props.filter === '') {
    name = 'ALL';
  } else if (props.filter === 'korean') {
    name = '한 식'
  } else if (props.filter === 'japanese') {
    name = '일 식'
  } else if (props.filter === 'chinese') {
    name = '중 식'
  } else if (props. filter === 'western') {
    name = '양 식'
  } else {
    name = '기 타'
  }

  return (
    <li onClick={function() {props.setFilter(props.filter);}}><a href="#">{name}</a></li>
  )
};

export default NavItem