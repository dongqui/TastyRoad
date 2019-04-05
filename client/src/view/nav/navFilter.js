import React from 'react';

const NavFilter = function(props) {
  const { filter, setFilter } = props;

  let name = 'All';
  if (filter === 'korean') {
    name = '한 식'
  } else if (filter === 'japanese') {
    name = '일 식'
  } else if (filter === 'chinese') {
    name = '중 식'
  } else if (filter === 'western') {
    name = '양 식'
  } else if (filter === 'etc'){
    name = '기 타'
  }

  return (
    <li onClick={setFilter(filter)}>
      <a href="#">{name}</a>
    </li>
  )
};

export default NavFilter