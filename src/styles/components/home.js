import styled from "styled-components"

export const HomeStyles = styled.div`
.nav {
    background-color: var(--off-white);
    position: sticky;
    top: 0px;
    width: 360px;
    max-height: 100px;
    z-index: 1000;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.15);
  }
  
  .nav-logo {
    height: 60px;
    width: 60px;
  }
  
  .nav-logo:hover {
    cursor: pointer;
  }
  
  .nav .nav-content {
    max-width: 360px;
    padding: 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .nav-items {
    white-space:nowrap;
  }
  
  .nav-item {
    display: inline;
    margin-left: 2rem;
    color: #333;
  }
  
  .nav-item:hover {
    color: black;
    cursor: pointer;
  }
  
  .section {
  }
  
  .section-dark {
    background: #333;
    color: white;
  }
  
  .section-content {
    max-width: 360px;
    margin: 0 auto;
    padding: 40px;
  }
  .active {
      color: red
  }
  .active {
    display: inline-block;
    color: #000;
    text-decoration: none;
  }

  .active::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: #000;
      transition: width .3s;
  }

  .active:active::after {
      width: 100%;
      //transition: width .3s;
  }
  .menu-item {
    padding: 0;
    margin: 0;
    user-select: none;
    cursor: pointer;
    border: none;
    background-color: red;
  }
  .menu-item-wrapper.active {
    border: 0px;
    outline-color: inherit;
    outline: inherit;
  }
  .menu-item-wrapper.active::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .3s;
  }
  .menu-item-wrapper {
    outline-color: inherit;
    outline: inherit;
  }
  .menu-item.active {
    border: 0px;
    color: red;
  }
  // .menu-item:focus {
  //   outline-color: inherit;
  //   outline: inherit;
  // }
  
  .scroll-menu-arrow {
    padding: 5px;
    cursor: pointer;
  }
  .menu-wrapper--inner {
    transform: 'inherit'
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }

  .MuiIconButton-root:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
`