import React from "react";
import './AdminModal.css';

class AdminModal extends React.Component {
    constructor(props) {
        super(props);
        let token = '';

        if(localStorage.getItem('bearerToken')) {
            token = localStorage.getItem('bearerToken')
        }

        this.state = {
            passcode: '',
            modalClass: 'hidden',
            response: '',
            bearerToken: token
        };
    }

    updateToken = (fetchedToken) => {
        let updatedToken = fetchedToken;
        this.setState({bearerToken: updatedToken});
        localStorage.setItem('bearerToken', updatedToken)
    };

    componentDidUpdate(prevProps) {
        if (prevProps.modalVisible !== this.props.modalVisible) {
            if (this.props.modalVisible) {
                this.setState({modalClass: 'visible'})
            } else {
                this.setState({modalClass: 'hidden'})
            }
        }
    }

    captureInput = (e, keyPressed, passcodeUpdate) => {
        let passcodeValue = {};
            passcodeValue['passcode'] = passcodeUpdate + keyPressed;
        this.setState(passcodeValue)
    };

    handleEnter = async () => {
        let dataToSend = {
            'Passcode': this.state.passcode
        };
        this.setState({passcode: ''});
        let passcodeResponse = await this.postPasscodeToDb(
            localStorage.getItem('apiUrl') + 'adminLogin',
            'POST',
            dataToSend
        );

        if (passcodeResponse.success === false) {
            this.updateResponse(passcodeResponse.message);
        } else if (passcodeResponse.success === true) {
            this.updateToken(passcodeResponse.token);

            if (this.props.adminBtnActiveState) {
                window.location.replace(localStorage.getItem('appUrl') + 'AdminPage');
                this.props.toggleAdminBtnState();
            } else if (this.props.signAllOutBtnActiveState) {
                this.handleSignAllOutBtnClick()
            }

        }

    };

    handleSignAllOutBtnClick = async () => {
        this.props.toggleSignAllOutBtnState();
        let signAllOutResponse = await this.signAllOut();

        if (signAllOutResponse.Success) {
            this.props.updateModalVisible()
            if (!this.props.signAllOutSuccessTickState) {
                this.props.toggleLandingPageSuccessTickState();
            }
        }

    }

    postPasscodeToDb = async (url, requestMethod, dataToSend) => {
        let requestData = JSON.stringify(dataToSend);
        const response = await fetch(url, {
            method: requestMethod.toUpperCase(),
            body: requestData,
            headers: {
                "Content-Type" : "application/json"
            }
        });
        return response.json();
    };

    signAllOut = async () => {
        const url = localStorage.getItem('apiUrl') + 'api/signOutVisitors';
        const bodyData = JSON.stringify({ "Option" : "all-current" })
        const response = await fetch(url, {
            method: 'PUT',
            body: bodyData,
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + this.state.bearerToken
            }
        })

        return await response.json();
    }

    updateResponse = (newResponse) => {
        setTimeout(()=> {
            this.clearResponse()
        }, 5000);
        this.setState({response : newResponse})
    };

    clearResponse = () => {
        this.setState({response : ''})
    };

    render() {
        let visibleState = 'adminModal ' + this.state.modalClass;
        return (
                <div className={visibleState}>
                    <span className="instructions">Please enter the admin passcode</span>
                    <div className="keypadContainer">
                        <div className="keypadRow">
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'1', this.state.passcode)}>
                                    <span>1</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'2', this.state.passcode)}>
                                    <span>2</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'3', this.state.passcode)}>
                                    <span>3</span>
                            </button>
                        </div>
                        <div className="keypadRow">
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'4', this.state.passcode)}>
                                    <span>4</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'5', this.state.passcode)}>
                                    <span>5</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'6', this.state.passcode)}>
                                    <span>6</span>
                            </button>
                        </div>
                        <div className="keypadRow">
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'7', this.state.passcode)}>
                                    <span>7</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'8', this.state.passcode)}>
                                    <span>8</span>
                            </button>
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'9', this.state.passcode)}>
                                    <span>9</span>
                            </button>
                        </div>
                        <div className="keypadRow">
                            <button className="keypadBtn btnHoverEffectBlue"
                                    onClick={(e) => this.captureInput(e,'0', this.state.passcode)}>
                                    <span>0</span>
                            </button>
                            <button className="logInBtn btnHoverEffectGreen" onClick={this.handleEnter}>
                                    <span>Enter</span>
                            </button>
                        </div>
                    </div>
                    <button className="closeModalBtn btnHoverEffectOrange" onClick={this.props.updateModalVisible}>X</button>
                    <div className="responseMessage">{this.state.response}</div>
                </div>
        )
    }
}

export default AdminModal;