import React, { Component, useState } from 'react';
import './nav.css'
import NavFilter from './navFilter';
import Modal from '../modal/modal';
import PostRestaurant from './postRestaurant';

const Nav = (props) => {
  const filterArr = ['ALL', 'korean', 'japanese', 'chinese', 'western', 'etc'];
  const [ modalOpen, setModalOpen ] = useState(false);
  const { setFilter, user } = props;
  const onClickModalOpenTemp = () => {
    if (user.isLogin) {
      setModalOpen(true)
    }
    alert(`
    -임시 알림-
    당신은 Guest! Login 해야해요!
    `)
  };
  return (
      <nav>
        <div className="nav-wrapper back-black">
          <a href="#" className="brand-logo center logo-font">Tasty Road</a>
          <ul className="left" id="filter-ul">
            {filterArr.map((filter,idx) => <NavFilter setFilter={setFilter} filter={filter} key={idx}/>)}
          </ul>
          <div className="post-icon-container right" onClick={onClickModalOpenTemp}>
            <i className="material-icons" id="nav-post-icon">create</i><a className="right" href="#" id="post-restaurant-btn">식당 등록</a>
          </div>
          <div id='nav_bottom_line'/>
        </div>
        <Modal modalOpen={modalOpen}>
          <PostRestaurant close={() => setModalOpen(false)}/>
        </Modal>
      </nav>
  );
};

export default Nav;
