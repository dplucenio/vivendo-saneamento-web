import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import * as fontAwesome from 'react-icons/fa';
import { Link } from 'gatsby';
import Modal from '../components/Modal';

let Brand = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 0 0.5rem 0 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: stretch;
  flex-shrink: 1;
  p {
    padding: 0 0 0 0.2rem;
    font-size: 1.68rem;
    letter-spacing: -1px;
    font-weight: 500;
    font-family: 'Pacifico';
    transition: 200ms ease;
    @media (min-width: 320px) {
      font-size: 1.78rem;
    }
    @media (min-width: 350px) {
      font-size: 1.9rem;
    }
    @media (min-width: 400px) {
      font-size: 1.9rem;
    }
    @media (min-width: 1400px) {
      font-size: 2.1rem;
    }
  }
`;

let BrandTogglerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 800px) {
    width: unset;
  }
`;

let BrandIcon = styled.div`
  padding: 0rem 0.5rem 0rem 0rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

let TogglerIcon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem 1rem 0.5rem;
  cursor: pointer;
  @media (min-width: 800px) {
    display: none;
  }
`;

let NavItemsList = styled.div`
  display: flex;
  padding: 0 4rem 0 2rem;
  @media (max-width: 800px) {
    display: none;
  }
`;
let NavItemsDropDown = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  height: 150px;
  padding: 0;
  background-color: #FB6376;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  transform: ${props => props.toggled ? 'translateY(-150px)' : 'translateY(0px)'};
  transition: 400ms transform ease;
  z-index: 100;
  @media (min-width: 800px) {
    display: none;
  }
`;

let NavAnchor = styled.a`
  color: #fff;
  font-size: 1.25rem;
  
  padding: 0 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: 200ms background-color ease;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    background-color: ${tint(0.3, '#FB6376')};
  }
  @media (max-width: 800px) {
    padding: 0.25rem 0.5rem 0.25rem 2rem;
    width: 100%;
    &:last-child {
      margin-bottom: 1rem;
    }
  }
  * {
    color: inherit;
    font-family: inherit;
  }
`;

let NavItem = styled.div`
  color: #fff;
  font-size: 1.25rem;
  
  padding: 0 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: 200ms background-color ease;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    background-color: ${tint(0.3, '#FB6376')};
  }
  @media (max-width: 800px) {
    padding: 0.25rem 0.5rem 0.25rem 2rem;
    width: 100%;
    &:last-child {
      margin-bottom: 1rem;
    }
  }
  * {
    color: inherit;
    font-family: inherit;
  }
`;

let NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: 300ms background-color ease-in;
  &:hover {
    background-color: ${tint(0.3, '#FB6376')};
  }
  @media (max-width: 800px) {
    padding: 0.25rem 0.5rem 0.25rem 2rem;
    width: 100%;
    &:last-child {
      margin-bottom: 1rem;
    }
  }
  * {
    color: inherit;
    font-family: inherit;
  }
`;

let Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #FB6376;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  z-index:200;
  height: 60px;
`;

let ShowToggled = styled.div`
  display: ${props => props.toggled ? 'flex' : 'none'};
  align-items: center;
`;

let NotShowToggled = styled.div`
  display: ${props => props.toggled ? 'none' : 'flex'};
  align-items: center;
`;

function NavBar(props) {
  let [toggled, setToggled] = useState(true);
  let [showModal, setShowModal] = useState(false);
  let togglerRef = useRef(null);

  function handleOutsideClick(event) {
    if (togglerRef.current && !togglerRef.current.contains(event.target)) {
      setToggled(true);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [togglerRef]);

  function handleTogglerClick(e) {
    e.preventDefault();
    setToggled(!toggled);
  }

  function handleContactClick(e) {
    e.preventDefault();
    setShowModal(true);
    props.setThemeColor('#2ab7caff');
  }

  let navigationItems = (
    <>
      <NavLink to="/about"> <p>Sobre</p> </NavLink>
      <NavItem onClick={handleContactClick}> <p>Contato</p> </NavItem>
      <NavAnchor href="https://www.instagram.com/priscillabernardelli/">
        <fontAwesome.FaInstagram size="1.5rem" />
      </NavAnchor>
      <NavAnchor href="https://www.linkedin.com/in/priscilla-veiga-bernardelli-874629b3/">
        <fontAwesome.FaFacebook size="1.5rem" />
      </NavAnchor>
    </>
  );

  return (
    <>
      {showModal ?
        <Modal closeModal={() => {
          setShowModal(false);
          props.setThemeColor('#fb6376ff');
        }} />
        : null
      }
      <Wrapper>
        <BrandTogglerWrapper>
          <Brand to="/">
            <BrandIcon>
              <fontAwesome.FaGlobeAmericas size="2rem" />
                <p>Vivendo Saneamento</p>
            </BrandIcon>
          </Brand>

          <TogglerIcon onClick={handleTogglerClick} ref={togglerRef}>
            <ShowToggled toggled={toggled}><fontAwesome.FaBars size="1.5rem" /></ShowToggled>
            <NotShowToggled toggled={toggled}><fontAwesome.FaTimes size="1.5rem" /></NotShowToggled>
          </TogglerIcon>

        </BrandTogglerWrapper>
        <NavItemsList>
          {navigationItems}
        </NavItemsList>
      </Wrapper>

      <NavItemsDropDown toggled={toggled}>
        {navigationItems}
      </NavItemsDropDown>

    </>
  )
}

export default NavBar;