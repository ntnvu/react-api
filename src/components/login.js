import React, { Component } from "react";
import { ethers } from "ethers";

class LoginMetaMask extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = publicAddress => () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/findByAddress/${publicAddress}`)
            .then(response => response.json())
            .then(
                res => {
                    return JSON.stringify(res.data) !== '{}' ? res.data : this.handleSignup(publicAddress);
                }
            )
            .then(this.handleSignMessage)
            .then(this.handleAuthenticate)
    }

    handleSignup = publicAddress =>
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            body: JSON.stringify({ publicAddress }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json());

    async handleSignMessage({ publicAddress, nonce }) {

        return new Promise(async (resolve) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)

            return resolve({ publicAddress, signature });
        });

    }

    handleAuthenticate = ({ publicAddress, signature }) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/auth`, {
            body: JSON.stringify({ publicAddress, signature }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json()).then(realData => console.log(realData));
    }

    render() {
        return <button onClick={this.handleClick('0xfAa4780F99f666424F14d97eeC2367945Cc98123')}>Click Me</button>;
    }
}

export default LoginMetaMask;