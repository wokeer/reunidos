import styled from "styled-components"

export const colors = {
    green: "#98ca3f",
    orange: "#f8b71c",
    gray: "#969696",
    darkBlue: "#1c3643",
    lightBlue: "#1e5372",
    softGray: "#f6f8f9",
    white: "#fff",
    primaryColor: '#e6b12a',
}

export const Splash = styled.div`
  #splash-reunidos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    pointer-events: none;
    height: 100vh;
  }

  #splash-reunidos .logo-splash {
    width: 128px;
    margin-bottom: 30px;
  }

  #splash-reunidos .logo-splash img {
    filter: 'drop-shadow(0px 10px 6px rgba(0, 0, 0, 0.2))';
  }
  
  #splash-reunidos .spinner-wrapper {
    display: block;
    position: relative;
    width: 100%;
    min-height: 100px;
    height: 100px;
    }

    #splash-reunidos .spinner-wrapper .spinner {
        position: absolute;
        overflow: hidden;
        left: 50%;
        margin-left: -50px;
        animation: outer-rotate 2.91667s linear infinite;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner {
        width: 100px;
        height: 100px;
        position: relative;
        animation: sporadic-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .gap {
        position: absolute;
        left: 49px;
        right: 49px;
        top: 0;
        bottom: 0;
        border-top: 10px solid;
        box-sizing: border-box;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .left,
    #splash-reunidos .spinner-wrapper .spinner .inner .right {
        position: absolute;
        top: 0;
        height: 100px;
        width: 50px;
        overflow: hidden;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .left .half-circle,
    #splash-reunidos .spinner-wrapper .spinner .inner .right .half-circle {
        position: absolute;
        top: 0;
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border: 10px solid ${colors.primaryColor};
        border-bottom-color: transparent;
        border-radius: 50%;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .left {
        left: 0;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .left .half-circle {
        left: 0;
        border-right-color: transparent;
        animation: left-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
        -webkit-animation: left-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .right {
        right: 0;
    }

    #splash-reunidos .spinner-wrapper .spinner .inner .right .half-circle {
        right: 0;
        border-left-color: transparent;
        animation: right-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
        -webkit-animation: right-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
    }

    @keyframes outer-rotate {
        0% {
            transform: rotate(0deg) scale(0.5);
        }
        100% {
            transform: rotate(360deg) scale(0.5);
        }
    }

    @keyframes left-wobble {
        0%, 100% {
            transform: rotate(130deg);
        }
        50% {
            transform: rotate(-5deg);
        }
    }

    @keyframes right-wobble {
        0%, 100% {
            transform: rotate(-130deg);
        }
        50% {
            transform: rotate(5deg);
        }
    }

    @keyframes sporadic-rotate {
        12.5% {
            transform: rotate(135deg);
        }
        25% {
            transform: rotate(270deg);
        }
        37.5% {
            transform: rotate(405deg);
        }
        50% {
            transform: rotate(540deg);
        }
        62.5% {
            transform: rotate(675deg);
        }
        75% {
            transform: rotate(810deg);
        }
        87.5% {
            transform: rotate(945deg);
        }
        100% {
            transform: rotate(1080deg);
        }
    }
`