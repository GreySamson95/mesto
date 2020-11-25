export class UserInfo {
    constructor(profileNameSelector, profileSelfSelector) {
        this._profileNameSelector = document.querySelector(profileNameSelector)
        this._profileSelfSelector = document.querySelector(profileSelfSelector)
    }

    getUserInfo() {
        return {
            "name": this._profileNameSelector.textContent,
            "about": this._profileSelfSelector.textContent
        }
    }

    setUserInfo({ param1, param2}) {
        this._profileNameSelector.textContent = param1;
        this._profileSelfSelector.textContent = param2;
    }
}